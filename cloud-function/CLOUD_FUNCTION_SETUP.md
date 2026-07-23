# Google Cloud Function Deployment Guide

Automatically distribute Gemini meeting notes to team members with language preferences using Google Cloud Functions.

**Status:** Production-ready | **Time to Deploy:** 10 minutes | **Complexity:** Simple

---

## What You're Deploying

A fully automated system that:
- ✅ Monitors your Google Drive "Meet Recordings" folder for new Gemini meeting notes
- ✅ Sends Edgar Delgado **English** meeting notes (no translation)
- ✅ Sends Alicia Cervantes **Spanish** translations
- ✅ Runs every 30 minutes automatically via Cloud Scheduler
- ✅ Handles errors gracefully with fallback behavior

**No code changes needed.** The system is production-ready and works across all your Google Meet meetings.

---

## Prerequisites

You need:
1. **Google Cloud Project** (free to create)
2. **gcloud CLI** installed on your machine
3. **~5 minutes** to run the deployment

---

## Step 1: Create a Google Cloud Project

1. Go to https://console.cloud.google.com
2. Click **Select a Project** (top-left dropdown)
3. Click **NEW PROJECT**
4. Name it: `Meeting Notes Distributor` (or your preference)
5. Click **CREATE**
6. Wait for creation to complete
7. Copy the **Project ID** (looks like: `meeting-notes-distributor-12345`)

---

## Step 2: Install gcloud CLI

If you don't have it:

```bash
# macOS
brew install --cask google-cloud-sdk

# Ubuntu/Debian
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Windows
# Download from: https://cloud.google.com/sdk/docs/install-gcloud-on-windows
```

After install, authenticate:
```bash
gcloud auth login
```

---

## Step 3: Deploy the Cloud Function

In the `cloud-function/` directory, run:

```bash
./deploy.sh <PROJECT_ID>
```

**Example:**
```bash
./deploy.sh meeting-notes-distributor-12345
```

This will:
- ✅ Enable required Google Cloud APIs
- ✅ Deploy the Cloud Function
- ✅ Set up Cloud Scheduler to run every 30 minutes
- ✅ Show you the function URL

**Expected output:**
```
📋 Deployment Configuration:
  Project ID: meeting-notes-distributor-12345
  Function: meetingNotesDistributor
  Region: us-central1

🔍 Checking prerequisites...
✓ gcloud CLI found
✓ Project configured

🔧 Enabling required Google Cloud APIs...
✓ APIs enabled

🚀 Deploying Cloud Function...
✓ Cloud Function deployed successfully

📅 Setting up Cloud Scheduler...
✓ Cloud Scheduler configured to run every 30 minutes

✅ Deployment Complete!
```

---

## Step 4: Verify It's Working

### Immediate Test (5 seconds)

```bash
gcloud functions call meetingNotesDistributor \
  --region us-central1 \
  --project <YOUR_PROJECT_ID>
```

Expected response:
```json
{
  "status": "No new meeting notes to process"
}
```

(This is normal if no new Gemini notes have been created since last run.)

### Check Logs

```bash
gcloud functions logs read meetingNotesDistributor \
  --region us-central1 \
  --project <YOUR_PROJECT_ID> \
  --limit 50
```

Look for:
```
=== Meeting Notes Distribution Starting ===
Found X new meeting notes
✓ Sent to edgar@semistudio.com
✓ Sent to alicia@semistudio.com
```

---

## Step 5: Verify Google Meet Integration

1. **Schedule a Google Meet** (internal team meeting)
2. **Turn on Gemini meeting notes** (Google Meet → More → Take notes with Gemini)
3. **End the meeting** (notes auto-save to Drive)
4. **Wait up to 30 minutes** for the scheduler to run
5. **Check emails:**
   - Edgar should receive **English** notes
   - Alicia should receive **Spanish** notes

---

## Optional: Enable Higher-Quality Translations

By default, the system uses Google Translate (free, instant). For better quality that preserves SEMI terminology (Dinosaur Pizza, design-build, etc.), add your Anthropic API key:

```bash
./deploy.sh <PROJECT_ID> <ANTHROPIC_API_KEY>
```

**Example:**
```bash
./deploy.sh meeting-notes-distributor-12345 sk-ant-abc123xyz789
```

