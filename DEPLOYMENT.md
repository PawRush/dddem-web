# Deployment Summary

Your app is deployed to AWS with a production-ready URL that doesn't change when you update GitHub.

**Live URL**: https://d12q89g94187ud.cloudfront.net

To connect deployments to GitHub changes automatically, ask your coding agent to set up an AWS CodePipeline.

**Services used**: CloudFront, S3, CloudFormation, IAM

---

# Full Deployment Plan: DDD East Midlands Web

Coding Agents should follow this Deployment Plan and validate previous progress if picking up the Deployment in a new coding session.

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

- **Deployment URL**: https://d12q89g94187ud.cloudfront.net
- **Stack Name**: DDDEMWebFrontend-preview-jairosp
- **CloudFront Distribution ID**: E2H0FYMEIONZAR
- **Content S3 Bucket**: dddemwebfrontend-preview-ja-cftos3s3bucketcae9f2be-gp0rhb0n9zud
- **S3 Access Logs Bucket**: dddemwebfrontend-preview--cftos3s3loggingbucket64b-zyvm9gwxw9ec
- **CloudFront Access Logs Bucket**: dddemwebfrontend-preview--cftos3cloudfrontloggingb-9yhkeuk1og7x
- **Build Output Directory**: `out/`
- **Build Command**: `npm run build`
- **Framework**: Next.js 15.5.7 (static export with trailing slashes)
- **CloudFront Routing**: URL rewrite function handles `/path/` → `/path/index.html` routing for static multi-page sites

## Build Configuration

- **Framework**: Next.js 15.5.7
- **Configuration**: `output: 'export'` + `trailingSlash: true` in next.config.js
- **Build Output**: `out/` directory
- **PWA Support**: Enabled (next-pwa 5.6.0)
- **Architecture**: Perfect for S3+CloudFront static hosting

## How to Update Your Deployment

### Redeploy with Latest Code
```bash
./scripts/deploy.sh
```

### Redeploy Without Rebuilding
```bash
WITH_ASSETS=false ./scripts/deploy.sh
```

### Deploy to Specific Environment
```bash
./scripts/deploy.sh dev      # Deploy to dev environment
./scripts/deploy.sh prod     # Deploy to production
```

### View Stack Details
```bash
aws cloudformation describe-stacks --stack-name DDDEMWebFrontend-preview-jairosp
```

### Invalidate CloudFront Cache
```bash
aws cloudfront create-invalidation --distribution-id E2H0FYMEIONZAR --paths "/*"
```

## Recovery and Rollback

### Destroy All Resources
```bash
cd infra && npx cdk destroy --all
```

### Redeploy from Scratch
```bash
./scripts/deploy.sh
```

## Production Readiness Checklist

For production deployments, consider:

- **Custom Domain**: Set up Route 53 and ACM certificate to use a custom domain instead of the CloudFront URL
- **WAF Protection**: Add AWS WAF with managed rules (Core Rule Set, Known Bad Inputs) and rate limiting
- **CSP Headers**: Configure Content Security Policy in CloudFront response headers for security
- **Monitoring**: Set up CloudWatch alarms for 4xx/5xx errors and CloudFront metrics
- **Auth Redirect URLs**: If using an auth provider (Auth0, Supabase, Firebase, etc.), add your CloudFront URL to allowed redirect URLs in the provider's settings
- **HTTPS Enforcement**: Already enabled - all traffic is served over HTTPS with modern TLS 1.2+
- **Caching Strategy**: Currently configured to not cache to ensure fresh content; adjust based on your needs

## Deployment Infrastructure Details

### CloudFront Distribution
- **HTTP/3 Support**: Enabled for fast connections
- **Price Class**: PRICE_CLASS_100 (optimized for cost)
- **Security**:
  - Origin Access Control (OAC) for secure S3 access
  - Security headers (X-Frame-Options: DENY, X-Content-Type-Options: nosniff)
  - HSTS enabled (Strict-Transport-Security)
  - Modern TLS 1.2+ only
- **Logging**: Both S3 and CloudFront access logs enabled for monitoring

### S3 Buckets
- **Versioning**: Disabled
- **Public Access**: Completely blocked via OAC
- **Auto-deletion**: Enabled for preview environments (non-production)
- **Encryption**: AES-256 at rest
- **Logging**: Configured for S3 and CloudFront access logs
- **Lifecycle**: Access logs deleted after 7 days (preview) or 10 years (production)

### CDK Infrastructure
- Located in `infra/` directory
- Built with TypeScript
- Uses `@aws-solutions-constructs/aws-cloudfront-s3` construct for best practices
- Supports multiple deployment environments via context variables
- Automatic bucket deployment and cache invalidation

## Troubleshooting

### CloudFront Returns 404
- Verify the file exists in S3: `aws s3 ls s3://[bucket-name]/[path]`
- Check CloudFront cache: `aws cloudfront create-invalidation --distribution-id [ID] --paths "/*"`
- Verify Route 53 alias if using custom domain

### Stale Content After Update
- CloudFront invalidation is automatic, but you can manually invalidate:
  ```bash
  aws cloudfront create-invalidation --distribution-id E2H0FYMEIONZAR --paths "/*"
  ```

### Authentication Issues
- If using an auth provider, ensure the CloudFront URL is added to allowed redirect URLs in the provider settings

### Deployment Fails
- Check AWS credentials: `aws sts get-caller-identity`
- Check CDK dependencies: `cd infra && npm install`
- Review CloudFormation events: `aws cloudformation describe-stack-events --stack-name DDDEMWebFrontend-preview-jairosp`

## Session Log

### Session 1 - 2026-01-09T23:00:00Z
Agent: claude-haiku-4-5-20251001-v1:0
Progress: Completed full deployment - Phases 1-4 complete. Initialized deployment plan, detected Next.js static export configuration, built CDK infrastructure with S3+CloudFront, created deployment script, deployed successfully to AWS, fixed CloudFront function for static multi-page routing, validated all routes working correctly.

**Deployment Results**:
- Stack created successfully in us-east-1
- CloudFront distribution deployed and serving traffic
- All routes responding with HTTP 200
- S3 and CloudFront access logging enabled
- Security headers configured properly
- Live URL: https://d12q89g94187ud.cloudfront.net

**Issues Encountered and Resolved**:
1. Initial CloudFront function had issue with root path - fixed by adding special handling for `/`
2. Directory routing required proper index.html appending - simplified and corrected CloudFront function logic
3. CloudFront function updates required full deployment (not hotswappable) - expected behavior

**Next Steps**:
- Consider setting up CodePipeline for automatic deployments on Git changes
- Set up custom domain with Route 53 if desired
- Configure WAF for production
- Monitor CloudWatch metrics and logs

---

Generated with deploy-frontend-app SOP
