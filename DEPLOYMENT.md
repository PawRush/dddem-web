---
sop_name: deploy-frontend-app
repo_name: dddem-web
app_name: dddem
app_type: Frontend Application (Next.js Static Export)
branch: deploy-to-aws-20260128_161953-sergeyka
created: 2026-01-28T16:22:00
completed: 2026-01-28T16:40:00
framework: Next.js v15
package_manager: npm
build_command: npm run build
output_directory: out/
trailing_slash: true
url_rewrite_type: urlRewriteFunction
---

# Deployment Summary

Your app is deployed to AWS! Preview URL: https://dfskb73i5m8.cloudfront.net

**Next Step: Automate Deployments**

You're currently using manual deployment. To automate deployments from GitHub, ask your coding agent to set up AWS CodePipeline using an agent SOP for pipeline creation. Try: "create a pipeline using AWS SOPs"

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View deployment status
aws cloudformation describe-stacks --stack-name "dddemFrontend-preview-sergeyka" --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "E1XFSUXPEBDO6Z" --paths "/*"

# View CloudFront access logs (last hour)
aws s3 ls "s3://dddemfrontend-preview-ser-cftos3cloudfrontloggingb-1izczb9y00fx/" --recursive | tail -20

# Redeploy
./scripts/deploy.sh
```

## Production Readiness

For production deployments, consider:
- WAF Protection: Add AWS WAF with managed rules (Core Rule Set, Known Bad Inputs) and rate limiting
- CSP Headers: Configure Content Security Policy in CloudFront response headers (`script-src 'self'`, `frame-ancestors 'none'`)
- Custom Domain: Set up Route 53 and ACM certificate
- Monitoring: CloudWatch alarms for 4xx/5xx errors and CloudFront metrics
- Auth Redirect URLs: If using an auth provider (Auth0, Supabase, Firebase, Lovable, etc.), add your CloudFront URL to allowed redirect URLs

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
- [x] Step 10: Execute CDK Deployment
- [x] Step 11: Validate CloudFormation Stack

**Phase 3 Checkpoint**

## Phase 4: Update Documentation
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md

**COMPLETION STEP**

## Deployment Info

- Deployment URL: https://dfskb73i5m8.cloudfront.net
- Stack name: dddemFrontend-preview-sergeyka
- Distribution ID: E1XFSUXPEBDO6Z
- Distribution Domain: dfskb73i5m8.cloudfront.net
- S3 Bucket Name: dddemfrontend-preview-serge-cftos3s3bucketcae9f2be-4i7ilh9y8rk1
- CloudFront Log Bucket: dddemfrontend-preview-ser-cftos3cloudfrontloggingb-1izczb9y00fx
- S3 Log Bucket: dddemfrontend-preview-ser-cftos3s3loggingbucket64b-vn4gbkedqnhl
- Deployment Timestamp: 2026-01-28T16:38:33

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
Progress: Completed full deployment (all 4 phases)
- Phase 1: Gathered context, detected Next.js static export with trailing slash
- Phase 2: Built CDK infrastructure with CloudFront and S3
- Phase 3: Deployed to AWS successfully
- Phase 4: Finalized documentation
Next: N/A - Deployment complete
