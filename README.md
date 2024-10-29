# RWA Auto Claim Bot

This bot is designed to help you quickly and efficiently achieve Tier Diamond by automatically claiming TRWA every 65 minutes.

## Features

- **Automated Claims**: Automatically claim TRWA at set intervals.
- **Multi-Wallet Support**: Easily manage multiple wallets by entering them in the configuration.
- **Easy Setup**: Quick installation and configuration to get started without hassle.

## Requirements

- **Node.js**
- **NPM**

## How to Use

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/0xAlvi/rwa-auto-claim.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd rwa-auto-claim
   ```

3. **Install the Required Packages:**
   ```bash
   npm install
   ```

4. **Configure Your Wallets:**
   - Create a `.env` file in the root of the project.
   - Input your private keys in the `.env` file using the following format:
     ```
     PRIVATE_KEY=wallet1,wallet2,wallet3,wallet4
     ```

## How to Run

To start the bot, use the following command:
```bash
node index.js
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
