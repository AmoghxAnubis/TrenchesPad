require("dotenv").config();

console.log("🔍 Environment Configuration Check\n");

// Check if .env file is loaded
if (!process.env.PRIVATE_KEY) {
    console.log("❌ PRIVATE_KEY not found in .env file");
    console.log("   Make sure you have a .env file with PRIVATE_KEY=your_key");
    process.exit(1);
}

// Check private key length
const privateKey = process.env.PRIVATE_KEY;
console.log("Private Key Length:", privateKey.length, "characters");

// Remove 0x prefix if present
const cleanKey = privateKey.startsWith("0x") ? privateKey.slice(2) : privateKey;
console.log("Clean Key Length (without 0x):", cleanKey.length, "characters");

if (cleanKey.length !== 64) {
    console.log("\n❌ ERROR: Private key must be exactly 64 characters (32 bytes)");
    console.log("   Current length:", cleanKey.length);
    console.log("   Missing:", 64 - cleanKey.length, "characters");
    console.log("\n💡 How to fix:");
    console.log("   1. Export your private key from MetaMask or Coinbase Wallet");
    console.log("   2. Remove the '0x' prefix if present");
    console.log("   3. Make sure it's exactly 64 hexadecimal characters");
    console.log("   4. Update PRIVATE_KEY in your .env file");
    process.exit(1);
}

// Check if it's valid hex
if (!/^[0-9a-fA-F]{64}$/.test(cleanKey)) {
    console.log("\n❌ ERROR: Private key contains invalid characters");
    console.log("   Must only contain: 0-9, a-f, A-F");
    process.exit(1);
}

console.log("✅ Private key format is valid!");

// Check RPC URL
if (process.env.BASE_SEPOLIA_RPC_URL) {
    console.log("✅ BASE_SEPOLIA_RPC_URL:", process.env.BASE_SEPOLIA_RPC_URL);
} else {
    console.log("⚠️  BASE_SEPOLIA_RPC_URL not set, will use default: https://sepolia.base.org");
}

// Check BaseScan API key
if (process.env.BASESCAN_API_KEY) {
    console.log("✅ BASESCAN_API_KEY is set");
} else {
    console.log("⚠️  BASESCAN_API_KEY not set (optional, needed for contract verification)");
}

console.log("\n✨ Environment configuration looks good!");
console.log("   You can now run: npm run deploy:sepolia");
