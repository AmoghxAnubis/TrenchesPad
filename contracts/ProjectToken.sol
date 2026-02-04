// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ProjectToken
 * @dev ERC-20 token automatically issued to campaign backers
 * @notice Only the associated Crowdsale contract can mint tokens
 */
contract ProjectToken is ERC20, Ownable {
    /**
     * @dev Constructor sets token name, symbol, and assigns ownership to crowdsale
     * @param name Token name (e.g., "Vibe Token")
     * @param symbol Token symbol (e.g., "VIBE")
     * @param crowdsaleAddress Address of the Crowdsale contract that can mint tokens
     */
    constructor(
        string memory name,
        string memory symbol,
        address crowdsaleAddress
    ) ERC20(name, symbol) Ownable(crowdsaleAddress) {
        require(crowdsaleAddress != address(0), "Invalid crowdsale address");
    }

    /**
     * @dev Mints tokens to a specified address
     * @param to Address to receive tokens
     * @param amount Amount of tokens to mint
     * @notice Only callable by the Crowdsale contract (owner)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
