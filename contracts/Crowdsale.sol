// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./ProjectToken.sol";

/**
 * @title Crowdsale
 * @dev Core campaign logic handling contributions, fund distribution, and refunds
 * @notice Implements goal-based funding with automatic refunds if goal is not met
 */
contract Crowdsale is ReentrancyGuard {
    // Campaign parameters
    address public immutable creator;
    ProjectToken public immutable token;
    uint256 public immutable goal;
    uint256 public immutable deadline;
    uint256 public immutable tokenRate; // tokens per 1 ETH (in wei)

    // Campaign state
    uint256 public totalRaised;
    bool public finalized;
    mapping(address => uint256) public contributions;

    // Events
    event Contribution(address indexed backer, uint256 amount, uint256 tokensIssued);
    event Withdrawal(address indexed creator, uint256 amount);
    event Refund(address indexed backer, uint256 amount);
    event Finalized(bool goalReached, uint256 totalRaised);

    /**
     * @dev Constructor sets up the campaign parameters
     * @param _creator Address of the campaign creator
     * @param _token Address of the ProjectToken contract
     * @param _goal Funding goal in wei
     * @param _durationInDays Campaign duration in days
     * @param _tokenRate Number of tokens per 1 ETH (e.g., 1000 = 1000 tokens per ETH)
     */
    constructor(
        address _creator,
        address _token,
        uint256 _goal,
        uint256 _durationInDays,
        uint256 _tokenRate
    ) {
        require(_creator != address(0), "Invalid creator address");
        require(_token != address(0), "Invalid token address");
        require(_goal > 0, "Goal must be greater than 0");
        require(_durationInDays > 0, "Duration must be greater than 0");
        require(_tokenRate > 0, "Token rate must be greater than 0");

        creator = _creator;
        token = ProjectToken(_token);
        goal = _goal;
        deadline = block.timestamp + (_durationInDays * 1 days);
        tokenRate = _tokenRate;
    }

    /**
     * @dev Allows backers to contribute ETH and receive tokens immediately
     * @notice Campaign must be active (before deadline)
     */
    function contribute() external payable nonReentrant {
        require(block.timestamp < deadline, "Campaign has ended");
        require(msg.value > 0, "Contribution must be greater than 0");

        // Update state
        contributions[msg.sender] += msg.value;
        totalRaised += msg.value;

        // Calculate tokens to mint (tokenRate tokens per 1 ETH)
        uint256 tokensToMint = msg.value * tokenRate;
        
        // Mint tokens to backer
        token.mint(msg.sender, tokensToMint);

        emit Contribution(msg.sender, msg.value, tokensToMint);
    }

    /**
     * @dev Allows creator to withdraw funds if goal is met after deadline
     * @notice Only callable by creator, only if goal reached
     */
    function withdraw() external nonReentrant {
        require(msg.sender == creator, "Only creator can withdraw");
        require(block.timestamp >= deadline, "Campaign still active");
        require(totalRaised >= goal, "Goal not reached");
        require(!finalized, "Already finalized");

        finalized = true;
        uint256 amount = address(this).balance;

        emit Withdrawal(creator, amount);
        emit Finalized(true, totalRaised);

        // Transfer funds to creator
        (bool success, ) = creator.call{value: amount}("");
        require(success, "Transfer failed");
    }

    /**
     * @dev Allows backers to claim refund if goal is not met after deadline
     * @notice Only callable if campaign failed to reach goal
     */
    function refund() external nonReentrant {
        require(block.timestamp >= deadline, "Campaign still active");
        require(totalRaised < goal, "Goal was reached");
        require(contributions[msg.sender] > 0, "No contribution to refund");

        uint256 amount = contributions[msg.sender];
        contributions[msg.sender] = 0;

        emit Refund(msg.sender, amount);

        // Transfer refund to backer
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Refund failed");
    }

    /**
     * @dev Check if the funding goal has been reached
     * @return bool True if goal reached
     */
    function isGoalReached() public view returns (bool) {
        return totalRaised >= goal;
    }

    /**
     * @dev Check if the campaign has ended
     * @return bool True if past deadline
     */
    function hasEnded() public view returns (bool) {
        return block.timestamp >= deadline;
    }

    /**
     * @dev Get campaign status information
     * @return _totalRaised Total amount raised
     * @return _goal Funding goal
     * @return _deadline Campaign deadline
     * @return _isGoalReached Whether goal is reached
     * @return _hasEnded Whether campaign has ended
     */
    function getStatus() external view returns (
        uint256 _totalRaised,
        uint256 _goal,
        uint256 _deadline,
        bool _isGoalReached,
        bool _hasEnded
    ) {
        return (
            totalRaised,
            goal,
            deadline,
            isGoalReached(),
            hasEnded()
        );
    }
}
