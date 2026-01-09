---
sop_name: deploy-frontend-app
sop_version: 1.0
repo_name: dddem-web
app_name: DDDEMWeb
app_type: Frontend Application (Next.js Static Export)
branch: deploy-to-aws
created: 2026-01-09T23:00:00Z
last_updated: 2026-01-10T01:40:00Z
status: COMPLETE
---

# Deployment Plan: DDD East Midlands Web

Coding Agents should follow this Deployment Plan and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
- [x] Step 4: Validate Prerequisites
- [x] Step 5: Revisit Deployment Plan

## Phase 2: Build CDK Infrastructure
- [x] Step 6: Initialize CDK Foundation
- [x] Step 7: Generate CDK Stack
- [x] Step 8: Create Deployment Script
- [x] Step 9: Validate CDK Synth

## Phase 3: Deploy and Validate
- [x] Step 10: Execute CDK Deployment
- [x] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md

## Deployment Info

- Deployment URL: https://d12q89g94187ud.cloudfront.net
- Stack name: DDDEMWebFrontend-preview-jairosp
- Distribution ID: E2H0FYMEIONZAR
- S3 bucket (content): dddemwebfrontend-preview-ja-cftos3s3bucketcae9f2be-gp0rhb0n9zud
- S3 bucket (S3 logs): dddemwebfrontend-preview--cftos3s3loggingbucket64b-zyvm9gwxw9ec
- S3 bucket (CloudFront logs): dddemwebfrontend-preview--cftos3cloudfrontloggingb-9yhkeuk1og7x
- Build output directory: `out/`
- Build command: `npm run build`
- Framework: Next.js (static export with trailing slashes)
- CloudFront config: URL rewrite function for `/path/index.html` routing

## Build Configuration Detected

- **Framework**: Next.js 15.5.7
- **Next.js Config**: `output: 'export'` + `trailingSlash: true`
- **Build Output**: `out/` directory
- **Build Script**: `npm run build`
- **PWA Support**: Enabled (next-pwa 5.6.0)
- **Static Export**: Yes - appropriate for S3+CloudFront deployment

## Recovery Guide

```bash
# Rollback (destroy all resources)
cd infra && npx cdk destroy --all

# Redeploy to same environment
./scripts/deploy.sh preview-$(whoami)

# Redeploy without rebuilding assets
WITH_ASSETS=false ./scripts/deploy.sh preview-$(whoami)

# View stack details
aws cloudformation describe-stacks --stack-name DDDEMWebFrontend-preview-$(whoami)

# Invalidate CloudFront cache after manual updates
aws cloudfront create-invalidation --distribution-id [DISTRIBUTION_ID] --paths "/*"
```

## Issues Encountered and Resolved

1. **CloudFront Function Syntax Error** (RESOLVED)
   - Initial function had incorrect syntax with event.request assignment
   - Solution: Simplified JavaScript to use var declarations and proper return statements

2. **Root Path Handling** (RESOLVED)
   - CloudFront function was converting `/` to `//index.html` causing 503 errors
   - Solution: Added special case for `/` to skip rewriting at root level

3. **Directory Routing for Static Sites** (RESOLVED)
   - `/path/` wasn't serving `/path/index.html` from S3
   - Solution: Updated CloudFront function to append `/index.html` to directory-like paths

All issues successfully resolved. Deployment complete and tested with live requests.

## Session Log

### Session 1 - 2026-01-09T23:00:00Z
Agent: claude-haiku-4-5-20251001-v1:0
Progress: Completed Phases 1-3 - initialized deployment plan, detected Next.js static export configuration, built CDK infrastructure with S3+CloudFront, created deployment script, deployed successfully to AWS, fixed CloudFront function for static multi-page routing, validated all routes working correctly
Next: Phase 4 - Finalize documentation and README
