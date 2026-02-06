# Deploy to Vercel - Quick Start

echo "🚀 TrenchesPad - Vercel Deployment"
echo "=================================="
echo ""

# Check if in correct directory
if [ ! -d "frontend" ]; then
    echo "❌ Error: Run this script from the TrenchesPad root directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - TrenchesPad"
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "📝 Committing latest changes..."
    git add .
    git commit -m "Prepare for Vercel deployment"
fi

echo ""
echo "✅ Repository ready for deployment"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Go to https://vercel.com/new"
echo "3. Import your TrenchesPad repository"
echo "4. Set Root Directory to: frontend"
echo "5. Add environment variables (see VERCEL_ENV.md)"
echo "6. Click Deploy!"
echo ""
echo "📖 Full guide: See VERCEL_DEPLOYMENT.md"
