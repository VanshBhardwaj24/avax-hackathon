# PEERFLOW

A decentralized peer-to-peer trading system powered by Avalanche C-Chain, utilizing Solidity smart contracts and React for the interface.

---

## Capabilities

- **Customer Interface**: Explore and purchase listings from vendors  
- **Vendor Interface**: Publish and oversee your product or service listings  
- **Smart Contract Layer**: Safeguarded transaction management with escrow mechanisms  
- **Avalanche Compatibility**: Designed specifically for Avalanche C-Chain networks  

---

## Blockchain Settings

This system is tailored for **Avalanche C-Chain Mainnet**:

- **Chain ID**: 43114 (0xa86a)  
- **Native Token**: AVAX  
- **RPC Endpoint**: https://api.avax.network/ext/bc/C/rpc  
- **Explorer Link**: https://snowtrace.io  

---

## Requirements

- MetaMask browser extension  
- AVAX for network fees and trading  
- Node.js and npm installed locally  

---

## Installation Steps

### 1. Install Dependencies

```bash
npm install
2. Deploy Contract
Option 1: Remix IDE
Open Remix IDE

Create P2POrderFlow.sol and paste contract code

Compile the contract

Under "Deploy", choose "Injected Provider - MetaMask"

Ensure MetaMask is on Avalanche C-Chain

Deploy the contract

Copy the resulting contract address

Option 2: Hardhat (Advanced Users)
Install Hardhat:

bash
Copy code
npm install --save-dev hardhat
Set up hardhat.config.js for Avalanche deployment

Deploy:

bash
Copy code
npx hardhat run scripts/deploy.js --network avalanche
3. Configure Contract Address
Update src/config.js with your deployed contract:

javascript
Copy code
CONTRACT_ADDRESS: "ENTER_YOUR_CONTRACT_ADDRESS"
4. Add Avalanche Network to MetaMask
If MetaMask doesn’t already have Avalanche:

Network Name: Avalanche C-Chain

RPC: https://api.avax.network/ext/bc/C/rpc

Chain ID: 43114

Symbol: AVAX

Explorer: https://snowtrace.io

5. Launch Application
bash
Copy code
npm start
How to Use
Customers
Connect MetaMask (ensure C-Chain network)

Browse listings in the buyer interface

View details of chosen orders

Click "Purchase" to execute a transaction

Confirm in MetaMask

Vendors
Connect MetaMask (C-Chain required)

Switch to the merchant interface

Fill out order creation form

Enter price in AVAX

Click "Publish Order" and approve in MetaMask

Smart Contract Overview
The P2POrderFlow.sol contract provides:

Order submission and tracking

Secure escrow for all transactions

Status monitoring for each order

Basic mechanisms for dispute handling

Transaction Fees
Avalanche C-Chain offers low gas costs (often < $1 USD)

Fees are paid in AVAX

Ensure sufficient balance in your wallet

Troubleshooting
Network Mismatch
Click “Switch Network”

Approve Avalanche C-Chain in MetaMask

Transaction Failures
Confirm enough AVAX for fees

Verify contract address

Ensure MetaMask is on correct network

MetaMask Problems
Clear cache, reconnect wallet

Update MetaMask

Refresh app after switching networks

Development Notes
Folder Layout
bash
Copy code
src/
├── components/      # React UI components
├── contexts/        # Web3 context and state management
├── contracts/       # ABI files
├── hooks/           # Custom React hooks
└── config.js        # Network and contract settings
Core Files
src/config.js → Network and contract info

src/contexts/Web3Context.js → Wallet connection and contract functions

src/components/Header.js → Network switch and wallet UI

contracts/P2POrderFlow.sol → Solidity smart contract

Security Recommendations
Double-check contract addresses before usage

Use separate wallets for testing

Never share private keys

Test on Fuji testnet before mainnet

Support & Assistance
Review troubleshooting guidelines

Confirm MetaMask network

Verify AVAX balance

Check browser console for errors

Licensing
Open-source under MIT License
