# Quick Avalanche Setup Guide

## 🚀 Deploy to Avalanche in 5 Minutes

### 1. Install Hardhat Dependencies
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
```

### 2. Create Environment File
Create a `.env` file in your project root:
```bash
# Your wallet private key (for deployment)
PRIVATE_KEY=your_private_key_here

# Optional: Snowtrace API key for contract verification
SNOWTRACE_API_KEY=your_snowtrace_api_key_here
```

### 3. Deploy to Avalanche Fuji Testnet (Recommended First)
```bash
npm run deploy:fuji
```

### 4. Deploy to Avalanche Mainnet
```bash
npm run deploy:avalanche
```

### 5. Update Contract Address
Copy the deployed contract address from the deployment output and update `src/config.js`:
```javascript
CONTRACT_ADDRESS: "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE"
```

### 6. Start the App
```bash
npm start
```

## 🔧 MetaMask Configuration

### Add Avalanche C-Chain to MetaMask:
- **Network Name**: Avalanche C-Chain
- **RPC URL**: https://api.avax.network/ext/bc/C/rpc
- **Chain ID**: 43114
- **Currency Symbol**: AVAX
- **Block Explorer URL**: https://snowtrace.io

### Add Fuji Testnet to MetaMask:
- **Network Name**: Avalanche Fuji Testnet
- **RPC URL**: https://api.avax-test.network/ext/bc/C/rpc
- **Chain ID**: 43113
- **Currency Symbol**: AVAX
- **Block Explorer URL**: https://testnet.snowtrace.io

## 💰 Get Testnet AVAX

For Fuji testnet, get free test AVAX from:
https://faucet.avax.network/

## 📝 Important Notes

- **Never share your private key**
- **Test on Fuji first before mainnet**
- **Ensure you have sufficient AVAX for gas fees**
- **The app will automatically prompt you to add Avalanche to MetaMask**

## 🆘 Troubleshooting

If you see "Wrong Network" errors:
1. Click "Switch to Avalanche" button
2. MetaMask will prompt to add/switch networks
3. Confirm the network addition

## 🎯 Ready to Go!

Your P2P Order Flow app is now configured for Avalanche! Users can:
- Connect MetaMask wallets
- Automatically switch to Avalanche networks
- Create and manage orders with AVAX
- Enjoy low gas fees and fast transactions 