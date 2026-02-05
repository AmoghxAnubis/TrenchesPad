require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
    console.log("🔍 Wallet Information\n");

    const [deployer] = await ethers.getSigners();
    console.log("Address derived from your PRIVATE_KEY:");
    console.log(deployer.address);
    console.log("\n📋 Copy this address and verify it matches your wallet with testnet ETH");
    console.log("\nChecking balance on Base Sepolia...");

    try {
        const balance = await ethers.provider.getBalance(deployer.address);
        console.log("Balance:", ethers.formatEther(balance), "ETH");

        if (balance > 0n) {
            console.log("\n✅ This wallet has ETH! Ready to deploy.");
        } else {
            console.log("\n❌ This wallet has 0 ETH.");
            console.log("\n💡 If you have ETH in a different wallet:");
            console.log("   1. Export the private key from that wallet");
            console.log("   2. Update PRIVATE_KEY in your .env file");
            console.log("   3. Run this script again to verify");
        }
    } catch (error) {
        console.log("\n❌ Error checking balance:", error.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
