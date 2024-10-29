import inquirer from "inquirer";
import { spawn } from "child_process";
import { displayHeader } from "./src/header.js";

async function main() {
  displayHeader();
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Select an action:",
      choices: [
        { name: "Claim TRWA", value: "trwa" },
        { name: "Minting USDC", value: "usdc" },
      ],
    },
  ]);

  const scriptPath = action === "trwa" ? './src/trwa.js' : './src/usdc.js';
  const child = spawn('node', [scriptPath], { stdio: 'inherit' });

  child.on('error', (error) => {
    console.error(`❌ Error executing script: ${error.message}`);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ Script exited with code ${code}`);
    }
  });
}

main().catch(error => {
  console.error("❌ An error occurred:", error);
});
