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

---

## Step 2: Deploy to Vercel Dashboard

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub

2. **Import Your Repository**
   - Click **"Add New Project"**
   - Select **"Import Git Repository"**
   - Choose your `TrenchesPad` repository
   - Click **"Import"**

3. **Configure Project Settings** ⚠️ IMPORTANT

   Set these EXACTLY as shown:
   
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `frontend` ← **CRITICAL: Must set this!**
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)
   - **Node Version**: 18.x or higher

4. **Add Environment Variables** (Optional for now)
   
   Click **"Environment Variables"** and add:
   
   ```
   NEXT_PUBLIC_FACTORY_ADDRESS=0x0000000000000000000000000000000000000000
   NEXT_PUBLIC_BASE_SEPOLIA_RPC=https://sepolia.base.org
   NEXT_PUBLIC_CHAIN_ID=84532
   NEXT_PUBLIC_EXPLORER_URL=https://sepolia.basescan.org
   ```
   
   - Select **Production**, **Preview**, and **Development**
   - Click **"Add"** for each variable
   - *Note: You can skip this for initial deployment and add later*

5. **Deploy**
   - Click **"Deploy"**
   - Wait for deployment to complete (2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

---

## Common Issues & Solutions

### ❌ Error: "No such file or directory"
**Cause**: Root directory not set to `frontend`

**Solution**: 
1. Go to Project Settings → General
2. Set **Root Directory** to `frontend`
3. Redeploy

### ❌ Error: "Command failed"
**Cause**: Build command running from wrong directory

**Solution**: 
- Ensure Root Directory is set to `frontend`
- Vercel will automatically run commands from that directory

### ❌ Error: "Module not found"
**Cause**: Dependencies not installed properly

**Solution**:
- Check that `frontend/package.json` exists
- Verify all dependencies are listed
- Try redeploying

---

## Step 3: Post-Deployment

### Update Environment Variables (After Smart Contract Deployment)

1. Deploy your smart contracts to Base Sepolia
2. Go to Vercel Project → **Settings** → **Environment Variables**
3. Update `NEXT_PUBLIC_FACTORY_ADDRESS` with your deployed factory address
4. Click **"Save"**
5. Go to **Deployments** tab
6. Click **"Redeploy"** on the latest deployment

### Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Wait for DNS propagation (up to 48 hours)

---

## Vercel CLI Alternative

If you prefer using the CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (from TrenchesPad root directory)
cd e:\TrenchesPad
vercel

# When prompted:
# - Set up and deploy? Y
# - Which scope? [Select your account]
# - Link to existing project? N
# - Project name? trenchespad
# - In which directory is your code located? frontend
# - Want to override settings? N

# Deploy to production
vercel --prod
```

---

## Production Checklist

Before going live:

- [ ] ✅ Build succeeds locally (`npm run build` in frontend/)
- [ ] ✅ Root directory set to `frontend` in Vercel
- [ ] ✅ Deploy smart contracts to Base Sepolia/Mainnet
- [ ] ✅ Update environment variables with contract addresses
- [ ] ✅ Test wallet connection on deployed site
- [ ] ✅ Test all pages load correctly
- [ ] ✅ Verify responsive design on mobile
- [ ] ✅ Set up custom domain (optional)
- [ ] ✅ Enable Vercel Analytics (optional)

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

---

**🎉 Your TrenchesPad is now live!**

Access your deployment at: `https://your-project.vercel.app`
