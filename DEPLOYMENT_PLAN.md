---
sop_name: deploy-frontend-app
repo_name: dddem-web
app_name: dddemweb
app_type: Frontend Application (Next.js Static Export)
branch: deploy-to-aws-20260130_032535-sergeyka
created: 2026-01-30T03:28:00Z
last_updated: 2026-01-30T03:28:00Z
---

# Deployment Plan: DDD East Midlands Website

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

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

- Framework: Next.js with static export
- Package Manager: npm
- Build Command: npm run build
- Output Directory: out/
- Base Path: / (root)
- Entry Point: index.html
- Deployment URL: [after completion]
- Stack Name: [after creation]
- Distribution ID: [after creation]
- S3 Bucket Name: [after creation]
- S3 Log Bucket: [after creation]
- CloudFront Log Bucket: [after creation]

## Recovery Guide

```bash
# Rollback
cd infra
cdk destroy "dddemwebFrontend-<environment>"

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-30T03:28:00Z
Agent: Claude Sonnet 4.5
Progress: Created deployment plan
Next: Step 2 - Create Deploy Branch
