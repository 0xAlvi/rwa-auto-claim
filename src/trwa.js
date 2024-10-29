import { ethers } from "ethers"; 
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config(); 

if (!process.env.PRIVATE_KEY) {
  console.error(chalk.red("❌ Missing required environment variable: PRIVATE_KEY."));
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider("https://base-sepolia-rpc.publicnode.com");
const privateKeys = process.env.PRIVATE_KEY.split(',');
const gasPrice = ethers.parseUnits('5', 'gwei'); 

const contractAddress = "0x219BA210Ef31613390df886763099D0eD35aa6B8";
const abi = [
  {
    inputs: [],
    name: "claimTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function claimTokens(wallet) {
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const address = wallet.address; 

  console.log(chalk.green(`💰 Address: ${address}`));

  try {
    console.log(chalk.yellow("➡️  Sending transaction to claim tokens..."));
    const tx = await contract.claimTokens({
      gasPrice: gasPrice, 
    });

    const transactionHash = tx.hash; 
    console.log(chalk.blue("✅ Transaction sent!"));
    console.log(`🔗 View on Explorer: ${chalk.cyan(`https://sepolia.basescan.org/tx/${transactionHash}`)}`);

  } catch (error) {
    if (error.message.includes("Claim available only once per hour")) {
      console.warn(chalk.yellow("⏳ Already claimed TRWA. Please wait for the next hour."));
    } else {
      console.error(chalk.red("❌ Transaction failed:"), error.message);
    }
  }
}

async function main() {
  for (const privateKey of privateKeys) {
    const wallet = new ethers.Wallet(privateKey.trim(), provider);
    await claimTokens(wallet);
  }

  console.log(chalk.magenta("⏰ Waiting 65 minutes before retrying..."));
  setTimeout(() => {
    main(); 
  }, 65 * 60 * 1000);
}

main().catch(error => {
  console.error(chalk.red("❌ Error executing claimTokens:"), error);
  process.exit(1);
});
