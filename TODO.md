# TrenchesPad - Project To-Do List
**Hackathon:** Vibe Coding (Base x DoraHacks)  
**Timeline:** 48 Hours  
**Status:** In Development

---

## 📋 Project Overview Checklist

### Phase 1: Smart Contract Development (Day 1 - Backend)

#### 1.1 Project Setup
- [ ] Initialize Thirdweb project
- [ ] Set up Hardhat development environment
- [ ] Configure Base Sepolia testnet in project
- [ ] Install OpenZeppelin v5.x contracts
- [ ] Set up `.env` file with wallet private key and RPC URL
- [ ] Fund wallet with Base Sepolia testnet ETH

#### 1.2 Smart Contract Development
- [ ] **Write `ProjectToken.sol` (ERC-20)**
  - [ ] Implement standard ERC-20 interface using OpenZeppelin
  - [ ] Add minting functionality (only callable by Crowdsale contract)
  - [ ] Set token name and symbol as constructor parameters
  - [ ] Add proper access control for minting

- [ ] **Write `Crowdsale.sol` (Campaign Logic)**
  - [ ] Implement constructor with parameters: goal, duration, token address
  - [ ] Create `buyTokens()` function to accept ETH and mint tokens
  - [ ] Add reentrancy protection using `nonReentrant` modifier
  - [ ] Implement `finalize()` function to check deadline and goal
  - [ ] Create `withdraw()` function for creator (only if goal met)
  - [ ] Create `refund()` function for backers (only if goal missed after deadline)
  - [ ] Add events for contributions, withdrawals, and refunds
  - [ ] Implement progress tracking (current amount raised)
  - [ ] Add getter functions for campaign status

- [ ] **Write `LaunchpadFactory.sol` (Factory Pattern)**
  - [ ] Implement `createCampaign()` function with parameters: name, symbol, goal, duration
  - [ ] Deploy new `ProjectToken` contract instance
  - [ ] Deploy new `Crowdsale` contract instance
  - [ ] Link token to crowdsale contract
  - [ ] Store campaign addresses in array/mapping
  - [ ] Emit event with new campaign details
  - [ ] Add getter function to retrieve all campaigns
  - [ ] Consider EIP-1167 Minimal Proxy pattern for gas optimization (optional for MVP)

#### 1.3 Testing & Deployment
- [ ] Write unit tests for `ProjectToken.sol`
- [ ] Write unit tests for `Crowdsale.sol` (goal met scenario)
- [ ] Write unit tests for `Crowdsale.sol` (goal missed/refund scenario)
- [ ] Write integration tests for `LaunchpadFactory.sol`
- [ ] Test edge cases (deadline, exact goal amount, multiple backers)
- [ ] Deploy contracts to Base Sepolia testnet
- [ ] Verify contracts on BaseScan
- [ ] Document contract addresses
- [ ] Test deployed contracts via Thirdweb dashboard

---

### Phase 2: Frontend Development (Day 2 - UI/UX)

#### 2.1 Project Scaffolding
- [ ] Initialize Next.js 14+ project with App Router
- [ ] Set up TypeScript configuration
- [ ] Install and configure Tailwind CSS v3.4
- [ ] Install Thirdweb SDK v5
- [ ] Install Framer Motion for animations
- [ ] Set up project structure (components, hooks, utils folders)

