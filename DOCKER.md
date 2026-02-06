# TrenchesPad - Docker Deployment Guide

Complete guide for running TrenchesPad with Docker and Docker Compose.

---

## 📦 What's Included

- **Production Dockerfile**: Multi-stage optimized build (~150MB)
- **Development Dockerfile**: Hot-reload enabled for local development
- **Docker Compose**: Orchestrates frontend + Hardhat node
- **Environment Configuration**: Easy environment variable management

---

## 🚀 Quick Start

### Prerequisites

- Docker Desktop installed ([download here](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)

### 1. Production Deployment

Run the production-optimized frontend:

```bash
# Build and start
docker-compose up -d frontend

# View logs
docker-compose logs -f frontend

# Access at http://localhost:3000
```

### 2. Development Mode

Run with hot-reload for development:

```bash
# Start development environment
docker-compose --profile dev up -d frontend-dev

# Access at http://localhost:3001
```

### 3. Full Stack (Frontend + Hardhat)

Run frontend with local blockchain:

```bash
# Start everything
docker-compose --profile dev up -d

# Services:
# - Frontend Dev: http://localhost:3001
# - Hardhat Node: http://localhost:8545
```

---

## 📋 Available Commands

### Production

```bash
# Build production image
docker-compose build frontend

# Start production
docker-compose up -d frontend

# Stop production
docker-compose down

# View logs
docker-compose logs -f frontend

# Rebuild and restart
docker-compose up -d --build frontend
```

### Development

```bash
# Start dev environment
docker-compose --profile dev up -d

# Stop dev environment
docker-compose --profile dev down

# Rebuild dev image
docker-compose --profile dev up -d --build frontend-dev

# View dev logs
docker-compose --profile dev logs -f frontend-dev
```

### Hardhat Node

```bash
# Start only Hardhat node
docker-compose --profile dev up -d hardhat

# View Hardhat logs
docker-compose logs -f hardhat

# Stop Hardhat
docker-compose stop hardhat
```

---

## 🔧 Configuration

### Environment Variables

1. **Copy the template**:
   ```bash
   cp .env.docker .env
   ```

2. **Edit `.env`** with your values:
   ```env
   NEXT_PUBLIC_FACTORY_ADDRESS=0xYourFactoryAddress
   NEXT_PUBLIC_BASE_SEPOLIA_RPC=https://sepolia.base.org
   NEXT_PUBLIC_CHAIN_ID=84532
   NEXT_PUBLIC_EXPLORER_URL=https://sepolia.basescan.org
   ```

3. **Restart containers**:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### Using Local Hardhat Node

To connect frontend to local Hardhat:

```env
NEXT_PUBLIC_BASE_SEPOLIA_RPC=http://localhost:8545
NEXT_PUBLIC_CHAIN_ID=31337
```

---

## 🏗️ Building Images

### Build Production Image

```bash
# Build from root directory
docker build -t trenchespad-frontend:latest -f Dockerfile .

# Run the image
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_FACTORY_ADDRESS=0x... \
  trenchespad-frontend:latest
```

### Build Development Image

```bash
# Build dev image
docker build -t trenchespad-frontend:dev -f Dockerfile.dev .

# Run with volume mounting
docker run -p 3000:3000 \
  -v $(pwd)/frontend:/app \
  -v /app/node_modules \
  trenchespad-frontend:dev
```

---

## 📊 Image Sizes

- **Production Image**: ~150MB (multi-stage build)
- **Development Image**: ~450MB (includes dev dependencies)
- **Node Base Image**: ~120MB (Alpine Linux)

---

## 🔍 Troubleshooting

### Container Won't Start

**Check logs**:
```bash
docker-compose logs frontend
```

**Common issues**:
- Port 3000 already in use → Change port in `docker-compose.yml`
- Build failed → Run `docker-compose build --no-cache`
- Environment variables not loading → Check `.env` file exists

### Hot Reload Not Working

**Solution**:
```bash
# Ensure volumes are mounted correctly
docker-compose --profile dev down
docker-compose --profile dev up -d --build frontend-dev
```

### Can't Connect to Hardhat Node

**Check Hardhat is running**:
```bash
docker-compose logs hardhat
```

**Verify network**:
```bash
docker network inspect trenchespad_trenchespad-network
```

### Permission Issues (Linux/Mac)

**Fix file permissions**:
```bash
sudo chown -R $USER:$USER frontend/node_modules
sudo chown -R $USER:$USER frontend/.next
```

---

## 🚢 Deployment to Cloud

### Deploy to AWS ECS

1. **Push image to ECR**:
   ```bash
   # Login to ECR
   aws ecr get-login-password --region us-east-1 | \
     docker login --username AWS --password-stdin YOUR_ECR_URL
   
   # Tag image
   docker tag trenchespad-frontend:latest YOUR_ECR_URL/trenchespad:latest
   
   # Push
   docker push YOUR_ECR_URL/trenchespad:latest
   ```

2. **Create ECS Task Definition** with environment variables

3. **Deploy to ECS Service**

### Deploy to Google Cloud Run

```bash
# Build for Cloud Run
gcloud builds submit --tag gcr.io/YOUR_PROJECT/trenchespad

# Deploy
gcloud run deploy trenchespad \
  --image gcr.io/YOUR_PROJECT/trenchespad \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NEXT_PUBLIC_FACTORY_ADDRESS=0x...
```

### Deploy to DigitalOcean App Platform

1. Connect your GitHub repository
2. Select `Dockerfile` as build method
3. Set environment variables in dashboard
4. Deploy

---

## 🔐 Security Best Practices

### Production

- ✅ Use multi-stage builds (already configured)
- ✅ Run as non-root user (already configured)
- ✅ Use Alpine Linux base (smaller attack surface)
- ✅ Don't include `.env` in image
- ✅ Use secrets management for sensitive data

### Environment Variables

```bash
# Use Docker secrets (Swarm/Kubernetes)
docker secret create factory_address ./factory_address.txt

# Or use external secrets manager
# - AWS Secrets Manager
# - HashiCorp Vault
# - Google Secret Manager
```

---

## 📈 Performance Optimization

### Production Build

The Dockerfile uses:
- **Multi-stage build**: Reduces final image size
- **Standalone output**: Only includes necessary files
- **Layer caching**: Faster rebuilds
- **Alpine Linux**: Minimal base image

### Resource Limits

Add to `docker-compose.yml`:

```yaml
services:
  frontend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

---

## 🧪 Testing

### Test Production Build Locally

```bash
# Build
docker-compose build frontend

# Run
docker-compose up frontend

# Test
curl http://localhost:3000
```

### Test with Different Networks

```bash
# Base Sepolia
docker-compose up -d frontend

# Local Hardhat
docker-compose --profile dev up -d
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)

---

## 🎯 Common Use Cases

### Local Development

```bash
docker-compose --profile dev up -d
```

### CI/CD Testing

```bash
docker-compose build frontend
docker-compose run frontend npm test
```

### Production Deployment

```bash
docker-compose up -d frontend
```

### Staging Environment

```bash
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d
```

---

**🐳 Your TrenchesPad is now containerized!**

Start with: `docker-compose up -d frontend`
