// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract TokenFactory {
    event TokenCreated(address indexed tokenAddress);

    function createToken(
        string memory name,
        string memory symbol,
        address owner,
        uint256 initialSupply
    ) public {
        ERC20Token newToken = new ERC20Token(name, symbol, owner, initialSupply);
        emit TokenCreated(address(newToken));
    }
}

contract ERC20Token is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        address owner,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(owner, initialSupply);
    }
}

