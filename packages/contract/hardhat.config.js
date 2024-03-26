require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  networks: {
    zKatana: {
      url: "https://rpc.startale.com/zkatana",
      chainId: 1261120,
      accounts: [privateKey],
    },
  },
  solidity: "0.8.9",
};