Or add the key later:
```bash
gcloud functions deploy meetingNotesDistributor \
  --set-env-vars ANTHROPIC_API_KEY=sk-ant-abc123xyz789 \
  --region us-central1 \
  --project <YOUR_PROJECT_ID>
```

---

## Update Recipients or Preferences

To change who gets meeting notes or their language preference:

1. Edit `cloud-function/index.js`
2. Update the `RECIPIENT_PREFERENCES` object:
   ```javascript
   const RECIPIENT_PREFERENCES = {
     'edgar@semistudio.com': 'en',      // English
     'alicia@semistudio.com': 'es',     // Spanish
     'newperson@semistudio.com': 'es',  // Add new recipient
   };
   
   const DISTRIBUTION_LIST = [
     { email: 'edgar@semistudio.com', name: 'Edgar Delgado' },
     { email: 'alicia@semistudio.com', name: 'Alicia Cervantes' },
     { email: 'newperson@semistudio.com', name: 'New Person' }, // Add here too
   ];
   ```

3. Redeploy:
   ```bash
   ./deploy.sh <PROJECT_ID>
   ```

---

## Monitoring & Logs

### View Recent Executions

```bash
gcloud functions logs read meetingNotesDistributor \
  --region us-central1 \
  --project <YOUR_PROJECT_ID> \
  --limit 100
```

### Check Scheduler Status

```bash
gcloud scheduler jobs describe meeting-notes-trigger \
  --location us-central1 \
  --project <YOUR_PROJECT_ID>
```

### Manual Trigger

To test immediately without waiting for scheduler:

```bash
gcloud scheduler jobs run meeting-notes-trigger \
  --location us-central1 \
  --project <YOUR_PROJECT_ID>
```

---

## Troubleshooting

### "No new meeting notes to process"
- ✓ This is normal if no new Gemini notes exist
- Check that Google Meet notes are being saved to the "Meet Recordings" folder in Drive
- The system looks for docs with "Notes by Gemini" in the name

### "Function deployment failed"
- Ensure you ran `gcloud auth login` first
- Check that the Project ID is correct
- Verify the Google Cloud project exists and you have permission

### "Email not being sent"
- Check Cloud Function logs: `gcloud functions logs read meetingNotesDistributor ...`
- Verify recipient emails are correct (case-sensitive)
- Ensure the Cloud Scheduler job is enabled

### "Both recipients getting English"
- Edit `cloud-function/index.js` and verify `RECIPIENT_PREFERENCES` has correct mappings
- Redeploy: `./deploy.sh <PROJECT_ID>`

### "Translations look wrong"
- Enable Anthropic API for higher quality (see "Optional" section above)
- Or update the translation prompt in the source code

---

## Pricing

**Google Cloud Functions:**
- Free tier: 2M invocations/month
- Your usage: ~1,440 calls/month (every 30 min) = **Free**

**Google Cloud Scheduler:**
- Free tier: 3 free jobs
- Your usage: 1 scheduler job = **Free**

**Translation (Optional):**
- Google Translate: **Free** (built-in)
- Anthropic Claude API: ~$0.01 per email (if enabled)

**Total monthly cost: $0 - $0.50** (depending on meeting frequency)

---

## Support

### Quick Reference
- Project dashboard: https://console.cloud.google.com
- Function logs: `gcloud functions logs read meetingNotesDistributor --region us-central1 --project <YOUR_PROJECT_ID>`
- Manual test: `gcloud functions call meetingNotesDistributor --region us-central1 --project <YOUR_PROJECT_ID>`

### If Something Breaks
1. Check the logs: `gcloud functions logs read meetingNotesDistributor ...`
2. Verify Google Drive folder ID (`MEET_RECORDINGS_FOLDER_ID` in `index.js`)
3. Re-run deployment: `./deploy.sh <PROJECT_ID>`
4. If all else fails, delete and redeploy (no data loss):
   ```bash
   gcloud functions delete meetingNotesDistributor --region us-central1 --project <PROJECT_ID>
   ./deploy.sh <PROJECT_ID>
   ```

---

## Next Steps

✅ Deploy the function (this guide)  
✅ Test with a real Google Meet  
✅ Monitor logs weekly for any errors  
✅ (Optional) Update recipients as team grows  

That's it. The system runs automatically from here.
