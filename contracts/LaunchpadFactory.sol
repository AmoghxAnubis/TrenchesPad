// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Crowdsale.sol";
import "./ProjectToken.sol";

/**
 * @title LaunchpadFactory
 * @dev Factory contract for deploying new crowdfunding campaigns
 * @notice Fully permissionless - anyone can create a campaign
 */
contract LaunchpadFactory {
    // Storage
    address[] public campaigns;
    mapping(address => bool) public isCampaign;

    // Events
    event CampaignCreated(
        address indexed campaignAddress,
        address indexed creator,
        address indexed tokenAddress,
        string tokenName,
        string tokenSymbol,
        uint256 goal,
        uint256 deadline,
        uint256 tokenRate
    );

    /**
     * @dev Creates a new crowdfunding campaign
     * @param tokenName Name of the project token (e.g., "Vibe Token")
     * @param tokenSymbol Symbol of the project token (e.g., "VIBE")
     * @param goal Funding goal in wei
     * @param durationInDays Campaign duration in days
     * @param tokenRate Number of tokens per 1 ETH (e.g., 1000)
     * @return campaignAddress Address of the newly created campaign
     */
    function createCampaign(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 goal,
        uint256 durationInDays,
        uint256 tokenRate
    ) external returns (address campaignAddress) {
        require(bytes(tokenName).length > 0, "Token name required");
        require(bytes(tokenSymbol).length > 0, "Token symbol required");
        require(goal > 0, "Goal must be greater than 0");
        require(durationInDays > 0, "Duration must be greater than 0");
        require(tokenRate > 0, "Token rate must be greater than 0");

        // Deploy ProjectToken contract (factory is temporary owner)
        ProjectToken token = new ProjectToken(
            tokenName,
            tokenSymbol,
            address(this) // Factory is temporary owner
        );

        // Deploy Crowdsale contract
        Crowdsale campaign = new Crowdsale(
            msg.sender, // creator
            address(token),
            goal,
            durationInDays,
            tokenRate
        );

        // Transfer token ownership to Crowdsale contract
        token.transferOwnership(address(campaign));

        // Store campaign address
        campaignAddress = address(campaign);
        campaigns.push(campaignAddress);
        isCampaign[campaignAddress] = true;

        // Calculate deadline for event
        uint256 deadline = block.timestamp + (durationInDays * 1 days);

        emit CampaignCreated(
            campaignAddress,
            msg.sender,
            address(token),
            tokenName,
            tokenSymbol,
            goal,
            deadline,
            tokenRate
        );

        return campaignAddress;
    }

    /**
     * @dev Get all campaign addresses
     * @return Array of all campaign addresses
     */
    function getCampaigns() external view returns (address[] memory) {
        return campaigns;
    }

    /**
     * @dev Get total number of campaigns created
     * @return Number of campaigns
     */
    function getCampaignCount() external view returns (uint256) {
        return campaigns.length;
    }

    /**
     * @dev Get a specific campaign address by index
     * @param index Index in the campaigns array
     * @return Campaign address
     */
    function getCampaign(uint256 index) external view returns (address) {
        require(index < campaigns.length, "Index out of bounds");
        return campaigns[index];
    }
}