#### 2.2 Design System Implementation
- [ ] **Configure Tailwind Theme (Cyberpunk/Terminal Aesthetic)**
  - [ ] Add custom colors to `tailwind.config.js`:
    - [ ] Background: `slate-950` (#050505 to #0F172A)
    - [ ] Surface: `slate-900`
    - [ ] Trenches Green: `#00FF41` (primary accent)
    - [ ] Alert Orange: `#FF5F1F` (secondary accent)
    - [ ] Border: `green-900`
  - [ ] Configure typography:
    - [ ] Headers: Space Mono or Courier New (monospace)
    - [ ] Body: Inter or Roboto
  - [ ] Add custom box-shadow for neon glow effects
  - [ ] Set up scanline overlay CSS for CRT effect

- [ ] **Create Base Components**
  - [ ] Button component with glitch hover effect
  - [ ] Input component styled as terminal command line
  - [ ] Card component with sharp corners and neon borders
  - [ ] Progress bar component (segmented block loader)
  - [ ] Modal component for project details
  - [ ] Stats ticker component (scrolling horizontal)
  - [ ] Countdown timer component

#### 2.3 Web3 Integration
- [ ] Set up Thirdweb provider in root layout
- [ ] Configure Coinbase Smart Wallet and MetaMask support
- [ ] Create custom hooks:
  - [ ] `useFactory` - interact with LaunchpadFactory contract
  - [ ] `useCampaign` - interact with individual Crowdsale contracts
  - [ ] `useTokenBalance` - check user's project token balance
- [ ] Add wallet connection button component
- [ ] Implement contract ABI imports
- [ ] Add error handling for Web3 transactions

#### 2.4 Page Development

##### 2.4.1 Hero Section ("The Frontlines")
- [ ] Create hero layout (split screen or centered)
- [ ] Add headline: "FUND THE RESISTANCE" with glitch effect
- [ ] Add subtext: "The first Claude-native crowdfunding platform on Base"
- [ ] Create "START CAMPAIGN" button styled as terminal prompt
- [ ] Implement stats ticker showing:
  - [ ] Total ETH raised across platform
  - [ ] Number of active campaigns
  - [ ] Live Base ETH price (optional)
- [ ] Add CRT scanline overlay effect

##### 2.4.2 Campaign Dashboard ("The Frontlines Grid")
- [ ] Create 3-column responsive grid layout
- [ ] Fetch all campaigns from Factory contract
- [ ] **Campaign Card Component:**
  - [ ] Display grayscale project image (color on hover)
  - [ ] Show project name in monospace font
  - [ ] Display segmented progress bar (red to green gradient)
  - [ ] Show "Supplies" (ETH raised) in large bold numbers
  - [ ] Add countdown timer in red
  - [ ] Include "REINFORCE" (Invest) button
  - [ ] Implement neon green glow on hover
  - [ ] Add click handler to open detail modal
- [ ] Add loading states while fetching data
- [ ] Implement empty state if no campaigns exist

##### 2.4.3 Campaign Creation Page ("Dig a Trench")
- [ ] Create form layout with terminal aesthetic
- [ ] Add input fields:
  - [ ] Project Name
  - [ ] Token Symbol (ticker)
  - [ ] Funding Goal (in ETH)
  - [ ] Duration (in days or deadline picker)
  - [ ] Project Description (optional for MVP)
  - [ ] Project Image URL (optional for MVP)
- [ ] Connect form to `createCampaign()` function
- [ ] Add transaction status feedback (pending, success, error)
- [ ] Redirect to campaign page after successful creation
- [ ] Add wallet connection check before form submission

##### 2.4.4 Project Detail View (Modal or Dedicated Page)
- [ ] Create two-column layout:
  - [ ] **Left: "The Terminal"** (Project Description)
    - [ ] Display description with typewriter effect
    - [ ] Show project metadata (creator, creation date)
    - [ ] Add grayscale-to-color image transition
  - [ ] **Right: "Control Panel"** (Investment Interface)
    - [ ] ETH input field styled as command line
    - [ ] Display exchange rate (ETH → Tokens)
    - [ ] Show user's current token balance if already invested
    - [ ] "REINFORCE" button to execute investment
    - [ ] Display "Diamond Hands" badge for existing backers
    - [ ] Show campaign progress and deadline
- [ ] Add transaction confirmation modal
- [ ] Implement real-time updates after investment
- [ ] Add withdraw button for creator (if goal met)
- [ ] Add refund button for backers (if goal missed)

#### 2.5 Advanced UI Features
- [ ] **Live Activity Feed**
  - [ ] Create corner widget showing recent contributions
  - [ ] Display "Wallet 0x... just contributed X ETH" messages
  - [ ] Implement auto-scroll or fade-in/out animations
  - [ ] Connect to contract events (optional: use polling for MVP)

- [ ] **Gamification Elements**
  - [ ] "Diamond Hands" badge logic (track if user hasn't sold tokens)
  - [ ] Add badge to user profile/campaign cards
  - [ ] Create visual indicator (holographic sticker effect)

- [ ] **Responsive Design**
  - [ ] Test on mobile (stack columns vertically)
  - [ ] Ensure touch-friendly button sizes
  - [ ] Optimize grid for tablet view (2 columns)

#### 2.6 Polish & Optimization
- [ ] Add loading skeletons for async data
- [ ] Implement error boundaries for React components
- [ ] Add toast notifications for transactions
- [ ] Optimize images (use Next.js Image component)
- [ ] Test all user flows end-to-end
- [ ] Fix any console warnings/errors
- [ ] Add meta tags for SEO (title, description, OG image)
- [ ] Test wallet connection with both Coinbase and MetaMask

---

### Phase 3: Final Deliverables

#### 3.1 Documentation
- [ ] Update README.md with:
  - [ ] Project description
  - [ ] Installation instructions
  - [ ] How to run locally
  - [ ] Deployed contract addresses
  - [ ] Live demo link (if deployed)
- [ ] Document environment variables needed
- [ ] Add inline code comments for complex logic
- [ ] Create API documentation for smart contracts

#### 3.2 Demo & Submission
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Test live deployment with Base Sepolia
- [ ] Record demo video showing:
  - [ ] Creating a campaign
  - [ ] Investing in a campaign
  - [ ] Successful funding scenario
  - [ ] Refund scenario (optional)
  - [ ] UI/UX highlights (glitch effects, animations)
- [ ] Prepare pitch deck/slides (if required)
- [ ] Submit to DoraHacks platform
- [ ] Share on social media with #VibeCoding hashtag

#### 3.3 Testing Checklist
- [ ] **Smart Contract Tests:**
  - [ ] Campaign creation works
  - [ ] Token minting on investment works
  - [ ] Goal met → creator can withdraw
  - [ ] Goal missed → backers can refund
  - [ ] Deadline enforcement works
  - [ ] Reentrancy protection works
  
- [ ] **Frontend Tests:**
  - [ ] Wallet connects successfully
  - [ ] Campaign list loads correctly
  - [ ] Investment transaction completes
  - [ ] Progress bars update in real-time
  - [ ] Responsive design works on mobile
  - [ ] All animations render smoothly

---

## 🚀 Post-Hackathon Improvements (Future Roadmap)

### Advanced Features
- [ ] **Bonding Curves**
  - [ ] Research bonding curve models (linear, exponential, sigmoid)
  - [ ] Implement dynamic token pricing
  - [ ] Replace static exchange rate in Crowdsale contract

- [ ] **DAO Governance**
  - [ ] Integrate Snapshot API
  - [ ] Auto-create governance space for successful projects
  - [ ] Implement proposal and voting mechanisms

- [ ] **Reputation System**
  - [ ] Design on-chain scoring algorithm
  - [ ] Track creator success rate
  - [ ] Display reputation badges on creator profiles
  - [ ] Implement backer reputation (Diamond Hands score)

- [ ] **Additional Enhancements**
  - [ ] IPFS integration for decentralized metadata storage
  - [ ] Multi-chain support (Ethereum, Polygon, Arbitrum)
  - [ ] Social sharing features (Twitter, Farcaster)
  - [ ] Campaign categories and filtering
  - [ ] Search functionality
  - [ ] User profiles and portfolios
  - [ ] Email notifications for campaign milestones
  - [ ] Analytics dashboard for creators

---

## 🎯 Priority Matrix

### Critical (Must Have for Hackathon)
1. Factory contract deployment
2. Campaign creation flow
3. Investment functionality
4. Basic UI with cyberpunk theme
5. Wallet connection
6. Demo video

### Important (Should Have)
1. Progress bars and timers
2. Refund mechanism
3. Campaign detail modal
4. Responsive design
5. Live activity feed

### Nice to Have (Could Have)
1. Typewriter effects
2. Glitch animations
3. Diamond Hands badges
4. CRT scanline overlay
5. Advanced hover effects

---

## 📝 Notes & Considerations

### Security Reminders
- Always use `nonReentrant` for functions handling ETH
- Validate all user inputs
- Use SafeMath (built into Solidity 0.8+)
- Test deadline and goal edge cases
- Ensure proper access control

### Gas Optimization Tips
- Consider EIP-1167 for factory pattern
- Batch operations where possible
- Use events instead of storage for historical data
- Minimize storage writes

### UX Best Practices
- Show clear transaction status (pending, confirmed, failed)
- Display gas estimates before transactions
- Provide helpful error messages
- Add loading states for all async operations
- Make wallet connection prominent and easy

---

**Last Updated:** [Current Date]  
**Team:** [Your Team Name]  
**Status:** Ready to Build 🚀
