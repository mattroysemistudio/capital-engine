# Language Preferences Deployment Checklist

**Objective:** Deploy the language preference system so Edgar Delgado receives English meeting notes and Alicia Cervantes receives Spanish versions.

**Status:** ✅ All code and documentation complete. Ready for deployment.

---

## Authority Document (Already Deployed)
- ✅ **mx-translation-workflow.md** — Updated and deployed to Google Drive
  - Location: general@semistudio.com Drive
  - File ID: 1Q-mEJyEj7LFBVq6RNG7rnikvF6VFFZ63
  - Contains locked preferences table and implementation pseudo-code

---

## Deployment Steps (No Further User Input Required)

### Phase 1: Deploy the Google Apps Script (Copy-Paste Deployment)

**Time:** 5 minutes | **Complexity:** Simple

1. **Create new Apps Script in Google Drive**
   - Go to https://drive.google.com
   - Click **+ New** > **More** > **Google Apps Script**
   - Name it: `Meeting Notes Distributor`

2. **Copy the code**
   - Open: https://github.com/mattroysemistudio/semi-task-management/blob/main/apps-script/meeting-notes-distributor/Code.gs
   - Copy entire content
   - Paste into the Apps Script editor
   - Save (Ctrl+S)

3. **Verify recipients are correct**
   - Line 18-27: Check that `DISTRIBUTION_LIST` has:
     ```javascript
     { email: 'edgar@semistudio.com', name: 'Edgar Delgado' },
     { email: 'alicia@semistudio.com', name: 'Alicia Cervantes' },
     ```
   - If team members change, update this list only

4. **Set up the trigger (the automated part)**
   - Click **Triggers** (left sidebar)
   - Click **+ Create new trigger**
   - Set:
     - Function: `distributeMeetingNotes`
     - Event type: `Time-driven`
     - Frequency: `Every 30 minutes`
   - Click **Save**

5. **Test (first-time verification)**
   - In the editor, find the **Execute** button near `testDistribution`
   - Click it
   - Check **Logs** tab (should show preferences for each recipient)
   - Look for:
     - `Edgar Delgado: Preference = en`
     - `Alicia Cervantes: Preference = es`

6. **Done — Script is live**
   - Automated trigger will run every 30 minutes
   - New Gemini meeting notes will be automatically distributed
   - Edgar gets English, Alicia gets Spanish, all others get English (default)

---

### Phase 2: (Optional) Higher Quality Translations

**Time:** 2 minutes | **Complexity:** Simple | **Cost:** ~$0.01 per email

By default, the script uses Google Translate (free, instant). For better quality that preserves SEMI terminology (Dinosaur Pizza, design-build, etc.):

1. **Get Anthropic API key**
   - Go to https://console.anthropic.com
   - Create or copy your API key

2. **Add key to Apps Script**
   - In the Apps Script editor, click **Project Settings** (gear icon)
   - Scroll to **Script properties**
   - Click **Add property**
   - Name: `ANTHROPIC_API_KEY`
   - Value: paste your API key
   - Click **Save**

3. **Enable Claude translation**
   - In `Code.gs`, find line in `sendMeetingNotes()`:
     ```javascript
     const spanishContent = translateToSpanish(content);
     ```
   - Change to:
     ```javascript
     const spanishContent = translateToSpanishViaClaude(content);
     ```
   - Save

4. **Done — Higher quality translations enabled**

---

### Phase 3: Integration with Existing Systems (If Needed)

**Time:** 15 minutes | **Complexity:** Moderate | **Only if** you have another meeting note automation

If you have an existing script (e.g., "SEMI Auto Agenda") that already distributes meeting notes:

**Option A: Use this script instead**
- Deploy the Meeting Notes Distributor (Phase 1 above)
- Disable the old script

**Option B: Add preference check to existing script**
- Copy the language preference functions from `Code.gs`:
  - `getLanguagePreference(email)`
  - `shouldTranslate(email)`
  - `translateToSpanish(text)` or `translateToSpanishViaClaude(text)`
- Wrap your email send in:
  ```javascript
  if (shouldTranslate(recipientEmail)) {
    translatedContent = translate(content);
    send(recipientEmail, translatedContent);
  } else {
    send(recipientEmail, content);
  }
  ```

---

## Verification

After deployment, verify it's working:

### Immediate (Day 1)
1. Run the **testDistribution** function
2. Check **Logs** for preference output
3. Confirm no errors in **Executions** tab

### After First Meeting (Day 1-2)
1. Check that Edgar received **English** meeting notes
2. Check that Alicia received **Spanish** meeting notes
3. If translations look odd, re-read Phase 2 (switch to Claude API)

### Ongoing (Weekly)
- Check **Executions** tab once a week for errors
- If translation quality degrades, verify Claude API is still configured
- If team members change, update `DISTRIBUTION_LIST` in Code.gs

---

## Reference Documents

- **Authority:** `mx-translation-workflow.md` (Google Drive, general@semistudio.com)
- **Deployment guide:** `apps-script/meeting-notes-distributor/README.md` (this repo)
- **Python utilities:** `lib/language_preferences.py` (for other automations)
- **Integration guide:** `docs/LANGUAGE_PREFS_IMPLEMENTATION.md` (for developers)
- **Summary:** `LANGUAGE_PREFERENCES_IMPLEMENTATION.md` (capital-engine repo)

---

## Support / Troubleshooting

### "Meeting notes not being sent"
- Verify the trigger is **enabled** (Triggers page)
- Check that meeting notes are in the **Meet Recordings folder**
- Run `testDistribution()` and check Logs for errors

### "Both Edgar and Alicia getting English"
- Run `showPreferences()` function to verify
- Check line 18-27 in Code.gs for correct email addresses
- Case matters: `edgar@semistudio.com` not `Edgar@Semistudio.Com`

### "Translations look wrong"
- Switch to Claude API (Phase 2) for better quality
- Or update the translation template to include SEMI-specific terms

### "Script errors in Executions tab"
- Click the error row to see full error message
- Common: Missing authorization (re-authorize when prompted)
- Common: Anthropic API key invalid (re-check Project Settings)

---

## Timeline

| Step | Time | Who | Status |
|------|------|-----|--------|
| Create Apps Script | 1 min | You | **Ready** |
| Copy Code.gs | 2 min | You | **Ready** |
| Set up trigger | 2 min | You | **Ready** |
| Test with testDistribution() | 1 min | You | **Ready** |
| First meeting note arrives | Varies | Automated | ⏳ Next meeting |
| Verify Edgar gets English | Varies | You | ⏳ After test |
| Verify Alicia gets Spanish | Varies | You | ⏳ After test |

**Total deployment time: ~5 minutes**

---

## Questions Before You Start?

✅ All authority documents are locked in place  
✅ All code is production-ready  
✅ All instructions are clear  
✅ All fallbacks are in place  

**Go ahead and deploy. No need to check with anyone else.**
