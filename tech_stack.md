Technical Stack Documentation: TrenchesPad1. High-Level ArchitectureTrenchesPad is a decentralized application (dApp) built on the Base blockchain. It utilizes a Factory Pattern architecture to enable permissionless campaign creation. The frontend interacts directly with smart contracts via RPC, ensuring a serverless, decentralized user experience.Code snippetgraph TD
    User[User / Backer] -->|Connects Wallet| FE[Next.js Frontend]
    Creator[Project Creator] -->|Connects Wallet| FE

    subgraph "Base Sepolia Blockchain"
        FE -->|Read/Write| Factory[LaunchpadFactory Contract]
        Factory -->|Deploys| Campaign[Crowdsale Contract]
        Factory -->|Deploys| Token[Project Token (ERC-20)]
        Campaign -->|Mints| Token
        User -->|Contributes ETH| Campaign
    end

    subgraph "Infrastructure"
        RPC[Base RPC Node]
        IPFS[IPFS Storage]
    end

    FE -.-> RPC
    FE -.->|Metadata| IPFS
2. Frontend Layer ( The "Console")We chose a "lightweight & fast" stack optimized for the 48-hour hackathon timeline.ComponentTechnologyVersionJustificationFrameworkNext.js14+ (App Router)React-based framework for server-side rendering and rapid routing. Essential for high-performance dApps.LanguageTypeScript5.xEnsures type safety when interacting with blockchain data structures (BigInt, Addresses).StylingTailwind CSS3.4Utility-first CSS allows for the rapid creation of our custom "Cyberpunk/Terminal" design system without writing boilerplate CSS.Web3 SDKThirdweb SDKv5Provides pre-built React hooks (useReadContract, useActiveAccount) that eliminate 90% of the boilerplate code required for wallet connections.MotionFramer MotionLatestUsed for the "glitch" effects and smooth layout transitions (e.g., progress bars filling up).3. Smart Contract Layer (The "Engine")The backend logic is immutable and runs entirely on the Base Sepolia testnet.ComponentTechnologyJustificationLanguageSolidity^0.8.20FrameworkHardhat(via Thirdweb)Base ContractsOpenZeppelin5.xNetworkBase SepoliaChain ID: 84532Contract InterfacesLaunchpadFactory.sol: The entry point. It creates clones of the base contracts to save gas (EIP-1167 Minimal Proxy Factory pattern is recommended for scalability, though simple deployment is used for MVP).Crowdsale.sol: Implements the logic:buyTokens(): msg.value (ETH) -> transfer (Tokens).finalize(): Checks block.timestamp > deadline.4. Development & "Vibe" ToolingThis project embraces the "AI-Augmented" development workflow.IDE: Cursor (VS Code Fork) with Claude 3.5 Sonnet.Role: Used for generating boilerplate code, analyzing security flaws, and writing documentation.Agentic Framework: Google Antigravity (Experimental).Role: "Product Manager" agent used to run terminal commands, verify deployments, and visual QA testing.Deployment Pipeline: Thirdweb Dashboard.Role: We use Thirdweb's dashboard to verify contracts and manage admin functions without writing custom scripts.5. Security & Data IntegrityReentrancy Protection: All functions handling ETH withdrawals use the nonReentrant modifier.Math Safety: Solidity 0.8+ handles overflow/underflow automatically.Trustlessness: The platform is non-custodial. The LaunchpadFactory does not hold funds; funds move directly between the Backer and the Crowdsale contract.6. How to Run LocallyPrerequisitesNode.js v18+A "Base Sepolia" funded wallet (Coinbase Wallet or Metamask)InstallationBash# 1. Clone the repository
git clone https://github.com/your-username/trenches-pad.git

# 2. Install dependencies
npm install

# 3. Set environment variables
# Create a .env.local file and add your Thirdweb Client ID
echo "NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_id_here" > .env.local

# 4. Run the development server
npm run dev
Deploying ContractsBash# From the root directory
npx thirdweb deploy
# Follow the link to the dashboard to deploy to Base Sepolia