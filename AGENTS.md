# Agent Instructions

This file contains instructions and context for AI coding agents working on this project.

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, pipeline setup, and next steps.

The application is deployed to AWS using CDK infrastructure. Use `./scripts/deploy.sh` to deploy changes.

## Project Overview

DDD East Midlands conference website built with Next.js static export. The site uses:
- Next.js 15 with static export
- React Bootstrap for UI components
- SCSS for styling
- Next PWA for progressive web app features

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Architecture

- Framework: Next.js with static export (trailingSlash: true)
- Output: Static HTML/CSS/JS files in `out/` directory
- Routing: Static multi-page with /path/index.html structure
- Deployment: AWS CloudFront + S3
