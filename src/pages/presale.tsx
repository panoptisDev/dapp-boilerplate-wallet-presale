import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import styles from '../styles/Presale.module.css';
import { Contract } from 'web3-eth-contract';
const ethLogo = "/img/eth-logo.png";
const tokenLogo = "/img/token-logo.png";

const TokenPresale = () => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [account, setAccount] = useState('');
    const [ethAmount, setEthAmount] = useState('');
    const [presaleContract, setPresaleContract] = useState<Contract | null>(null);
    const [rate, setRate] = useState(0);

    const presaleContractAddress = '0xE9d667b42F94907fD39296c177e8aB0f4e3033a8';
    const presaleAbi = require('../abis/TokenPresale.json').abi;
    const tokenContractAddress = '0x763F016d03eEa2653debB688D15C80583A6421E1';
    const tokenContractABI = require('../abis/Token.json').abi;

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);

                const presaleContractInstance = new web3Instance.eth.Contract(presaleAbi, presaleContractAddress);
                setPresaleContract(presaleContractInstance);

                const currentRate = await presaleContractInstance.methods.getRate().call();
                setRate(currentRate);
            } else {
                alert('Please install MetaMask!');
            }
        };
        init();
    }, []);

    const handleBuyTokens = async () => {
        if (presaleContract && account && web3) {
            try {
                await presaleContract.methods.buyTokens().send({ from: account, value: web3.utils.toWei(ethAmount, 'ether') });
                alert('Tokens purchased successfully!');
            } catch (error) {
                console.error('Purchase failed', error);
                alert('Purchase failed');
            }
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen p-8 text-white bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
            <div className={styles.presaleContainer}>
                <div className={styles.purchaseSection}>
                    <h2 className={styles.heading}>Buy Shape Tokens</h2>
                    <h2 className={styles.smallHeading}>Enter how much eth you like to spend</h2>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="ETH Amount"
                        value={ethAmount}
                        onChange={(e) => setEthAmount(e.target.value)}
                    />
                    <p className={styles.rate}>Current Rate: {rate} TKN per ETH</p>
                    <button className={styles.buyButton} onClick={handleBuyTokens}>Buy</button>
                </div>
            </div>
        </div>
    );
};

export default TokenPresale;