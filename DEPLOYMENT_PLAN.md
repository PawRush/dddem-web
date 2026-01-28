---
sop_name: deploy-frontend-app
repo_name: dddem-web
app_name: dddem
app_type: Frontend Application (Next.js Static Export)
branch: deploy-to-aws-20260128_161953-sergeyka
created: 2026-01-28T16:22:00
last_updated: 2026-01-28T16:27:00
framework: Next.js v15
package_manager: npm
build_command: npm run build
output_directory: out/
trailing_slash: true
url_rewrite_type: urlRewriteFunction
---

# Deployment Plan: DDD East Midlands Website

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
- [x] Step 4: Validate Prerequisites
- [x] Step 5: Revisit Deployment Plan

**Phase 1 Checkpoint**

## Phase 2: Build CDK Infrastructure
- [x] Step 6: Initialize CDK Foundation
- [x] Step 7: Generate CDK Stack
- [x] Step 8: Create Deployment Script
- [x] Step 9: Validate CDK Synth

**Phase 2 Checkpoint**

## Phase 3: Deploy and Validate
- [ ] Step 10: Execute CDK Deployment
- [ ] Step 11: Validate CloudFormation Stack

**Phase 3 Checkpoint**

## Phase 4: Update Documentation
- [ ] Step 12: Finalize Deployment Plan
- [ ] Step 13: Update README.md

**COMPLETION STEP**

## Deployment Info

- Deployment URL: [after completion]
- Stack name: [after creation]
- Distribution ID: [after deployment]
- S3 Bucket Name: [after deployment]
- CloudFront Log Bucket: [after deployment]
- S3 Log Bucket: [after deployment]

## Recovery Guide

```bash
# Rollback
cd infra
cdk destroy "dddemFrontend-<environment>"

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-28T16:22:00
Agent: Claude Sonnet 4.5
Progress: Created deployment plan
Next: Step 2 - Create Deploy Branch
