/**
 * Google Cloud Function: Meeting Notes Distributor with Language Preferences
 *
 * Automatically distributes Gemini meeting notes to team members based on their language preferences.
 * LOCKED preferences: Edgar Delgado (English), Alicia Cervantes (Spanish)
 *
 * Deploy via: `gcloud functions deploy meetingNotesDistributor`
 * Trigger: Cloud Scheduler (every 30 minutes) or on-demand HTTP trigger
 *
 * Required secrets in Secret Manager (set via --set-secrets in workflow):
 *   ANTHROPIC_API_KEY      — for Claude translation
 *   GMAIL_CLIENT_ID        — OAuth2 client ID for Gmail sending
 *   GMAIL_CLIENT_SECRET    — OAuth2 client secret
 *   GMAIL_REFRESH_TOKEN    — OAuth2 refresh token for general@semistudio.com
 */

const { google } = require('googleapis');
const { Anthropic } = require('@anthropic-ai/sdk');

// ============================================================================
// CONFIGURATION
// ============================================================================

const RECIPIENT_PREFERENCES = {
  'edgar@semistudio.com': 'en',
  'alicia@semistudio.com': 'es',
  'matt@semistudio.com': 'en',
  'm@semistudio.com': 'en',
  'zach@semistudio.com': 'en',
  'michael@semistudio.com': 'en',
};

const DEFAULT_PREFERENCE = 'en';

const DISTRIBUTION_LIST = [
  { email: 'edgar@semistudio.com', name: 'Edgar Delgado' },
  { email: 'alicia@semistudio.com', name: 'Alicia Cervantes' },
];

const MEET_RECORDINGS_FOLDER_ID = '1Ir20saBJuh0KI3RGKhKLEppIxb0Nd6QH';
const GMAIL_SENDER = 'general@semistudio.com';

// ============================================================================
// TRANSLATION
// ============================================================================

function getLanguagePreference(email) {
  const normalized = (email || '').toLowerCase().trim();
  return RECIPIENT_PREFERENCES[normalized] || DEFAULT_PREFERENCE;
}

function shouldTranslate(email) {
  return getLanguagePreference(email) === 'es';
}

async function translateToSpanish(text) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.log('Warning: ANTHROPIC_API_KEY not set. Using Google Translate instead.');
    return await translateToSpanishViaGoogle(text);
  }

  const client = new Anthropic({ apiKey });
  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Translate the following meeting notes to Spanish, preserving SEMI brand terminology and tone. Keep these terms as-is: Dinosaur Pizza, Founder, Integrator, Visionary, Operator, design-build, FF&E.\n\nENGLISH:\n${text}\n\nSPANISH:`,
        },
      ],
    });

    return message.content[0].type === 'text' ? message.content[0].text : text;
  } catch (error) {
    console.log('Claude translation error:', error.message);
    return await translateToSpanishViaGoogle(text);
  }
}

async function translateToSpanishViaGoogle(text) {
  try {
    const translate = google.translate('v3');
    const projectId = process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT;

    const request = {
      parent: `projects/${projectId}/locations/global`,
      contents: [text],
      targetLanguageCode: 'es',
    };

    const response = await translate.projects.locations.translateText(request, {
      auth: new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      }),
    });

    return response.data.translations[0].translatedText;
  } catch (error) {
    console.log('Google Translate error:', error.message);
    return text;
  }
}

// ============================================================================
// AUTH
// ============================================================================

// Drive: Application Default Credentials work fine — the runtime SA has Drive access.
async function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const client = await auth.getClient();
  return google.drive({ version: 'v3', auth: client });
}

// Gmail: service accounts don't have Gmail inboxes, and org policy blocks SA key creation
// so domain-wide delegation via JWT is unavailable. Instead we use OAuth2 with a stored
// refresh token for general@semistudio.com. One-time setup:
//   1. Create an OAuth2 client in Cloud Console (APIs & Services > Credentials > OAuth 2.0)
//   2. Run the consent flow once for general@semistudio.com to obtain a refresh token
//   3. Store GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN in Secret Manager
//   4. Add those three secrets to --set-secrets in the deploy workflow
async function getGmailClient() {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Gmail OAuth2 credentials not configured. ' +
      'Set GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN in Secret Manager.'
    );
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return google.gmail({ version: 'v1', auth: oauth2Client });
}

// ============================================================================
// GOOGLE DRIVE OPERATIONS
// ============================================================================

const PROCESSED_METADATA_FILE = '.processed_notes_metadata.json';

async function loadProcessedIds(drive) {
  try {
    const query = `'${MEET_RECORDINGS_FOLDER_ID}' in parents and name='${PROCESSED_METADATA_FILE}' and trashed=false`;
    const response = await drive.files.list({
      q: query,
      fields: 'files(id)',
      pageSize: 1,
    });

    if (response.data.files && response.data.files.length > 0) {
      const metadataFileId = response.data.files[0].id;
      const contentResponse = await drive.files.get({
        fileId: metadataFileId,
        alt: 'media',
      });
      const data = typeof contentResponse.data === 'string'
        ? JSON.parse(contentResponse.data)
        : contentResponse.data;
      return new Set(data.processedIds || []);
    }
  } catch (error) {
    console.log('Could not load processed IDs, starting fresh:', error.message);
  }
  return new Set();
}

async function saveProcessedIds(drive, processedIds) {
  try {
    const data = { processedIds: Array.from(processedIds), lastUpdated: new Date().toISOString() };
    const content = JSON.stringify(data, null, 2);

    const query = `'${MEET_RECORDINGS_FOLDER_ID}' in parents and name='${PROCESSED_METADATA_FILE}' and trashed=false`;
    const response = await drive.files.list({
      q: query,
      fields: 'files(id)',
      pageSize: 1,
    });

    if (response.data.files && response.data.files.length > 0) {
      const metadataFileId = response.data.files[0].id;
      await drive.files.update({
        fileId: metadataFileId,
        media: {
          mimeType: 'text/plain',
          body: content,
        },
      });
    } else {
      await drive.files.create({
        requestBody: {
          name: PROCESSED_METADATA_FILE,
          parents: [MEET_RECORDINGS_FOLDER_ID],
          mimeType: 'application/json',
        },
        media: {
          mimeType: 'application/json',
          body: content,
        },
      });
    }
    console.log('\u2713 Saved processed IDs');
  } catch (error) {
    console.error('Error saving processed IDs:', error.message);
  }
}

async function findNewMeetingNotes(drive, processedIds) {
  try {
    const query = `'${MEET_RECORDINGS_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.document' and name contains 'Notes by Gemini' and trashed=false`;
    const response = await drive.files.list({
      q: query,
      pageSize: 10,
      fields: 'files(id, name, webViewLink, modifiedTime)',
      orderBy: 'modifiedTime desc',
    });

    const newDocs = (response.data.files || []).filter(file => !processedIds.has(file.id));
    return newDocs;
  } catch (error) {
    console.error('Error finding meeting notes:', error.message);
    return [];
  }
}

async function getDocContent(drive, docId) {
  try {
    const response = await drive.files.export({
      fileId: docId,
      mimeType: 'text/plain',
    });
    return response.data;
  } catch (error) {
    console.error(`Error reading doc ${docId}:`, error.message);
    return '';
  }
}

// ============================================================================
// EMAIL
// ============================================================================

async function sendEmail(gmail, to, subject, body) {
  try {
    const email = [
      `From: ${GMAIL_SENDER}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      '',
      body,
    ].join('\n');

    const base64Email = Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: base64Email },
    });

    console.log(`\u2713 Sent to ${to}`);
  } catch (error) {
    console.error(`\u2717 Failed to send to ${to}:`, error.message);
  }
}

