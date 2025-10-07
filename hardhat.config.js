require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { SEPOLIA_RPC_URL, DEPLOYER_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: {
  compilers: [
    {
      version: "0.8.28",
      settings: {
        optimizer: { enabled: false, runs: 200 }, // اگر قبلا optimizer=true بوده، به true تغییر بده
        metadata: { bytecodeHash: "none" } // حالا اول "none" امتحان کن؛ اگر نشد "ipfs" رو تست کن
        }
      }
    ]
  },
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL || "https://rpc.sepolia.org",
      chainId: 11155111,
      accounts: DEPLOYER_PRIVATE_KEY ? [DEPLOYER_PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY || "",
    },
  },
  sourcify: {
    enabled: false, // می‌تونی true هم بذاری ولی الان مهم نیست
  },
};
