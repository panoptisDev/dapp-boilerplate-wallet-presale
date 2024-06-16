import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import styles from '../styles/Swap.module.css';
const ethLogo = "/img/eth-logo.png";
const tokenLogo = "/img/token-logo.png";

const Swap = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState('');
    const [ethAmount, setEthAmount] = useState('');
    const [tknAmount, setTknAmount] = useState('');
    const [swapContract, setSwapContract] = useState(null);
    const [tokenContract, setTokenContract] = useState(null);

    const swapContractAddress = '0xac02AE41F32B2eb15725e83d791beE35D4b58002';
    const swapAbi = require('../abis/EthSwap.json').abi;
    const tokenContractAddress = '0xeaD27a6c0c43598A0a6A216c9EE0E0ED638659f6';
    const tokenContractABI = require('../abis/Token.json').abi;

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);

                const swapContractInstance = new web3Instance.eth.Contract(swapAbi, swapContractAddress);
                setSwapContract(swapContractInstance);

                const tokenContractInstance = new web3Instance.eth.Contract(tokenContractABI, tokenContractAddress);
                setTokenContract(tokenContractInstance);
            } else {
                alert('Please install MetaMask!');
            }
        };
        init();
    }, []);

    const handleBuyTokens = async () => {
        if (swapContract && account) {
            try {
                await swapContract.methods.buyTokens().send({ from: account, value: web3.utils.toWei(ethAmount, 'ether') });
                alert('Tokens purchased successfully!');
            } catch (error) {
                console.error('Purchase failed', error);
                alert('Purchase failed');
            }
        }
    };

    const handleSellTokens = async () => {
        if (swapContract && account && tokenContract) {
            try {
                const amount = web3.utils.toWei(tknAmount, 'ether');
                await tokenContract.methods.approve(swapContractAddress, amount).send({ from: account });
                await swapContract.methods.sellTokens(amount).send({ from: account });
                alert('Tokens sold successfully!');
            } catch (error) {
                console.error('Sale failed', error);
                alert('Sale failed');
            }
        }
    };

  return (
    <div className={styles.swapBody}>
      <div className={styles.swapContainer}>
        <div className={styles.swapSection}>
          <h2>Buy Tokens</h2>
          <div className={styles.inputContainer}>
            <img src={ethLogo} alt="Ethereum logo" />
            <input
              className={styles.swapInput}
              type="text"
              placeholder="ETH Amount"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
            />
          </div>
          <button className={styles.swapButton} onClick={handleBuyTokens}>Buy</button>
        </div>
        <div className={styles.swapSection}>
          <h2>Sell Tokens</h2>
          <div className={styles.inputContainer}>
            <img src={tokenLogo} alt="Token logo" />
            <input
              className={styles.swapInput}
              type="text"
              placeholder="TKN Amount"
              value={tknAmount}
              onChange={(e) => setTknAmount(e.target.value)}
            />
          </div>
          <button className={styles.swapButton} onClick={handleSellTokens}>Sell</button>
        </div>
      </div>
    </div>
  );
};

export default Swap;