// Configuration for Avalanche Fuji Testnet
export const CONFIG = {
  // Update this with your deployed contract address on Avalanche Fuji testnet
  CONTRACT_ADDRESS: "0xa50e77Ae17F290Cfb0E2F29B4F2d9D0071Cb6D63", // Deployed on Avalanche Fuji testnet
  
  // Network configuration for Avalanche Fuji Testnet
  NETWORK_ID: "43113", // Avalanche Fuji Testnet
  NETWORK_NAME: "Avalanche Fuji Testnet",
  
  // RPC URLs for Avalanche
  AVALANCHE_RPC: "https://api.avax.network/ext/bc/C/rpc", // Official Avalanche Mainnet RPC
  AVALANCHE_TESTNET_RPC: "https://api.avax-test.network/ext/bc/C/rpc", // Fuji testnet RPC
  
  // Chain ID for MetaMask (Fuji testnet)
  CHAIN_ID: "0xa869", // 43113 in hex
  
  // Currency info
  CURRENCY_SYMBOL: "AVAX",
  CURRENCY_NAME: "Avalanche",
  
  // Block explorer
  BLOCK_EXPLORER: "https://snowtrace.io", // Mainnet
  BLOCK_EXPLORER_TESTNET: "https://testnet.snowtrace.io" // Fuji testnet
};

// Export individual values for easy use
export const CONTRACT_ADDRESS = CONFIG.CONTRACT_ADDRESS;
export const NETWORK_ID = CONFIG.NETWORK_ID;
export const NETWORK_NAME = CONFIG.NETWORK_NAME;
export const AVALANCHE_RPC = CONFIG.AVALANCHE_RPC;
export const AVALANCHE_TESTNET_RPC = CONFIG.AVALANCHE_TESTNET_RPC;
export const CHAIN_ID = CONFIG.CHAIN_ID;
export const CURRENCY_SYMBOL = CONFIG.CURRENCY_SYMBOL;
export const CURRENCY_NAME = CONFIG.CURRENCY_NAME;
export const BLOCK_EXPLORER = CONFIG.BLOCK_EXPLORER;
export const BLOCK_EXPLORER_TESTNET = CONFIG.BLOCK_EXPLORER_TESTNET; 