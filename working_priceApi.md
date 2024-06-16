import { useState, useEffect } from "react";
import axios from 'axios';
import { ethers } from 'ethers';
import { useWriteContract } from "wagmi";
import { BettingContractAddress, BettingContractABI } from '../lib/constants/BettingContract';
import styles from '../styles/betting.module.css';

const BettingPage = () => {
  const [prediction, setPrediction] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [price, setPrice] = useState<string>("Loading...");

  // Fetch price data from the provided API
  const fetchPrice = async () => {
    try {
      const response = await axios.get('https://api.diadata.org/v1/assetQuotation/Ethereum/0x0000000000000000000000000000000000000000');
      const priceData = response.data.Price;
      setPrice(priceData.toString());
    } catch (error) {
      console.error("Error fetching price from API:", error);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 10000); // Refresh price every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const { writeAsync: sendPlaceBet } = useWriteContract({
    address: BettingContractAddress,
    abi: BettingContractABI,
    functionName: "placeBet",
  });

  const handlePredictionSubmit = async () => {
    if (selectedPeriod && prediction && !isNaN(Number(prediction))) {
      try {
        await sendPlaceBet({
          args: [selectedPeriod, ethers.utils.parseUnits(prediction, "ether")],
          overrides: { value: ethers.utils.parseUnits("1", "ether") }
        });
      } catch (error) {
        console.error("Error placing bet:", error);
      }
    } else {
      alert("Please enter a numeric prediction and select a prediction period.");
    }
  };

  return (
    <div className="flex max-w-4xl p-10 mx-auto">
      <div className="p-4 mr-16 bg-gray-900 rounded-lg">
        <h2 className="mb-2 text-2xl font-bold">ForeCast Info</h2>
        <p className="text-lg">"You are predicting that the price of ETH/USD will reach "your" specific value in one of the following timeframes:<br /> 4 weeks, 3 weeks, 2 weeks, 1 week, or 4 days from now."<br />Your prediction if correct might give you up to 90% of the betting pool. </p>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Betting Pool</h2>
          <p className="text-lg">Current USD/ETH Price: {price}</p>
        </div>
        <input
          className="w-full p-2 mb-4 text-lg border border-gray-300 rounded"
          placeholder="Enter your prediction"
          value={prediction}
          onChange={(e) => setPrediction(e.target.value)}
          type="number"
        />
        <div className="flex justify-between w-full mb-6">
          <button className="px-4 py-2 mx-1 text-white transition-transform duration-200 transform border border-orange-200 border-solid rounded bg-primary hover:scale-105" onClick={() => setSelectedPeriod(4 * 7 * 24 * 60 * 60)}>
            4 Weeks
          </button>
          <button className="px-4 py-2 mx-1 text-white transition-transform duration-200 transform border border-orange-200 border-solid rounded bg-primary hover:scale-105" onClick={() => setSelectedPeriod(3 * 7 * 24 * 60 * 60)}>
            3 Weeks
          </button>
          <button className="px-4 py-2 mx-1 text-white transition-transform duration-200 transform border border-orange-200 border-solid rounded bg-primary hover:scale-105" onClick={() => setSelectedPeriod(2 * 7 * 24 * 60 * 60)}>
            2 Weeks
          </button>
          <button className="px-4 py-2 mx-1 text-white transition-transform duration-200 transform border border-orange-200 border-solid rounded bg-primary hover:scale-105" onClick={() => setSelectedPeriod(7 * 24 * 60 * 60)}>
            7 Days
          </button>
          <button className="px-4 py-2 mx-1 text-white transition-transform duration-200 transform border border-orange-200 border-solid rounded bg-primary hover:scale-105" onClick={() => setSelectedPeriod(4 * 24 * 60 * 60)}>
            4 Days
          </button>
        </div>
        <button className="px-6 py-2 mb-4 text-white transition-transform duration-200 transform bg-green-700 border border-green-300 rounded-full hover:scale-105" onClick={handlePredictionSubmit}>
          Submit Prediction
        </button>
      </div>
    </div>
  );
};

export default BettingPage;