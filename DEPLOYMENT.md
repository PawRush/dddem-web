---
sop_name: deploy-frontend-app
repo_name: dddem-web
app_name: dddemweb
app_type: Frontend Application (Next.js Static Export)
branch: deploy-to-aws-20260130_032535-sergeyka
created: 2026-01-30T03:28:00Z
completed: 2026-01-30T03:42:00Z
---

# Deployment Summary

Your app is deployed to AWS! Preview URL: https://d2o242ksiuhew9.cloudfront.net

**Next Step: Automate Deployments**

You're currently using manual deployment. To automate deployments from GitHub, ask your coding agent to set up AWS CodePipeline using an agent SOP for pipeline creation. Try: "create a pipeline using AWS SOPs"

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
- What resources were deployed to AWS?
- How do I update my deployment?

## Quick Commands

```bash
# View deployment status
aws cloudformation describe-stacks --stack-name "dddemwebFrontend-preview-sergeyka" --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "E3QDJZ8ZK3R1YQ" --paths "/*"

# View CloudFront access logs (last hour)
aws s3 ls "s3://dddemwebfrontend-preview--cftos3cloudfrontloggingb-abird3rru2po/" --recursive | tail -20

# Redeploy
./scripts/deploy.sh
```

## Production Readiness

For production deployments, consider:
- WAF Protection: Add AWS WAF with managed rules (Core Rule Set, Known Bad Inputs) and rate limiting
- CSP Headers: Already configured with Content Security Policy in CloudFront response headers
- Custom Domain: Set up Route 53 and ACM certificate
- Monitoring: CloudWatch alarms for 4xx/5xx errors and CloudFront metrics
- Auth Redirect URLs: If using an auth provider (Auth0, Supabase, Firebase, Lovable, etc.), add your CloudFront URL to allowed redirect URLs

---

# Deployment Plan: DDD East Midlands Website

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

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

- Framework: Next.js with static export (trailingSlash: true)
- Package Manager: npm
- Build Command: npm run build
- Output Directory: out/
- Base Path: / (root)
- Entry Point: index.html
- Routing: Static multi-page with /path/index.html structure
- CloudFront Function: URL rewrite function (rewrites /path to /path/index.html)
- Linter: ESLint (npm run lint)
- Deployment URL: https://d2o242ksiuhew9.cloudfront.net
- Stack Name: dddemwebFrontend-preview-sergeyka
- Distribution ID: E3QDJZ8ZK3R1YQ
- Distribution Domain: d2o242ksiuhew9.cloudfront.net
- S3 Bucket Name: dddemwebfrontend-preview-se-cftos3s3bucketcae9f2be-sbyqvkwgtw6e
- S3 Log Bucket: dddemwebfrontend-preview--cftos3s3loggingbucket64b-stbagon9tm6v
- CloudFront Log Bucket: dddemwebfrontend-preview--cftos3cloudfrontloggingb-abird3rru2po
- Deployment Timestamp: 2026-01-30T03:41:25Z
- Environment: preview-sergeyka

## Recovery Guide

```bash
# Rollback
cd infra
cdk destroy "dddemwebFrontend-preview-sergeyka"

# Redeploy
./scripts/deploy.sh

# Deploy to different environment
./scripts/deploy.sh dev        # Deploy to dev environment
./scripts/deploy.sh prod       # Deploy to production
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-30T03:28:00Z - 2026-01-30T03:42:00Z
Agent: Claude Sonnet 4.5
Progress: Completed full deployment - all phases finished successfully
- Phase 1: Detected Next.js static export with trailingSlash:true
- Phase 2: Generated CDK stack with URL rewrite function
- Phase 3: Deployed to AWS CloudFormation
- Phase 4: Finalized documentation
Status: DEPLOYMENT COMPLETE
