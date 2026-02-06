# Environment Variables for Vercel Deployment

## Required Variables

Copy these to your Vercel project settings:

### Smart Contract Addresses
```
NEXT_PUBLIC_FACTORY_ADDRESS=your_deployed_factory_address_here
```

### RPC Configuration
```
NEXT_PUBLIC_BASE_SEPOLIA_RPC=https://sepolia.base.org
NEXT_PUBLIC_CHAIN_ID=84532
```

### Explorer
```
NEXT_PUBLIC_EXPLORER_URL=https://sepolia.basescan.org
```

## How to Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value
4. Select the appropriate environments (Production, Preview, Development)
5. Click **Save**

## Important Notes

- All variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Never commit actual values to git
- Update these values after deploying your smart contracts
- For production, use mainnet addresses and RPC URLs
