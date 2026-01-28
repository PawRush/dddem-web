# Agent Documentation

This file contains information for AI coding agents working on this project.

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, pipeline setup, and next steps.

## Project Overview

DDDEMWeb is a Next.js static website for DDD East Midlands conference. The site is exported as static HTML and deployed to AWS using CloudFront + S3.

## Development

- Framework: Next.js 15.5.7 with static export
- Package Manager: npm
- Build Command: `npm run build`
- Dev Server: `npm run dev`
- Output Directory: `out/`

## Testing

- Unit Tests: `npm test`
- E2E Tests: `npm run test:e2e`
- Accessibility: `npm run pa11y-ci`

## Deployment

### Automated Deployment (CI/CD)

Push to `deploy-to-aws-20260128_174824-sergeyka` branch triggers automatic deployment via CodePipeline:
```bash
git push origin deploy-to-aws-20260128_174824-sergeyka
```

Pipeline Console: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/DDDEMWebPipeline/view

### Manual Deployment

Manual deployment via CDK (for preview environments):
```bash
./scripts/deploy.sh                   # Deploy to preview-$(whoami)
./scripts/deploy.sh dev               # Deploy to dev environment
./scripts/deploy.sh prod              # Deploy to production
```

See DEPLOYMENT.md for full deployment documentation, pipeline details, and troubleshooting.
