require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  defaultNetwork: 'goerli',
  networks: {
    ganache: {
      url: 'http://localhost:8545'
    },
    goerli: {
      url: `https://goerli.infura.io/v3/ee57b3bb82a14b27b3951b499c708b5c`,
      accounts: [`0x` + process.env.PRIVATE_KEY],
    }
  },
  solidity: "0.8.17",
};
