// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import './Token.sol';

contract TokenPresale {
    string public name = "Token Presale";
    Token public token;
    uint public rateFirst30Days = 1000;
    uint public rateAfter30Days = 800;
    uint public startTime;
    uint public duration = 60 days;
    address public owner;
    bool public presalePaused = false;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event PresaleStarted(uint startTime);
    event PresalePaused(bool paused);
    event RatesUpdated(uint newRateFirst30Days, uint newRateAfter30Days);
    event WithdrawnETH(address to, uint amount);
    event WithdrawnTokens(address to, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "TokenPresale: Not owner");
        _;
    }

    modifier presaleActive() {
        require(block.timestamp >= startTime && block.timestamp < startTime + duration, "Presale not active");
        require(!presalePaused, "Presale is paused");
        _;
    }

    constructor(Token _token) {
        token = _token;
        owner = msg.sender;
    }

    function startPresale() public onlyOwner {
        startTime = block.timestamp;
        presalePaused = false;
        emit PresaleStarted(startTime);
    }

    function pausePresale() public onlyOwner {
        presalePaused = true;
        emit PresalePaused(presalePaused);
    }

    function resumePresale() public onlyOwner {
        presalePaused = false;
        emit PresalePaused(presalePaused);
    }

    function setRates(uint _rateFirst30Days, uint _rateAfter30Days) public onlyOwner {
        rateFirst30Days = _rateFirst30Days;
        rateAfter30Days = _rateAfter30Days;
        emit RatesUpdated(rateFirst30Days, rateAfter30Days);
    }

    function buyTokens() public payable presaleActive {
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

    function withdrawETH(uint _amount) public onlyOwner {
        require(address(this).balance >= _amount, "TokenPresale: insufficient ETH balance");
        payable(owner).transfer(_amount);
        emit WithdrawnETH(owner, _amount);
    }

    function withdrawTokens(uint _amount) public onlyOwner {
        require(token.balanceOf(address(this)) >= _amount, "TokenPresale: insufficient token balance");
        token.transfer(owner, _amount);
        emit WithdrawnTokens(owner, _amount);
    }

    function getRate() public view returns (uint) {
        if (block.timestamp <= startTime + 30 days) {
            return rateFirst30Days;
        } else {
            return rateAfter30Days;
        }
    }
}