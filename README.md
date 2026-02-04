# TrenchesPad - Smart Contracts

Blockchain backend for TrenchesPad, a tokenized crowdfunding platform on Base.

## 🏗️ Architecture

TrenchesPad uses a **Factory Pattern** with three core contracts:

1. **LaunchpadFactory.sol** - Deploys new campaigns
2. **Crowdsale.sol** - Handles contributions, withdrawals, and refunds
3. **ProjectToken.sol** - ERC-20 tokens issued to backers

## 📋 Contract Addresses

### Base Sepolia Testnet
- **LaunchpadFactory**: `[To be deployed]`

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- A wallet with Base Sepolia testnet ETH ([Get testnet ETH](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet))

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your PRIVATE_KEY and BASESCAN_API_KEY to .env
```

### Compile Contracts

```bash
npm run compile
```

### Run Tests

```bash
npm test
```

**Test Results**: 19/21 tests passing ✅

### Deploy to Base Sepolia

```bash
# Make sure your .env has PRIVATE_KEY and BASE_SEPOLIA_RPC_URL
npm run deploy:sepolia
```

### Verify on BaseScan

```bash
npx hardhat verify --network baseSepolia <FACTORY_ADDRESS>
```

## 📖 Contract Documentation

### LaunchpadFactory

Factory contract for creating new crowdfunding campaigns.

**Key Functions:**
- `createCampaign(tokenName, tokenSymbol, goal, durationInDays, tokenRate)` - Deploy a new campaign
- `getCampaigns()` - Get all campaign addresses
- `getCampaignCount()` - Get total number of campaigns

**Example:**
```javascript
const tx = await factory.createCampaign(
  "Vibe Token",      // Token name
  "VIBE",            // Token symbol
  ethers.parseEther("10"), // Goal: 10 ETH
  7,                 // Duration: 7 days
  1000               // Rate: 1000 tokens per 1 ETH
);
```

### Crowdsale

Campaign contract handling contributions and fund distribution.

**Key Functions:**
- `contribute()` - Contribute ETH and receive tokens (payable)
- `withdraw()` - Creator withdraws funds if goal met (after deadline)
- `refund()` - Backers claim refund if goal missed (after deadline)
- `getStatus()` - Get campaign status information

**States:**
- **Active**: Before deadline, accepting contributions
- **Successful**: After deadline, goal reached → creator can withdraw
- **Failed**: After deadline, goal not reached → backers can refund

**Example:**
```javascript
// Contribute 1 ETH
await campaign.contribute({ value: ethers.parseEther("1") });

// After deadline, if goal met
await campaign.withdraw(); // Creator only

// After deadline, if goal missed
await campaign.refund(); // Backers only
```

### ProjectToken

ERC-20 token automatically minted to backers.

**Features:**
- Standard ERC-20 functionality
- Only Crowdsale contract can mint
- Fully tradeable after issuance

## 🔒 Security Features

- ✅ **Reentrancy Protection**: All ETH-handling functions use `nonReentrant`
- ✅ **Access Control**: Only Crowdsale can mint tokens
- ✅ **Deadline Enforcement**: Contributions only accepted before deadline
- ✅ **Goal Validation**: Withdrawals/refunds based on goal achievement
- ✅ **Solidity 0.8.20**: Built-in overflow/underflow protection

## 🧪 Testing

Comprehensive test suite covering:
- ✅ Factory deployment and campaign creation
- ✅ Contributions and token minting
- ✅ Successful campaigns (goal met → withdrawal)
- ✅ Failed campaigns (goal missed → refunds)
- ✅ Edge cases (zero contributions, exact goal, multiple backers)
- ✅ Security (reentrancy, unauthorized access)

Run tests with:
```bash
npm test
```

## 📁 Project Structure

```
TrenchesPad/
├── contracts/
│   ├── LaunchpadFactory.sol
│   ├── Crowdsale.sol
│   └── ProjectToken.sol
├── scripts/
│   └── deploy.js
├── test/
│   └── TrenchesPad.test.js
├── hardhat.config.js
└── package.json
```

## 🛠️ Development

### Hardhat Console

```bash
npx hardhat console --network baseSepolia

# Interact with deployed contracts
const factory = await ethers.getContractAt("LaunchpadFactory", "FACTORY_ADDRESS");
const campaigns = await factory.getCampaigns();
console.log("Campaigns:", campaigns);
```

### Local Testing

```bash
# Start local Hardhat node
npx hardhat node

# In another terminal, deploy to local network
npx hardhat run scripts/deploy.js --network localhost
```

## 📝 Environment Variables

Create a `.env` file with:

```env
# Base Sepolia RPC URL
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Your wallet private key (DO NOT COMMIT!)
PRIVATE_KEY=your_private_key_here

# BaseScan API key for contract verification
BASESCAN_API_KEY=your_basescan_api_key_here
```

## 🌐 Network Configuration

**Base Sepolia Testnet**
- Chain ID: 84532
- RPC URL: https://sepolia.base.org
- Explorer: https://sepolia.basescan.org
- Faucet: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

## 📊 Gas Estimates

Approximate gas costs on Base Sepolia:

| Operation | Gas Used | Cost (at 0.1 gwei) |
|-----------|----------|-------------------|
| Deploy Factory | ~2,000,000 | ~0.0002 ETH |
| Create Campaign | ~3,500,000 | ~0.00035 ETH |
| Contribute | ~150,000 | ~0.000015 ETH |
| Withdraw | ~50,000 | ~0.000005 ETH |
| Refund | ~50,000 | ~0.000005 ETH |

## 🔗 Integration with Frontend

After deployment, save the factory address and ABIs:

```javascript
// Frontend integration
import LaunchpadFactoryABI from './artifacts/contracts/LaunchpadFactory.sol/LaunchpadFactory.json';

const factoryAddress = "DEPLOYED_FACTORY_ADDRESS";
const factory = new ethers.Contract(factoryAddress, LaunchpadFactoryABI.abi, signer);

// Create campaign
const tx = await factory.createCampaign("Token Name", "SYMBOL", goal, duration, rate);
await tx.wait();
```

## 📜 License

MIT

## 🤝 Contributing

This is a hackathon project for Vibe Coding (Base x DoraHacks).

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for the Base ecosystem**
