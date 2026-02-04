const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("TrenchesPad", function () {
    let factory;
    let owner, creator, backer1, backer2, backer3;

    const GOAL = ethers.parseEther("10"); // 10 ETH goal
    const DURATION_DAYS = 7;
    const TOKEN_RATE = 1000; // 1000 tokens per 1 ETH
    const TOKEN_NAME = "Test Project Token";
    const TOKEN_SYMBOL = "TEST";

    beforeEach(async function () {
        [owner, creator, backer1, backer2, backer3] = await ethers.getSigners();

        // Deploy Factory
        const LaunchpadFactory = await ethers.getContractFactory("LaunchpadFactory");
        factory = await LaunchpadFactory.deploy();
    });

    describe("LaunchpadFactory", function () {
        it("Should deploy successfully", async function () {
            expect(await factory.getAddress()).to.be.properAddress;
        });

        it("Should create a new campaign", async function () {
            const tx = await factory.connect(creator).createCampaign(
                TOKEN_NAME,
                TOKEN_SYMBOL,
                GOAL,
                DURATION_DAYS,
                TOKEN_RATE
            );

            const receipt = await tx.wait();
            const event = receipt.logs.find(log => {
                try {
                    return factory.interface.parseLog(log).name === "CampaignCreated";
                } catch (e) {
                    return false;
                }
            });

            expect(event).to.not.be.undefined;

            const campaigns = await factory.getCampaigns();
            expect(campaigns.length).to.equal(1);
            expect(await factory.getCampaignCount()).to.equal(1);
        });

        it("Should track multiple campaigns", async function () {
            await factory.connect(creator).createCampaign(TOKEN_NAME, TOKEN_SYMBOL, GOAL, DURATION_DAYS, TOKEN_RATE);
            await factory.connect(backer1).createCampaign("Token 2", "TK2", GOAL, DURATION_DAYS, TOKEN_RATE);

            const campaigns = await factory.getCampaigns();
            expect(campaigns.length).to.equal(2);
            expect(await factory.isCampaign(campaigns[0])).to.be.true;
            expect(await factory.isCampaign(campaigns[1])).to.be.true;
        });

        it("Should revert with invalid parameters", async function () {
            await expect(
                factory.createCampaign("", TOKEN_SYMBOL, GOAL, DURATION_DAYS, TOKEN_RATE)
            ).to.be.revertedWith("Token name required");

            await expect(
                factory.createCampaign(TOKEN_NAME, "", GOAL, DURATION_DAYS, TOKEN_RATE)
            ).to.be.revertedWith("Token symbol required");

            await expect(
                factory.createCampaign(TOKEN_NAME, TOKEN_SYMBOL, 0, DURATION_DAYS, TOKEN_RATE)
            ).to.be.revertedWith("Goal must be greater than 0");

            await expect(
                factory.createCampaign(TOKEN_NAME, TOKEN_SYMBOL, GOAL, 0, TOKEN_RATE)
            ).to.be.revertedWith("Duration must be greater than 0");
        });
    });

    describe("Crowdsale - Successful Campaign", function () {
        let campaign, token;
        let campaignAddress, tokenAddress;

        beforeEach(async function () {
            const tx = await factory.connect(creator).createCampaign(
                TOKEN_NAME,
                TOKEN_SYMBOL,
                GOAL,
                DURATION_DAYS,
                TOKEN_RATE
            );

            const receipt = await tx.wait();
            const event = receipt.logs.find(log => {
                try {
                    const parsed = factory.interface.parseLog(log);
                    return parsed.name === "CampaignCreated";
                } catch (e) {
                    return false;
                }
            });

            const parsedEvent = factory.interface.parseLog(event);
            campaignAddress = parsedEvent.args.campaignAddress;
            tokenAddress = parsedEvent.args.tokenAddress;

            campaign = await ethers.getContractAt("Crowdsale", campaignAddress);
            token = await ethers.getContractAt("ProjectToken", tokenAddress);
        });

        it("Should have correct initial state", async function () {
            expect(await campaign.creator()).to.equal(creator.address);
            expect(await campaign.goal()).to.equal(GOAL);
            expect(await campaign.tokenRate()).to.equal(TOKEN_RATE);
            expect(await campaign.totalRaised()).to.equal(0);
            expect(await campaign.finalized()).to.be.false;
        });

        it("Should accept contributions and mint tokens", async function () {
            const contributionAmount = ethers.parseEther("1");

            await campaign.connect(backer1).contribute({ value: contributionAmount });

            expect(await campaign.totalRaised()).to.equal(contributionAmount);
            expect(await campaign.contributions(backer1.address)).to.equal(contributionAmount);

            // Check tokens minted (1 ETH * 1000 tokens/ETH = 1000 tokens)
            const expectedTokens = ethers.parseEther("1000");
            expect(await token.balanceOf(backer1.address)).to.equal(expectedTokens);
        });

        it("Should track multiple contributions", async function () {
            await campaign.connect(backer1).contribute({ value: ethers.parseEther("3") });
            await campaign.connect(backer2).contribute({ value: ethers.parseEther("4") });
            await campaign.connect(backer3).contribute({ value: ethers.parseEther("5") });

            expect(await campaign.totalRaised()).to.equal(ethers.parseEther("12"));
            expect(await campaign.isGoalReached()).to.be.true;
        });

        it("Should allow creator to withdraw when goal is met", async function () {
            // Contribute enough to meet goal
            await campaign.connect(backer1).contribute({ value: ethers.parseEther("6") });
            await campaign.connect(backer2).contribute({ value: ethers.parseEther("5") });

            // Fast forward past deadline
            await time.increase(DURATION_DAYS * 24 * 60 * 60 + 1);

            const creatorBalanceBefore = await ethers.provider.getBalance(creator.address);
            const tx = await campaign.connect(creator).withdraw();
            const receipt = await tx.wait();
            const gasUsed = receipt.gasUsed * receipt.gasPrice;

            const creatorBalanceAfter = await ethers.provider.getBalance(creator.address);

            expect(creatorBalanceAfter).to.be.closeTo(
                creatorBalanceBefore + ethers.parseEther("11") - gasUsed,
                ethers.parseEther("0.001") // Allow small variance for gas
            );

            expect(await campaign.finalized()).to.be.true;
        });

        it("Should not allow withdrawal before deadline", async function () {
            await campaign.connect(backer1).contribute({ value: GOAL });

            await expect(
                campaign.connect(creator).withdraw()
            ).to.be.revertedWith("Campaign still active");
        });

        it("Should not allow non-creator to withdraw", async function () {
            await campaign.connect(backer1).contribute({ value: GOAL });
            await time.increase(DURATION_DAYS * 24 * 60 * 60 + 1);

            await expect(
                campaign.connect(backer1).withdraw()
            ).to.be.revertedWith("Only creator can withdraw");
        });

        it("Should not allow contribution after deadline", async function () {
            await time.increase(DURATION_DAYS * 24 * 60 * 60 + 1);

            await expect(
                campaign.connect(backer1).contribute({ value: ethers.parseEther("1") })
            ).to.be.revertedWith("Campaign has ended");
        });
    });

    describe("Crowdsale - Failed Campaign (Refunds)", function () {
        let campaign, token;
        let campaignAddress, tokenAddress;

        beforeEach(async function () {
            const tx = await factory.connect(creator).createCampaign(
                TOKEN_NAME,
                TOKEN_SYMBOL,
                GOAL,
                DURATION_DAYS,
                TOKEN_RATE
            );

            const receipt = await tx.wait();
            const event = receipt.logs.find(log => {
                try {
                    const parsed = factory.interface.parseLog(log);
                    return parsed.name === "CampaignCreated";
                } catch (e) {
                    return false;
                }
            });

            const parsedEvent = factory.interface.parseLog(event);
            campaignAddress = parsedEvent.args.campaignAddress;
            tokenAddress = parsedEvent.args.tokenAddress;

            campaign = await ethers.getContractAt("Crowdsale", campaignAddress);
            token = await ethers.getContractAt("ProjectToken", tokenAddress);
        });

        it("Should allow refunds when goal not met", async function () {
            const contributionAmount = ethers.parseEther("3");
            await campaign.connect(backer1).contribute({ value: contributionAmount });

            // Fast forward past deadline
            await time.increase(DURATION_DAYS * 24 * 60 * 60 + 1);

            expect(await campaign.isGoalReached()).to.be.false;

            const balanceBefore = await ethers.provider.getBalance(backer1.address);
            const tx = await campaign.connect(backer1).refund();
            const receipt = await tx.wait();
            const gasUsed = receipt.gasUsed * receipt.gasPrice;

            const balanceAfter = await ethers.provider.getBalance(backer1.address);

            expect(balanceAfter).to.be.closeTo(
                balanceBefore + contributionAmount - gasUsed,
                ethers.parseEther("0.001")
            );

            expect(await campaign.contributions(backer1.address)).to.equal(0);
        });

        it("Should not allow refund if goal was met", async function () {
            await campaign.connect(backer1).contribute({ value: GOAL });
            await time.increase(DURATION_DAYS * 24 * 60 * 60 + 1);

            await expect(
                campaign.connect(backer1).refund()
            ).to.be.revertedWith("Goal was reached");
        });

        it("Should not allow refund before deadline", async function () {
            await campaign.connect(backer1).contribute({ value: ethers.parseEther("1") });

            await expect(
                campaign.connect(backer1).refund()
            ).to.be.revertedWith("Campaign still active");
        });

        it("Should not allow refund with no contribution", async function () {
            await time.increase(DURATION_DAYS * 24 * 60 * 60 + 1);

            await expect(
                campaign.connect(backer2).refund()
            ).to.be.revertedWith("No contribution to refund");
        });
    });

    describe("ProjectToken", function () {
        let campaign, token;

        beforeEach(async function () {
            const tx = await factory.connect(creator).createCampaign(
                TOKEN_NAME,
                TOKEN_SYMBOL,
                GOAL,
                DURATION_DAYS,
                TOKEN_RATE
            );

            const receipt = await tx.wait();
            const event = receipt.logs.find(log => {
                try {
                    const parsed = factory.interface.parseLog(log);
                    return parsed.name === "CampaignCreated";
                } catch (e) {
                    return false;
                }
            });

            const parsedEvent = factory.interface.parseLog(event);
            const campaignAddress = parsedEvent.args.campaignAddress;
            const tokenAddress = parsedEvent.args.tokenAddress;

            campaign = await ethers.getContractAt("Crowdsale", campaignAddress);
            token = await ethers.getContractAt("ProjectToken", tokenAddress);
        });

        it("Should have correct name and symbol", async function () {
            expect(await token.name()).to.equal(TOKEN_NAME);
            expect(await token.symbol()).to.equal(TOKEN_SYMBOL);
        });

        it("Should only allow crowdsale to mint", async function () {
            await expect(
                token.connect(backer1).mint(backer1.address, ethers.parseEther("1000"))
            ).to.be.reverted; // Will revert with Ownable error
        });

        it("Should allow token transfers", async function () {
            await campaign.connect(backer1).contribute({ value: ethers.parseEther("1") });

            const tokenAmount = ethers.parseEther("500");
            await token.connect(backer1).transfer(backer2.address, tokenAmount);

            expect(await token.balanceOf(backer2.address)).to.equal(tokenAmount);
            expect(await token.balanceOf(backer1.address)).to.equal(ethers.parseEther("500"));
        });
    });

    describe("Edge Cases", function () {
        let campaign;

        beforeEach(async function () {
            const tx = await factory.connect(creator).createCampaign(
                TOKEN_NAME,
                TOKEN_SYMBOL,
                GOAL,
                DURATION_DAYS,
                TOKEN_RATE
            );

            const receipt = await tx.wait();
            const event = receipt.logs.find(log => {
                try {
                    const parsed = factory.interface.parseLog(log);
                    return parsed.name === "CampaignCreated";
                } catch (e) {
                    return false;
                }
            });

            const parsedEvent = factory.interface.parseLog(event);
            campaign = await ethers.getContractAt("Crowdsale", parsedEvent.args.campaignAddress);
        });

        it("Should handle exact goal amount", async function () {
            await campaign.connect(backer1).contribute({ value: GOAL });

            expect(await campaign.isGoalReached()).to.be.true;
            expect(await campaign.totalRaised()).to.equal(GOAL);
        });

        it("Should reject zero contributions", async function () {
            await expect(
                campaign.connect(backer1).contribute({ value: 0 })
            ).to.be.revertedWith("Contribution must be greater than 0");
        });

        it("Should handle multiple contributions from same backer", async function () {
            await campaign.connect(backer1).contribute({ value: ethers.parseEther("2") });
            await campaign.connect(backer1).contribute({ value: ethers.parseEther("3") });

            expect(await campaign.contributions(backer1.address)).to.equal(ethers.parseEther("5"));
        });
    });
});
