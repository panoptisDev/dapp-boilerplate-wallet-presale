// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Token.sol';

contract TokenPresale {
    string public name = "Token Presale";
    Token public token;
    uint public rateFirst30Days = 1000;
    uint public rateAfter30Days = 800;
    uint public startTime;
    uint public duration = 60 days;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) {
        token = _token;
        startTime = block.timestamp;
    }

    function buyTokens() public payable {
        require(block.timestamp < startTime + duration, "Presale has ended");

        uint tokenAmount;
        if (block.timestamp <= startTime + 30 days) {
            tokenAmount = msg.value * rateFirst30Days;
        } else {
            tokenAmount = msg.value * rateAfter30Days;
        }

        require(token.balanceOf(address(this)) >= tokenAmount, "TokenPresale: insufficient balance");

        token.transfer(msg.sender, tokenAmount);

        emit TokensPurchased(msg.sender, address(token), tokenAmount, getRate());
    }

    function getRate() public view returns (uint) {
        if (block.timestamp <= startTime + 30 days) {
            return rateFirst30Days;
        } else {
            return rateAfter30Days;
        }
    }
}