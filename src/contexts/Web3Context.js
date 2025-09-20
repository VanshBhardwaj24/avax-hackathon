import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import P2POrderFlowABI from '../contracts/P2POrderFlow.json';
import { CONTRACT_ADDRESS, NETWORK_ID, NETWORK_NAME, CHAIN_ID, AVALANCHE_TESTNET_RPC, BLOCK_EXPLORER_TESTNET } from '../config';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(null);
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Contract address and network config
  const EXPECTED_NETWORK_ID = NETWORK_ID;
  const EXPECTED_NETWORK_NAME = NETWORK_NAME;

  // Function to add Avalanche Fuji testnet to MetaMask
  const addAvalancheToMetaMask = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: CHAIN_ID,
          chainName: 'Avalanche Fuji Testnet',
          nativeCurrency: {
            name: 'AVAX',
            symbol: 'AVAX',
            decimals: 18
          },
          rpcUrls: [AVALANCHE_TESTNET_RPC],
          blockExplorerUrls: [BLOCK_EXPLORER_TESTNET]
        }]
      });
      return true;
    } catch (error) {
      console.error('Error adding Avalanche Fuji testnet to MetaMask:', error);
      return false;
    }
  };

  // Function to switch to Avalanche Fuji testnet
  const switchToAvalanche = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID }]
      });
      return true;
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        return await addAvalancheToMetaMask();
      }
      throw switchError;
    }
  };

  const connectWallet = async () => {
    // Prevent multiple simultaneous connection attempts
    if (isConnecting) {
      console.log('Wallet connection already in progress...');
      return;
    }

    try {
      setIsConnecting(true);
      setIsLoading(true);
      setNetworkError(null);
      
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      console.log('🔄 Starting wallet connection...');
      
      // Request accounts with timeout
      const accounts = await Promise.race([
        window.ethereum.request({
          method: 'eth_requestAccounts'
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout')), 10000)
        )
      ]);
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask and try again.');
      }

      console.log('✅ Accounts received:', accounts);
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Check network
      const network = await provider.getNetwork();
      const networkId = network.chainId.toString();
      
      console.log('🌐 Current network:', {
        chainId: networkId,
        name: network.name,
        expectedChainId: EXPECTED_NETWORK_ID
      });
      
      if (networkId !== EXPECTED_NETWORK_ID) {
        setNetworkError(`Please connect to ${EXPECTED_NETWORK_NAME}. Click "Switch to Fuji Testnet" to add and switch to the correct network.`);
        return;
      }
      
      setCurrentNetwork(network);
      
      const signer = await provider.getSigner();
      
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        P2POrderFlowABI,
        signer
      );
      
      // Test contract connection
      try {
        await contract.orderCount();
        console.log('✅ Contract connection verified');
      } catch (contractError) {
        console.error('❌ Contract connection failed:', contractError);
        throw new Error('Failed to connect to contract. Please check if the contract is deployed and the address is correct.');
      }
      
      // Expose contract to window for debugging
      window.contract = contract;
      window.ethers = ethers;
      
      setAccount(accounts[0]);
      setProvider(provider);
      setContract(contract);
      setIsConnected(true);
      
      console.log('🎉 Wallet connected successfully!', {
        account: accounts[0],
        network: network.name,
        contractAddress: CONTRACT_ADDRESS
      });
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('🔄 Account changed:', accounts);
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      });
      
      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId) => {
        console.log('🔄 Chain changed:', chainId);
        window.location.reload();
      });
      
    } catch (error) {
      console.error('❌ Error connecting wallet:', error);
      
      if (error.message.includes('User rejected') || error.message.includes('User denied')) {
        setNetworkError('Connection cancelled by user.');
      } else if (error.message.includes('timeout')) {
        setNetworkError('Connection timeout. Please try again.');
      } else if (error.message.includes('already pending')) {
        setNetworkError('Connection request already in progress. Please wait...');
      } else {
        setNetworkError(`Failed to connect wallet: ${error.message}`);
      }
    } finally {
      setIsConnecting(false);
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    console.log('🔌 Disconnecting wallet...');
    setAccount(null);
    setProvider(null);
    setContract(null);
    setIsConnected(false);
    setNetworkError(null);
    setCurrentNetwork(null);
    
    // Clean up window references
    if (window.contract) {
      delete window.contract;
    }
  };

  useEffect(() => {
    // Check if wallet is already connected
    const checkExistingConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            console.log('🔄 Found existing connection, reconnecting...');
            await connectWallet();
          }
        } catch (error) {
          console.error('❌ Error checking existing connection:', error);
        }
      }
    };

    checkExistingConnection();
  }, []);

  const value = {
    account,
    provider,
    contract,
    isConnected,
    isLoading,
    isConnecting,
    networkError,
    currentNetwork,
    connectWallet,
    disconnectWallet,
    switchToAvalanche,
    addAvalancheToMetaMask,
    CONTRACT_ADDRESS,
    EXPECTED_NETWORK_NAME
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}; 