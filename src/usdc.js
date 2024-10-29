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

const contractAddress = "0x6Ac3aB54Dc5019A2e57eCcb214337FF5bbD52897";
const abi = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function mintUSDC(wallet) {
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const address = wallet.address;
  const mintAmount = ethers.parseUnits("1000000000", 6);
  console.log(chalk.green(`💰 Address: ${address}`));

  try {
    console.log(chalk.yellow("➡️  Sending transaction to mint USDC..."));
    const tx = await contract.mint(address, mintAmount, {
      gasPrice: gasPrice, 
    });

    const transactionHash = tx.hash;
    console.log(chalk.blue("✅ Transaction sent!"));
    console.log(`🔗 View on Explorer: ${chalk.cyan(`https://sepolia.basescan.org/tx/${transactionHash}`)}`);

  } catch (error) {
    if (error.message.includes("insufficient funds")) {
      console.warn(chalk.yellow("⏳ Insufficient funds to mint USDC."));
    } else {
      console.error(chalk.red("❌ Transaction failed:"), error.message);
    }
  }
}

async function main() {
  for (const privateKey of privateKeys) {
    const wallet = new ethers.Wallet(privateKey.trim(), provider);
    await mintUSDC(wallet);
  }

  console.log(chalk.magenta("⏰ Waiting 65 minutes before retrying..."));
  setTimeout(() => {
    main();
  }, 65 * 60 * 1000);
}

main().catch(error => {
  console.error(chalk.red("❌ Error executing mintUSDC:"), error);
  process.exit(1);
});
