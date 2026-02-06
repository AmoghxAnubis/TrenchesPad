@echo off
REM Deploy to Vercel - Quick Start (Windows)

echo.
echo 🚀 TrenchesPad - Vercel Deployment
echo ==================================
echo.

REM Check if in correct directory
if not exist "frontend" (
    echo ❌ Error: Run this script from the TrenchesPad root directory
    exit /b 1
)

REM Check if git is initialized
if not exist ".git" (
    echo 📦 Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit - TrenchesPad"
)

REM Check for uncommitted changes
git diff-index --quiet HEAD --
if errorlevel 1 (
    echo 📝 Committing latest changes...
    git add .
    git commit -m "Prepare for Vercel deployment"
)

echo.
echo ✅ Repository ready for deployment
echo.
echo Next steps:
echo 1. Push to GitHub: git push origin main
echo 2. Go to https://vercel.com/new
echo 3. Import your TrenchesPad repository
echo 4. Set Root Directory to: frontend
echo 5. Add environment variables (see VERCEL_ENV.md)
echo 6. Click Deploy!
echo.
echo 📖 Full guide: See VERCEL_DEPLOYMENT.md
echo.
pause
