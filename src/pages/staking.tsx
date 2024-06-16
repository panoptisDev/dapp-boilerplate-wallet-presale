import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import styles from '../styles/Stake.module.css';

const contractAddress = '0x42A01c339f71f6F81386360e0fF4EDcEee0e8674'; // SimpleStaking contract address
const tokenAddress = '0x67b205Ac5b4e35899145De95A40bEeCAbDf385c2'; //ForeCasterToken contract address
const stakingAbi = [{"inputs":[{"internalType":"contract IERC20","name":"_erc20_contract_address","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"target","type":"address"}],"name":"AddressEmptyCode","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"AddressInsufficientBalance","type":"error"},{"inputs":[],"name":"FailedInnerCall","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensStaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensUnstaked","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"alreadyWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"erc20Contract","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getStakedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalStakedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newTimePeriodInSeconds","type":"uint256"}],"name":"resetTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timePeriodInSeconds","type":"uint256"}],"name":"setTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stakeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"timePeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timestampSet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAccidentallyLockedTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstakeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const tokenAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

function Staking() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [stakingContract, setStakingContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [statusMessage, setStatusMessage] = useState('Status: Ready');
  const [loading, setLoading] = useState(false);
  const [stakedTokens, setStakedTokens] = useState(0);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      alert('Please install MetaMask!');
    }
  }, []);

  const connectWallet = async () => {
    try {
      setLoading(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      const stakingInstance = new web3.eth.Contract(stakingAbi, contractAddress);
      setStakingContract(stakingInstance);
      const tokenInstance = new web3.eth.Contract(tokenAbi, tokenAddress);
      setTokenContract(tokenInstance);

      const staked = await stakingInstance.methods.getStakedTokens(accounts[0]).call();
      setStakedTokens(web3.utils.fromWei(staked, 'ether'));
      setStatusMessage('Wallet connected');
    } catch (error) {
      console.error(error);
      setStatusMessage('Error connecting wallet');
    } finally {
      setLoading(false);
    }
  };

  const stakeTokens = async () => {
    if (!stakeAmount || isNaN(stakeAmount) || stakeAmount <= 0) {
      setStatusMessage('Invalid stake amount');
      return;
    }

    try {
      setLoading(true);
      const amountInWei = web3.utils.toWei(stakeAmount, 'ether');
      await tokenContract.methods.approve(contractAddress, amountInWei).send({ from: account });
      await stakingContract.methods.stakeTokens(tokenAddress, amountInWei).send({ from: account });

      const staked = await stakingContract.methods.getStakedTokens(account).call();
      setStakedTokens(web3.utils.fromWei(staked, 'ether'));
      setStatusMessage('Tokens staked successfully');
    } catch (error) {
      console.error(error);
      setStatusMessage('Error staking tokens');
    } finally {
      setLoading(false);
    }
  };

  const unstakeTokens = async () => {
    if (!stakeAmount || isNaN(stakeAmount) || stakeAmount <= 0) {
      setStatusMessage('Invalid unstake amount');
      return;
    }

    try {
      setLoading(true);
      const amountInWei = web3.utils.toWei(stakeAmount, 'ether');
      await stakingContract.methods.unstakeTokens(tokenAddress, amountInWei).send({ from: account });

      const staked = await stakingContract.methods.getStakedTokens(account).call();
      setStakedTokens(web3.utils.fromWei(staked, 'ether'));
      setStatusMessage('Tokens unstaked successfully');
    } catch (error) {
      console.error(error);
      setStatusMessage('Error unstaking tokens');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.App}>
      <h1 className={styles.heading}>Forcaster Staking</h1>
      <div className={styles.accountInfo}>
        <label>Connected Account:</label>
        <span>{account || 'Not connected'}</span>
      </div>
      <div className={styles.accountInfo}>
        <label>Staked Tokens:</label>
        <span>{stakedTokens}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={connectWallet} disabled={loading}>
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
        <button onClick={stakeTokens} disabled={!account || loading}>
          {loading ? 'Staking...' : 'Stake Tokens'}
        </button>
        <button onClick={unstakeTokens} disabled={!account || loading}>
          {loading ? 'Unstaking...' : 'Unstake Tokens'}
        </button>
      </div>
      <div className={styles.stakeInfo}>
        <label>Amount to Stake/Unstake:
          <span className={styles.tooltip}>
            &#9432;
            <span className={styles.tooltiptext}>Enter the amount of tokens you want to stake or unstake.</span>
          </span>
        </label>
        <input
          className={styles.inputClass}
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>
      <div className={styles.status}>
        <p>{statusMessage}</p>
      </div>
    </div>
  );
}

export default Staking;