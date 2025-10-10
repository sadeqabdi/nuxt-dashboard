# 🚀 Deployment Guide

This guide covers various deployment strategies for your Nuxt 3 Dashboard application, including SSR (Server-Side Rendering), static generation, and containerization.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Configuration](#environment-configuration)
3. [Build Process](#build-process)
4. [Deployment Options](#deployment-options)
   - [Vercel (Recommended)](#1-vercel-recommended)
   - [Netlify](#2-netlify)
   - [Node.js Server (SSR)](#3-nodejs-server-ssr)
   - [Docker](#4-docker)
   - [Static Hosting](#5-static-hosting)
5. [CI/CD Setup](#cicd-setup)
6. [Performance Optimization](#performance-optimization)
7. [Monitoring & Logging](#monitoring--logging)

---

## Pre-Deployment Checklist

Before deploying, ensure you've completed these tasks:

- [ ] Run linter and fix all errors: `npm run lint`
- [ ] Build successfully locally: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Update environment variables for production
- [ ] Configure proper API endpoints
- [ ] Set up error tracking (Sentry, Bugsnag, etc.)
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS policies
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Review security headers
- [ ] Test on multiple browsers
- [ ] Optimize images and assets
- [ ] Configure caching strategy

---

## Environment Configuration

### Create `.env` file:

```bash
# .env.example (copy to .env)

# API Configuration
NUXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
NUXT_API_SECRET=your-secret-key-here

# Environment
NUXT_PUBLIC_ENV=production

# Analytics (Optional)
NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry (Optional)
NUXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# Feature Flags
NUXT_PUBLIC_ENABLE_DARK_MODE=true
NUXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Update `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys (server-only)
    apiSecret: process.env.NUXT_API_SECRET,
    
    // Public keys (exposed to client)
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '/api',
      env: process.env.NUXT_PUBLIC_ENV || 'development',
      gaId: process.env.NUXT_PUBLIC_GA_ID,
      sentryDsn: process.env.NUXT_PUBLIC_SENTRY_DSN
    }
  }
})
```

---

## Build Process

### 1. Standard Build (SSR)

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Output location: .output/
```

### 2. Static Site Generation

```bash
# Generate static site
npm run generate

# Output location: .output/public/
```

### 3. Preview Production Build

```bash
# Test production build locally
npm run preview
```

---

## Deployment Options

### 1. Vercel (Recommended)

Vercel provides excellent support for Nuxt 3 with automatic deployments, edge functions, and analytics.

#### Quick Deploy:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Vercel Configuration (`vercel.json`):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.ts",
      "use": "@nuxtjs/vercel-builder"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env": {
    "NUXT_PUBLIC_API_BASE_URL": "@api_base_url"
  }
}
```

#### Set Environment Variables in Vercel:

1. Go to Project Settings → Environment Variables
2. Add your environment variables
3. Deploy

#### Custom Domain:

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

### 2. Netlify

#### Deploy via Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Netlify Configuration (`netlify.toml`):

```toml
[build]
  command = "npm run build"
  publish = ".output/public"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer"
```

---

### 3. Node.js Server (SSR)

Deploy to any Node.js hosting provider (DigitalOcean, AWS EC2, Heroku, etc.)

#### Step 1: Build the Application

```bash
npm run build
```

#### Step 2: Start the Server

```bash
node .output/server/index.mjs
```

#### Step 3: Use PM2 for Process Management

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start .output/server/index.mjs --name "nuxt-dashboard"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

#### PM2 Ecosystem File (`ecosystem.config.js`):

```javascript
module.exports = {
  apps: [{
    name: 'nuxt-dashboard',
    script: './.output/server/index.mjs',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NUXT_PUBLIC_API_BASE_URL: 'https://api.yourdomain.com'
    }
  }]
}
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
```

---

### 4. Docker

#### Dockerfile:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built application
COPY --from=builder /app/.output /app/.output

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start application
CMD ["node", ".output/server/index.mjs"]
```

#### Docker Compose (`docker-compose.yml`):

```yaml
version: '3.8'

services:
  nuxt-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NUXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
    restart: always
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

#### Build and Run:

```bash
# Build image
docker build -t nuxt-dashboard .

# Run container
docker run -p 3000:3000 -d nuxt-dashboard

# Or use Docker Compose
docker-compose up -d
```

---

### 5. Static Hosting

For static hosting on services like GitHub Pages, Cloudflare Pages, or AWS S3:

#### Step 1: Generate Static Site

```bash
npm run generate
```

#### Step 2: Deploy `.output/public/` directory

**GitHub Pages:**
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add script to package.json
"deploy": "gh-pages -d .output/public"

# Deploy
npm run deploy
```

**Cloudflare Pages:**
```bash
# Install Wrangler CLI
npm install -g wrangler

# Deploy
wrangler pages publish .output/public
```

---

## CI/CD Setup

### GitHub Actions (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run typecheck

      - name: Build
        run: npm run build
        env:
          NUXT_PUBLIC_API_BASE_URL: ${{ secrets.API_BASE_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Performance Optimization

### 1. Enable Compression

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: true,
  }
})
```

### 2. Configure Caching

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
    '/dashboard': { ssr: true },
    '/api/**': { cors: true, headers: { 'cache-control': 's-maxage=60' } },
  }
})
```

### 3. Image Optimization

```bash
# Install Nuxt Image
npm install @nuxt/image

# Configure in nuxt.config.ts
modules: ['@nuxt/image']
```

### 4. Code Splitting

Nuxt 3 automatically code-splits routes, but you can optimize further:

```typescript
// Use dynamic imports for heavy components
const HeavyChart = defineAsyncComponent(() => 
  import('~/components/HeavyChart.vue')
)
```

---

## Monitoring & Logging

### 1. Sentry Integration

```bash
npm install @sentry/vue
```

```typescript
// plugins/sentry.client.ts
import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: config.public.sentryDsn,
    environment: config.public.env,
    tracesSampleRate: 1.0,
  })
})
```

### 2. Google Analytics

```bash
npm install vue-gtag-next
```

```typescript
// plugins/analytics.client.ts
import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: config.public.gaId
    }
  })
})
```

### 3. Server Logs

Use Winston or Pino for server-side logging:

```bash
npm install winston
```

```typescript
// utils/logger.ts
import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
```

---

## Security Best Practices

### 1. Security Headers

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'no-referrer',
          'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
        }
      }
    }
  }
})
```

### 2. Environment Variables

- Never commit `.env` files
- Use platform-specific secrets management
- Rotate secrets regularly

### 3. HTTPS Only

- Always use HTTPS in production
- Enable HSTS headers
- Redirect HTTP to HTTPS

---

## Troubleshooting

### Issue: Build Fails

**Solution:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Nuxt cache: `rm -rf .nuxt`
- Check Node.js version (requires 18+)

### Issue: SSR Hydration Errors

**Solution:**
- Ensure server and client render the same HTML
- Use `<ClientOnly>` for client-only components
- Check for browser-specific APIs used on server

### Issue: Environment Variables Not Working

**Solution:**
- Prefix with `NUXT_PUBLIC_` for client-side access
- Restart dev server after changing `.env`
- Verify variable names in `nuxt.config.ts`

---

## Post-Deployment

After deployment, verify:

- [ ] Application loads correctly
- [ ] All pages render properly
- [ ] Authentication flow works
- [ ] API calls succeed
- [ ] Dark mode functions
- [ ] Mobile responsiveness
- [ ] Error pages display correctly
- [ ] Performance metrics are acceptable
- [ ] Analytics tracking works
- [ ] Error tracking captures issues

---

## Useful Commands

```bash
# Check bundle size
npm run build -- --analyze

# Run type checking
npm run typecheck

# Run linter
npm run lint

# Preview production build
npm run preview

# Check for outdated packages
npm outdated

# Update packages
npm update
```

---

## Resources

- [Nuxt 3 Deployment Docs](https://nuxt.com/docs/getting-started/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)

---

**Happy Deploying! 🚀**

