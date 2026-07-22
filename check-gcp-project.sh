#!/bin/bash

echo "=================================="
echo "Google Cloud Project Checker"
echo "=================================="
echo ""

# Check for existing projects
echo "🔍 Checking for existing Google Cloud projects..."
gcloud projects list --format="table(project_id,name,project_number)" 2>/dev/null

PROJECTS=$(gcloud projects list --format="value(project_id)" 2>/dev/null | wc -l)

if [ "$PROJECTS" -gt 0 ]; then
  echo ""
  echo "✅ You have $PROJECTS project(s)."
  echo ""
  echo "Which project ID should we use for the Meeting Notes Distributor?"
  echo "Enter the PROJECT_ID (from the list above):"
  read -r PROJECT_ID

  if [ -z "$PROJECT_ID" ]; then
    echo "❌ No project ID provided."
    exit 1
  fi

  echo ""
  echo "Using Project ID: $PROJECT_ID"
  echo ""
  echo "Run the deployment with:"
  echo "  cd capital-engine/cloud-function"
  echo "  ./deploy.sh $PROJECT_ID"
  exit 0
fi

echo ""
echo "❌ No existing projects found."
echo ""
echo "Do you want to create a new Google Cloud Project? (y/n)"
read -r CREATE

if [ "$CREATE" != "y" ] && [ "$CREATE" != "Y" ]; then
  echo "Exiting. Please create a project at https://console.cloud.google.com and try again."
  exit 1
fi

echo ""
echo "📝 Creating new project: Meeting Notes Distributor"
echo "Enter a project name (default: meeting-notes-distributor):"
read -r PROJECT_NAME

if [ -z "$PROJECT_NAME" ]; then
  PROJECT_NAME="meeting-notes-distributor"
fi

# Create the project
echo ""
echo "🚀 Creating project (this may take 30-60 seconds)..."
gcloud projects create "$PROJECT_NAME" 2>/dev/null

if [ $? -ne 0 ]; then
  echo "❌ Project creation failed. Try creating manually at:"
  echo "   https://console.cloud.google.com"
  exit 1
fi

# Get the project ID
PROJECT_ID=$(gcloud projects list --filter="name:$PROJECT_NAME" --format="value(project_id)" | head -1)

if [ -z "$PROJECT_ID" ]; then
  echo "❌ Could not retrieve project ID."
  exit 1
fi

echo ""
echo "✅ Project created successfully!"
echo ""
echo "Project ID: $PROJECT_ID"
echo ""
echo "Run the deployment with:"
echo "  cd capital-engine/cloud-function"
echo "  ./deploy.sh $PROJECT_ID"
