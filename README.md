# P2P Order Flow - Avalanche C-Chain

A decentralized peer-to-peer order management system built on Avalanche C-Chain using Solidity smart contracts and React.

## Features

- **Buyer View**: Browse and purchase orders from merchants
- **Merchant View**: Create and manage orders for your products/services
- **Smart Contract**: Secure order management with escrow functionality
- **Avalanche Integration**: Built specifically for Avalanche C-Chain mainnet

## Network Configuration

This application is configured to work on **Avalanche C-Chain Mainnet**:
- **Chain ID**: 43114 (0xa86a)
- **Currency**: AVAX
- **RPC URL**: https://api.avax.network/ext/bc/C/rpc
- **Block Explorer**: https://snowtrace.io

## Prerequisites

- MetaMask wallet extension
- Some AVAX tokens for gas fees and transactions
- Node.js and npm installed

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Deploy Smart Contract to Avalanche

#### Option A: Using Remix IDE
1. Go to [Remix IDE](https://remix.ethereum.org/)
2. Create a new file called `P2POrderFlow.sol` and paste the contract code
3. Compile the contract
4. In the Deploy tab, select "Injected Provider - MetaMask"
5. Make sure MetaMask is connected to Avalanche C-Chain
6. Deploy the contract
7. Copy the deployed contract address

#### Option B: Using Hardhat (Advanced)
1. Install Hardhat: `npm install --save-dev hardhat`
2. Configure `hardhat.config.js` for Avalanche
3. Deploy using: `npx hardhat run scripts/deploy.js --network avalanche`

### 3. Update Contract Address

Update the `CONTRACT_ADDRESS` in `src/config.js` with your deployed contract address:

```javascript
CONTRACT_ADDRESS: "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE"
```

### 4. Add Avalanche to MetaMask

The app will automatically prompt you to add Avalanche to MetaMask if it's not already configured. You can also manually add it:

**Network Name**: Avalanche C-Chain  
**RPC URL**: https://api.avax.network/ext/bc/C/rpc  
**Chain ID**: 43114  
**Currency Symbol**: AVAX  
**Block Explorer URL**: https://snowtrace.io

### 5. Run the Application

```bash
npm start
```

## Usage

### For Buyers
1. Connect your MetaMask wallet (must be on Avalanche C-Chain)
2. Browse available orders in the Buyer View
3. Click on an order to view details
4. Click "Purchase" to buy the order
5. Confirm the transaction in MetaMask

### For Merchants
1. Connect your MetaMask wallet (must be on Avalanche C-Chain)
2. Switch to Merchant View
3. Fill out the order creation form
4. Set your price in AVAX
5. Click "Create Order" and confirm the transaction

## Smart Contract Details

The `P2POrderFlow.sol` contract includes:
- Order creation and management
- Escrow functionality for secure transactions
- Order status tracking
- Dispute resolution mechanisms

## Gas Fees

- **Avalanche C-Chain** typically has very low gas fees (usually < $1 USD)
- Gas fees are paid in AVAX
- Ensure your wallet has sufficient AVAX for transactions

## Troubleshooting

### Wrong Network Error
If you see a "Wrong Network" error:
1. Click the "Switch to Avalanche" button
2. MetaMask will prompt you to add/switch to Avalanche C-Chain
3. Confirm the network addition/switch

### Transaction Failures
- Ensure you have sufficient AVAX for gas fees
- Check that you're connected to Avalanche C-Chain
- Verify the contract address is correct

### MetaMask Issues
- Clear MetaMask cache and reconnect
- Ensure MetaMask is updated to the latest version
- Try refreshing the page after switching networks

## Development

### Project Structure
```
src/
├── components/          # React components
├── contexts/           # Web3 context and state management
├── contracts/          # Contract ABI
├── hooks/              # Custom React hooks
└── config.js           # Network and contract configuration
```

### Key Files
- `src/config.js` - Network configuration and contract address
- `src/contexts/Web3Context.js` - Web3 connection and contract interaction
- `src/components/Header.js` - Network switching and wallet connection
- `contracts/P2POrderFlow.sol` - Smart contract source code

## Security Notes

- Always verify the contract address before interacting
- Use a dedicated wallet for testing
- Never share your private keys
- Test on Avalanche Fuji testnet before mainnet deployment

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify your MetaMask network configuration
3. Ensure you have sufficient AVAX balance
4. Check the browser console for error messages

## License

This project is open source and available under the MIT License. 