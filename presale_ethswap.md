Smart Contract:

TokenPresale replaces EthSwap.
The presale period is set to 60 days.
The rate is 1000 TKN per ETH for the first 30 days and 800 TKN per ETH for the remaining period.
The buyTokens function allows users to buy tokens but not sell them back.
The getRate function provides the current rate based on the elapsed time.
---
frontend
-----
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const TokenPresale = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState('');
    const [ethAmount, setEthAmount] = useState('');
    const [presaleContract, setPresaleContract] = useState(null);
    const [rate, setRate] = useState(0);

    const presaleContractAddress = 'YOUR_CONTRACT_ADDRESS';
    const presaleContractABI = [/* YOUR_CONTRACT_ABI */];

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);

                const presaleContractInstance = new web3Instance.eth.Contract(presaleContractABI, presaleContractAddress);
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
        if (presaleContract && account) {
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
        <div>
            <button onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}>
                Connect Wallet
            </button>
            <div>
                <h2>Buy Tokens</h2>
                <input
                    type="text"
                    placeholder="ETH Amount"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                />
                <p>Current Rate: {rate} TKN per ETH</p>
                <button onClick={handleBuyTokens}>Buy</button>
            </div>
        </div>
    );
};

export default TokenPresale;