# TrenchesPad - Vercel Deployment Guide

## 🚀 Quick Deploy

### Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository pushed to GitHub

---

## Step 1: Prepare Your Repository

### 1.1 Ensure all changes are committed
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 1.2 Verify your repository structure
```
TrenchesPad/
├── frontend/          # Next.js app
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── next.config.ts
├── contracts/         # Smart contracts (not deployed to Vercel)
├── vercel.json       # Vercel configuration
└── README.md
```

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub

2. **Import Your Repository**
   - Click **"Add New Project"**
   - Select **"Import Git Repository"**
   - Choose your `TrenchesPad` repository
   - Click **"Import"**

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables**
   - Click **"Environment Variables"**
   - Add the following variables:
   
   ```
   NEXT_PUBLIC_FACTORY_ADDRESS=your_factory_address
   NEXT_PUBLIC_BASE_SEPOLIA_RPC=https://sepolia.base.org
   NEXT_PUBLIC_CHAIN_ID=84532
   NEXT_PUBLIC_EXPLORER_URL=https://sepolia.basescan.org
   ```
   
   - Select **Production**, **Preview**, and **Development**
   - Click **"Add"** for each variable

5. **Deploy**
   - Click **"Deploy"**
   - Wait for deployment to complete (2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project root**
   ```bash
   cd e:\TrenchesPad
   vercel
   ```

4. **Follow the prompts**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **trenchespad** (or your choice)
   - In which directory is your code located? **frontend**
   - Want to override settings? **N**

5. **Set environment variables**
   ```bash
   vercel env add NEXT_PUBLIC_FACTORY_ADDRESS
   vercel env add NEXT_PUBLIC_BASE_SEPOLIA_RPC
   vercel env add NEXT_PUBLIC_CHAIN_ID
   vercel env add NEXT_PUBLIC_EXPLORER_URL
   ```

6. **Deploy to production**
   ```bash
   vercel --prod
   ```

---

## Step 3: Post-Deployment Configuration

### 3.1 Custom Domain (Optional)
1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Domains**
3. Add your custom domain
4. Update DNS records as instructed

### 3.2 Update Environment Variables
After deploying smart contracts:
1. Go to **Settings** → **Environment Variables**
2. Update `NEXT_PUBLIC_FACTORY_ADDRESS` with deployed address
3. Redeploy to apply changes

### 3.3 Enable Analytics (Optional)
1. Go to **Analytics** tab
2. Enable Vercel Analytics
3. View real-time traffic and performance

---

## Step 4: Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

### Disable Auto-Deploy (if needed)
1. Go to **Settings** → **Git**
2. Configure deployment branches
3. Disable auto-deploy for specific branches

---

## Troubleshooting

### Build Fails

**Error**: `Module not found`
- **Solution**: Ensure all dependencies are in `frontend/package.json`
- Run `npm install` locally to verify

**Error**: `Build exceeded maximum duration`
- **Solution**: Optimize build by removing unused dependencies
- Consider upgrading Vercel plan for longer build times

### Environment Variables Not Working

**Issue**: Variables are undefined in browser
- **Solution**: Ensure variables start with `NEXT_PUBLIC_`
- Redeploy after adding variables
- Clear browser cache

### Wallet Connection Issues

**Issue**: MetaMask not connecting
- **Solution**: Ensure you're on the correct network (Base Sepolia)
- Check that RPC URL is correct
- Verify contract addresses are deployed

---

## Production Checklist

Before going to production:

- [ ] Deploy smart contracts to Base Mainnet
- [ ] Update environment variables with mainnet addresses
- [ ] Update RPC URL to mainnet
- [ ] Test all pages thoroughly
- [ ] Test wallet connection
- [ ] Test campaign creation
- [ ] Test contribution flow
- [ ] Set up custom domain
- [ ] Enable Vercel Analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Configure SEO metadata
- [ ] Add favicon and OG images

---

## Useful Commands

```bash
# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel remove [deployment-url]

# Pull environment variables locally
vercel env pull

# Open project in browser
vercel open
```

---

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## Support

If you encounter issues:
1. Check [Vercel Status](https://www.vercel-status.com/)
2. Review deployment logs in Vercel Dashboard
3. Check Next.js build logs
4. Visit [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Your TrenchesPad deployment URL**: `https://trenchespad.vercel.app` (or your custom domain)

🎉 **Deployment Complete!** Your neo-brutalist launchpad is now live!