async function sendMeetingNotes(gmail, email, name, title, content, docUrl) {
  const shouldSendSpanish = shouldTranslate(email);

  let subject, body;

  if (shouldSendSpanish) {
    const spanishContent = await translateToSpanish(content);
    subject = `Notas de Reuni\u00f3n \u2014 ${title}`;
    body = `Hola ${name},\n\nAqu\u00ed est\u00e1n las notas de la reuni\u00f3n:\n\n${spanishContent}\n\nDocumento: ${docUrl}\n\n\u2014\nSISTEMA AUTOM\u00c1TICO DE DISTRIBUCI\u00d3N DE NOTAS`;
  } else {
    subject = `Meeting Notes \u2014 ${title}`;
    body = `Hi ${name},\n\nHere are today's meeting notes:\n\n${content}\n\nFull document: ${docUrl}\n\n\u2014\nAutomatic Meeting Notes Distribution`;
  }

  await sendEmail(gmail, email, subject, body);
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

exports.meetingNotesDistributor = async (req, res) => {
  console.log('=== Meeting Notes Distribution Starting ===');

  try {
    const drive = await getDriveClient();
    const gmail = await getGmailClient();

    const processedIds = await loadProcessedIds(drive);
    console.log(`Loaded ${processedIds.size} previously processed documents`);

    const newDocs = await findNewMeetingNotes(drive, processedIds);
    console.log(`Found ${newDocs.length} new meeting notes`);

    if (newDocs.length === 0) {
      return res.json({ status: 'No new meeting notes to process' });
    }

    for (const doc of newDocs) {
      console.log(`Processing: ${doc.name}`);
      const content = await getDocContent(drive, doc.id);

      if (!content || content.trim().length === 0) {
        console.log(`\u26a0 Empty document: ${doc.name}`);
        processedIds.add(doc.id);
        continue;
      }

      for (const recipient of DISTRIBUTION_LIST) {
        await sendMeetingNotes(
          gmail,
          recipient.email,
          recipient.name,
          doc.name,
          content,
          doc.webViewLink
        );
      }

      processedIds.add(doc.id);
    }

    await saveProcessedIds(drive, processedIds);

    console.log(`=== Processed ${newDocs.length} document(s) ===`);
    res.json({ status: 'Success', processed: newDocs.length });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
