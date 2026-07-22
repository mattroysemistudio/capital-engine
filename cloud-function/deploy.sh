#!/bin/bash
set -e

# ============================================================================
# Google Cloud Function Deployment Script
# Meeting Notes Distributor with Language Preferences
#
# Usage: ./deploy.sh <project-id> [optional-anthropic-api-key]
# ============================================================================

PROJECT_ID="${1:-}"
ANTHROPIC_API_KEY="${2:-}"
FUNCTION_NAME="meetingNotesDistributor"
REGION="us-central1"
RUNTIME="nodejs22"
TRIGGER_NAME="meeting-notes-trigger"

# ============================================================================
# VALIDATION
# ============================================================================

if [ -z "$PROJECT_ID" ]; then
  echo "❌ Error: Google Cloud Project ID is required"
  echo "Usage: ./deploy.sh <project-id> [optional-anthropic-api-key]"
  echo ""
  echo "To create a project:"
  echo "  1. Go to https://console.cloud.google.com"
  echo "  2. Create new project"
  echo "  3. Copy the project ID and pass it here"
  exit 1
fi

echo "📋 Deployment Configuration:"
echo "  Project ID: $PROJECT_ID"
echo "  Function: $FUNCTION_NAME"
echo "  Region: $REGION"
echo "  Runtime: $RUNTIME"
echo ""

# ============================================================================
# CHECK PREREQUISITES
# ============================================================================

echo "🔍 Checking prerequisites..."

if ! command -v gcloud &> /dev/null; then
  echo "❌ gcloud CLI not found. Install it: https://cloud.google.com/sdk/docs/install"
  exit 1
fi

if ! gcloud config get-value project &> /dev/null; then
  echo "⚠️  No gcloud default project set. Setting to $PROJECT_ID..."
  gcloud config set project "$PROJECT_ID"
fi

# ============================================================================
# ENABLE REQUIRED APIs
# ============================================================================

echo "🔧 Enabling required Google Cloud APIs..."
gcloud services enable cloudfunctions.googleapis.com \
  cloudscheduler.googleapis.com \
  cloudresourcemanager.googleapis.com \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  --project="$PROJECT_ID"

echo "✓ APIs enabled"

# ============================================================================
# DEPLOY CLOUD FUNCTION
# ============================================================================

echo ""
echo "🚀 Deploying Cloud Function..."

DEPLOY_ARGS="--source . \
  --runtime $RUNTIME \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point meetingNotesDistributor \
  --region $REGION \
  --project $PROJECT_ID \
  --quiet"

if [ -n "$ANTHROPIC_API_KEY" ]; then
  DEPLOY_ARGS="$DEPLOY_ARGS \
    --set-env-vars ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY"
  echo "  With Claude API enabled for higher-quality translations"
fi

gcloud functions deploy "$FUNCTION_NAME" $DEPLOY_ARGS

if [ $? -eq 0 ]; then
  echo "✓ Cloud Function deployed successfully"
else
  echo "❌ Deployment failed"
  exit 1
fi

# ============================================================================
# GET FUNCTION URL
# ============================================================================

echo ""
echo "🔗 Getting function URL..."
FUNCTION_URL=$(gcloud functions describe "$FUNCTION_NAME" \
  --region "$REGION" \
  --project "$PROJECT_ID" \
  --format='value(httpsTrigger.url)')

echo "Function URL: $FUNCTION_URL"

# ============================================================================
# CREATE CLOUD SCHEDULER TRIGGER (OPTIONAL)
# ============================================================================

echo ""
echo "📅 Setting up Cloud Scheduler (runs every 30 minutes)..."

# Check if scheduler job already exists
if gcloud scheduler jobs describe "$TRIGGER_NAME" --location "$REGION" --project "$PROJECT_ID" &> /dev/null; then
  echo "Scheduler job already exists. Updating..."
  gcloud scheduler jobs update http "$TRIGGER_NAME" \
    --location "$REGION" \
    --schedule "*/30 * * * *" \
    --uri "$FUNCTION_URL" \
    --http-method GET \
    --oidc-service-account-email "" \
    --project "$PROJECT_ID" \
    --quiet
else
  echo "Creating new scheduler job..."
  gcloud scheduler jobs create http "$TRIGGER_NAME" \
    --location "$REGION" \
    --schedule "*/30 * * * *" \
    --uri "$FUNCTION_URL" \
    --http-method GET \
    --project "$PROJECT_ID" \
    --quiet
fi

if [ $? -eq 0 ]; then
  echo "✓ Cloud Scheduler configured to run every 30 minutes"
else
  echo "⚠️  Cloud Scheduler setup had issues (may not be in expected region)"
  echo "   You can manually create a scheduler job if needed"
fi

# ============================================================================
# CONFIGURATION
# ============================================================================

echo ""
echo "⚙️  Configuration Notes:"
echo "  • Function will automatically process ALL Gemini meeting notes"
echo "  • Edgar Delgado: Receives English notes (no translation)"
echo "  • Alicia Cervantes: Receives Spanish translation"
echo "  • Runs every 30 minutes via Cloud Scheduler"
echo ""

# ============================================================================
# VERIFICATION
# ============================================================================

echo "✅ Deployment Complete!"
echo ""
echo "📖 Next Steps:"
echo "  1. Verify the function is working:"
echo "     gcloud functions logs read $FUNCTION_NAME --region $REGION --project $PROJECT_ID"
echo ""
echo "  2. Test manually:"
echo "     curl -X GET $FUNCTION_URL"
echo ""
echo "  3. Monitor execution:"
echo "     gcloud scheduler jobs describe $TRIGGER_NAME --location $REGION --project $PROJECT_ID"
echo ""
echo "  4. (Optional) To use Claude for higher-quality translations:"
echo "     gcloud functions deploy $FUNCTION_NAME \\"
echo "       --set-env-vars ANTHROPIC_API_KEY=<your-key> \\"
echo "       --region $REGION \\"
echo "       --project $PROJECT_ID"
echo ""
echo "📧 Email Configuration:"
echo "  Recipient emails and language preferences are in the source code."
echo "  To update: Edit cloud-function/index.js RECIPIENT_PREFERENCES"
