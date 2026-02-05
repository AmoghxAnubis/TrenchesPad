require("dotenv").config();
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("🚀 Deploying TrenchesPad locally...\n");

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

    // Test creating a campaign
    console.log("\n🧪 Testing campaign creation...");
    const tx = await factory.createCampaign(
        "Test Project Token",
        "TEST",
        hre.ethers.parseEther("10"), // 10 ETH goal
        7, // 7 days duration
        1000 // 1000 tokens per ETH
    );

    const receipt = await tx.wait();
    console.log("✅ Test campaign created!");

    const campaigns = await factory.getCampaigns();
    console.log("Campaign address:", campaigns[0]);

    // Get campaign details
    const Crowdsale = await hre.ethers.getContractFactory("Crowdsale");
    const campaign = await Crowdsale.attach(campaigns[0]);

    const status = await campaign.getStatus();
    console.log("\n📊 Campaign Status:");
    console.log("  Goal:", hre.ethers.formatEther(status[1]), "ETH");
    console.log("  Total Raised:", hre.ethers.formatEther(status[0]), "ETH");
    console.log("  Deadline:", new Date(Number(status[2]) * 1000).toLocaleString());

    // Save deployment info
    const deploymentInfo = {
        network: "localhost",
        deployer: deployer.address,
        timestamp: new Date().toISOString(),
        contracts: {
            LaunchpadFactory: factoryAddress,
            TestCampaign: campaigns[0]
        }
    };

    const deploymentsDir = path.join(__dirname, "..", "deployments");
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir);
    }

    const filename = `deployment-localhost-${Date.now()}.json`;
    const filepath = path.join(deploymentsDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));

    console.log("\n📄 Deployment info saved to:", filename);
    console.log("\n✨ Local deployment complete!");
    console.log("\n📋 Contract addresses saved for frontend integration");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
