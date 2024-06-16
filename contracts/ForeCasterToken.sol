// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ForeCasterToken is ERC20 {
    constructor() ERC20("ForeCasterToken", "FCT") {
        uint256 initialSupply = 25000000 * (10 ** uint256(decimals()));
        _mint(msg.sender, initialSupply);
    }
}