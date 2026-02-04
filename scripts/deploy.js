const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("🚀 Deploying TrenchesPad to Base Sepolia...\n");

    // Get deployer account
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance), "ETH\n");

    // Deploy LaunchpadFactory
    console.log("Deploying LaunchpadFactory...");
    const LaunchpadFactory = await hre.ethers.getContractFactory("LaunchpadFactory");
    const factory = await LaunchpadFactory.deploy();
    await factory.waitForDeployment();

    const factoryAddress = await factory.getAddress();
    console.log("✅ LaunchpadFactory deployed to:", factoryAddress);

    // Save deployment info
    const deploymentInfo = {
        network: hre.network.name,
        chainId: (await hre.ethers.provider.getNetwork()).chainId.toString(),
        deployer: deployer.address,
        timestamp: new Date().toISOString(),
        contracts: {
            LaunchpadFactory: factoryAddress
        }
    };

    const deploymentsDir = path.join(__dirname, "..", "deployments");
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir);
    }

    const filename = `deployment-${hre.network.name}-${Date.now()}.json`;
    const filepath = path.join(deploymentsDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));

    console.log("\n📄 Deployment info saved to:", filename);

    // Verification instructions
    console.log("\n🔍 To verify the contract on BaseScan, run:");
    console.log(`npx hardhat verify --network baseSepolia ${factoryAddress}`);

    console.log("\n✨ Deployment complete!");
    console.log("\n📋 Next steps:");
    console.log("1. Verify the contract on BaseScan");
    console.log("2. Test creating a campaign via Hardhat console");
    console.log("3. Update frontend with the factory address");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
