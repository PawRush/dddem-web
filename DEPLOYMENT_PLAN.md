---
sop_name: deploy-frontend-app
sop_version: 1.0
repo_name: dddem-web
app_name: DDDEMWeb
app_type: Frontend Application (Next.js Static Export)
branch: deploy-to-aws
created: 2026-01-09T23:00:00Z
last_updated: 2026-01-09T23:00:00Z
---

# Deployment Plan: DDD East Midlands Web

Coding Agents should follow this Deployment Plan and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [ ] Step 0: Inform User of Execution Flow
- [ ] Step 1: Create Deployment Plan
- [ ] Step 2: Create Deploy Branch
- [ ] Step 3: Detect Build Configuration
- [ ] Step 4: Validate Prerequisites
- [ ] Step 5: Revisit Deployment Plan

## Phase 2: Build CDK Infrastructure
- [ ] Step 6: Initialize CDK Foundation
- [ ] Step 7: Generate CDK Stack
- [ ] Step 8: Create Deployment Script
- [ ] Step 9: Validate CDK Synth

## Phase 3: Deploy and Validate
- [ ] Step 10: Execute CDK Deployment
- [ ] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation
- [ ] Step 12: Finalize Deployment Plan
- [ ] Step 13: Update README.md

## Deployment Info

- Deployment URL: [pending]
- Stack name: DDDEMWebFrontend-preview-[username]
- Distribution ID: [pending]
- S3 bucket names: [pending]
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

## Issues Encountered

None yet.

## Session Log

### Session 1 - 2026-01-09T23:00:00Z
Agent: claude-haiku-4-5-20251001-v1:0
Progress: Initialized deployment plan, completed Phase 1 Steps 0-1, detected Next.js static export configuration
Next: Step 2 - Create Deploy Branch
