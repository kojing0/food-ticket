require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  networks: {
    zKyoto: {
      url: "https://rpc.startale.com/zkyoto",
      chainId: 6038361,
      accounts: [process.env.PRIVATE_KEY],
    },
    // sepolia: {
    //   url: process.env.STAGING_ALCHEMY_KEY,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
  solidity: "0.8.9",
};