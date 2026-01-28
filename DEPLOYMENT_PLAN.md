---
sop_name: deploy-frontend-app
repo_name: dddem-web
app_name: DDDEMWeb
app_type: Frontend Application
branch: deploy-to-aws-20260128_174824-sergeyka
created: 2026-01-28T17:51:00Z
last_updated: 2026-01-28T17:55:00Z
---

# Deployment Plan: DDDEMWeb

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
- [ ] Step 4: Validate Prerequisites
- [ ] Step 5: Revisit Deployment Plan
- [ ] Phase 1 Checkpoint

## Phase 2: Build CDK Infrastructure
- [ ] Step 6: Initialize CDK Foundation
- [ ] Step 7: Generate CDK Stack
- [ ] Step 8: Create Deployment Script
- [ ] Step 9: Validate CDK Synth
- [ ] Phase 2 Checkpoint

## Phase 3: Deploy and Validate
- [ ] Step 10: Execute CDK Deployment
- [ ] Step 11: Validate CloudFormation Stack
- [ ] Phase 3 Checkpoint

## Phase 4: Update Documentation
- [ ] Step 12: Finalize Deployment Plan
- [ ] Step 13: Update README.md
- [ ] Completion Step

## Deployment Info

- Deployment URL: [pending]
- Stack name: [pending]
- Distribution ID: [pending]
- S3 bucket name: [pending]
- S3 log bucket: [pending]
- CloudFront log bucket: [pending]

## Build Configuration

- Framework: Next.js (static export with trailingSlash: true)
- Package manager: npm
- Build command: npm run build
- Output directory: out/
- Base path: / (root)
- Entry point: index.html
- Lint command: npm run lint
- CloudFront config: URL rewrite function (/path -> /path/index.html)

## Recovery Guide

```bash
# Rollback
cd infra
cdk destroy "DDDEMWebFrontend-preview-$(whoami)"

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-28T17:51:00Z
Agent: Claude Sonnet 4.5
Progress: Created deployment plan, branch, detected build config (Next.js static export, npm, out/)
Next: Validate prerequisites
