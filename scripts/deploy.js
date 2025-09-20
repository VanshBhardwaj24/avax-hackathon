const hre = require("hardhat");

async function main() {
  console.log("Deploying P2POrderFlow contract to Avalanche...");

  const P2POrderFlow = await hre.ethers.getContractFactory("P2POrderFlow");
  const p2pOrderFlow = await P2POrderFlow.deploy();

  await p2pOrderFlow.waitForDeployment();

  const address = await p2pOrderFlow.getAddress();
  console.log("P2POrderFlow deployed to:", address);
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", hre.network.config.chainId);
  
  if (hre.network.name === "avalanche") {
    console.log("Block Explorer: https://snowtrace.io/address/" + address);
  } else if (hre.network.name === "fuji") {
    console.log("Block Explorer: https://testnet.snowtrace.io/address/" + address);
  }
  
  console.log("\nDeployment successful! 🎉");
  console.log("Update your src/config.js with this contract address:");
  console.log(`CONTRACT_ADDRESS: "${address}"`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 