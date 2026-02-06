#!/bin/bash
# Quick Docker deployment script

echo "🐳 TrenchesPad Docker Deployment"
echo "================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop first."
    echo "   Download: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Check for .env file
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.docker .env
    echo "⚠️  Please edit .env file with your configuration"
    echo ""
fi

# Menu
echo "Select deployment mode:"
echo "1) Production (port 3000)"
echo "2) Development with hot-reload (port 3001)"
echo "3) Full stack with Hardhat (ports 3001, 8545)"
echo "4) Stop all containers"
echo "5) View logs"
echo ""
read -p "Enter choice [1-5]: " choice

case $choice in
    1)
        echo "🚀 Starting production build..."
        docker-compose up -d --build frontend
        echo "✅ Production running at http://localhost:3000"
        ;;
    2)
        echo "🔧 Starting development mode..."
        docker-compose --profile dev up -d --build frontend-dev
        echo "✅ Development running at http://localhost:3001"
        ;;
    3)
        echo "🔧 Starting full stack..."
        docker-compose --profile dev up -d --build
        echo "✅ Frontend: http://localhost:3001"
        echo "✅ Hardhat: http://localhost:8545"
        ;;
    4)
        echo "🛑 Stopping all containers..."
        docker-compose --profile dev down
        echo "✅ All containers stopped"
        ;;
    5)
        echo "📋 Viewing logs (Ctrl+C to exit)..."
        docker-compose logs -f
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac
