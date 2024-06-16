// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract BettingPool {
    AggregatorV3Interface internal priceFeed;

    address public owner;
    uint256 public startTime;
    uint256 public betAmount = 1 ether; // 1 MATIC
    mapping(address => Prediction) public predictions;
    address[] public participants;

    struct Prediction {
        uint256 timestamp;
        int256 predictedPrice;
        bool hasPredicted;
    }

    struct Winner {
        address winnerAddress;
        uint256 predictionPeriod;
    }

    Winner[] public winners;

    constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
        owner = msg.sender;
        startTime = block.timestamp;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    function placeBet(uint256 predictionPeriod, int256 predictedPrice) public payable {
        require(msg.value == betAmount, "Incorrect bet amount.");
        require(predictionPeriod == 4 weeks || predictionPeriod == 3 weeks || predictionPeriod == 2 weeks || predictionPeriod == 7 days || predictionPeriod == 4 days, "Invalid prediction period.");
        require(!predictions[msg.sender].hasPredicted, "You have already placed a bet.");

        predictions[msg.sender] = Prediction(block.timestamp + predictionPeriod, predictedPrice, true);
        participants.push(msg.sender);
    }

    function checkPredictions() public onlyOwner {
        require(block.timestamp >= startTime + 4 weeks, "Cannot check predictions before 4 weeks.");

        int256 correctPrice = getLatestPrice();
        for (uint256 i = 0; i < participants.length; i++) {
            address participant = participants[i];
            Prediction memory prediction = predictions[participant];

            if (block.timestamp >= prediction.timestamp) {
                if (prediction.predictedPrice == correctPrice) {
                    winners.push(Winner(participant, prediction.timestamp - block.timestamp));
                }
                delete predictions[participant];
            }
        }
        distributeRewards();
    }

    function getLatestPrice() public view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    function distributeRewards() internal {
        uint256 poolAmount = address(this).balance;
        uint256 totalWinners = winners.length;

        if (totalWinners == 0) {
            return;
        }

        uint256[] memory payouts = new uint256[](5);
        payouts[0] = (poolAmount * 90) / 100; // 4 weeks
        payouts[1] = (poolAmount * 75) / 100; // 3 weeks
        payouts[2] = (poolAmount * 60) / 100; // 2 weeks
        payouts[3] = (poolAmount * 50) / 100; // 7 days
        payouts[4] = (poolAmount * 40) / 100; // 4 days

        for (uint256 i = 0; i < totalWinners; i++) {
            Winner memory winner = winners[i];
            uint256 payoutIndex = 0;

            if (winner.predictionPeriod == 3 weeks) {
                payoutIndex = 1;
            } else if (winner.predictionPeriod == 2 weeks) {
                payoutIndex = 2;
            } else if (winner.predictionPeriod == 7 days) {
                payoutIndex = 3;
            } else if (winner.predictionPeriod == 4 days) {
                payoutIndex = 4;
            }

            payable(winner.winnerAddress).transfer(payouts[payoutIndex] / totalWinners);
        }

        // Reset the state for the next round
        delete winners;
        delete participants;
        startTime = block.timestamp;
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}