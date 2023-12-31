require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    aurora: {
      url: `https://mainnet.aurora.dev`,
      accounts: [process.env.privateKey],
    },
    auroraTestnet: {
      url: `https://testnet.aurora.dev`,
      accounts: [process.env.privateKey],
    },
    fantom: {
      url: `https://rpc.ftm.tools/`,
      accounts: [process.env.privateKey],
    },
    sepolia: {
      url: `https://rpc.sepolia.org`,
      accounts: [process.env.privateKey],
    },
    localhost: {
      url: `http://127.0.0.1:8545`,
      accounts: [process.env.privateKey],
    },
  },
  hardhat: {
    forking: {
      url: process.env.MAINNET_RPC_URL_INFURA,
    },
    chainId: 1,
  },
  solidity: {
    compilers: [
      { version: "0.8.7" },
      { version: "0.7.6" },
      { version: "0.6.6" },
    ],
  },
};
