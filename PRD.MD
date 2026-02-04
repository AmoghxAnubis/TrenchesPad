# Product Requirements Document (PRD): TrenchesPad
**Hackathon:** Vibe Coding (Base x DoraHacks)
**Team:** [Your Team Name]
**Status:** In Development

## 1. Executive Summary
**TrenchesPad** is a "Claude-native" tokenized crowdfunding platform built on the Base blockchain. It allows creators to launch projects instantly by deploying a campaign that automatically issues a project token to backers. It replaces complex fundraising rounds with "The Trenches"—a gamified, high-velocity funding environment.

## 2. Core Features (MVP)
### A. The "Factory" (Smart Contract)
* **Campaign Creation:** A factory contract that allows any user to deploy a new fundraising campaign.
* **Parameters:** Creators define:
    * `Name` & `Symbol` (e.g., "Vibe Token", $VIBE)
    * `Goal` (in ETH)
    * `Duration` (Deadline)

### B. The "Campaign" (Smart Contract)
* **Token Issuance:** Automatically mints ERC-20 tokens to backers when they contribute ETH.
* **Protection Logic:**
    * **Goal Met:** Creator can withdraw the funds.
    * **Goal Missed:** Backers can claim a 100% ETH refund after the deadline.

### C. The "Frontlines" (Frontend)
* **Dashboard:** View all active campaigns in a grid.
* **Invest:** Simple interface to contribute ETH and see real-time progress bars.
* **Gamification:** "Diamond Hands" badge for holders who don't sell (UI-level tracking).

---

## 3. Technical Stack
* **Blockchain:** Base Sepolia Testnet
* **Smart Contracts:** Solidity (OpenZeppelin standards)
* **Deployment:** Thirdweb / Hardhat
* **Frontend:** Next.js, Tailwind CSS (Cyberpunk/Terminal theme)
* **Wallet:** Coinbase Smart Wallet / MetaMask

---

## 4. User Flow
1.  **Creator** connects wallet.
2.  **Creator** fills out the "Dig a Trench" form (Name, Ticker, Goal).
3.  **System** deploys `Crowdsale.sol` and `ProjectToken.sol`.
4.  **Backer** browses the "Frontlines" and finds a project.
5.  **Backer** inputs ETH amount and clicks "Reinforce" (Invest).
6.  **Backer** immediately receives project tokens in their wallet.

---

## 5. Development Roadmap (48 Hours)

### Day 1: The Engine (Backend)
* [ ] Initialize Thirdweb Project.
* [ ] Write `ProjectToken.sol` (ERC20).
* [ ] Write `Crowdsale.sol` (Logic for funds/refunds).
* [ ] Write `LaunchpadFactory.sol` (Deploys the above).
* [ ] Deploy to Base Sepolia & Verify.

### Day 2: The Interface (Frontend)
* [ ] Scaffold Next.js app with Tailwind.
* [ ] Connect "Launch" button to Factory contract.
* [ ] Connect "Invest" button to Campaign contracts.
* [ ] Add "Vibe" styling (Dark mode, Neon Green).
* [ ] Record Demo Video.

---

## 6. Future Improvements (Post-Hackathon)
* **Bonding Curves:** Implement dynamic pricing instead of static exchange rates.
* **DAO Governance:** Automatically create a Snapshot space for successful projects.
* **Reputation System:** On-chain scoring for successful campaign creators.