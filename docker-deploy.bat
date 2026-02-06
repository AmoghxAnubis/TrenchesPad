@echo off
REM Quick Docker deployment script for Windows

echo.
echo 🐳 TrenchesPad Docker Deployment
echo ================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    echo    Download: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose is not installed.
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are installed
echo.

REM Check for .env file
if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy .env.docker .env
    echo ⚠️  Please edit .env file with your configuration
    echo.
)

REM Menu
echo Select deployment mode:
echo 1) Production (port 3000)
echo 2) Development with hot-reload (port 3001)
echo 3) Full stack with Hardhat (ports 3001, 8545)
echo 4) Stop all containers
echo 5) View logs
echo.
set /p choice="Enter choice [1-5]: "

if "%choice%"=="1" (
    echo 🚀 Starting production build...
    docker-compose up -d --build frontend
    echo ✅ Production running at http://localhost:3000
) else if "%choice%"=="2" (
    echo 🔧 Starting development mode...
    docker-compose --profile dev up -d --build frontend-dev
    echo ✅ Development running at http://localhost:3001
) else if "%choice%"=="3" (
    echo 🔧 Starting full stack...
    docker-compose --profile dev up -d --build
    echo ✅ Frontend: http://localhost:3001
    echo ✅ Hardhat: http://localhost:8545
) else if "%choice%"=="4" (
    echo 🛑 Stopping all containers...
    docker-compose --profile dev down
    echo ✅ All containers stopped
) else if "%choice%"=="5" (
    echo 📋 Viewing logs (Ctrl+C to exit)...
    docker-compose logs -f
) else (
    echo ❌ Invalid choice
    pause
    exit /b 1
)

echo.
pause
