require("dotenv").config({ path: __dirname + "/.env.local" }); // When deploying -- be careful about this path..
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("@nomicfoundation/hardhat-toolbox");

// console.log(process.env.INFURA_API_KEY);
// console.log(process.env.PRIVATE_KEY);

module.exports = {
  solidity: "0.8.17",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000000,
    },
  },
  mocha: {
    timeout: 90000,
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      blockGasLimit: 18800000,
      chainId: 31337,
    },
    // goerli: {
    //   url: "https://eth-goerli.g.alchemy.com/v2/skKE8y6WXLQH7RMUHzPApGbfnn7UzL-7",
    //   accounts: ['7f1afbafd9b608280f63d518b231deb6f1e7cf9a0ca92b5eab144d400013ced2'],
      
    // },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/OViClOjzqtBOkcUxfFv4Pe6WQ0MHqecK",
      accounts: ['dde6e58290078568ded982247d47a0e33dbfe8ccb4ffcc7d085916476f504ac7'],
    },

  },
};

/**
 * guide: https://docs.palm.io/HowTo/Deploy-using-Hardhat/ - as redirected by Infura (to deploy via HardHat)
 * $ npx hardhat compile
 * $ npx hardhat --network goerli_testnet deploy
Nothing to compile
Contract deployed to address: 0xB2B305a50121d6acC8c0F8951a6cdb41d3bB0C6D
deploying "CrowdHelp" (tx: 0xe7a0301eae21ef759c24c188d2554d538cbe5e11d3ea1b9c6c385862d38df927)...: deployed at 0x5a61c16165e797bb770887F339f9DCb6608dce02 with 2316759 gas
 
  new deploy..
  eaf842956c36444c8aaf54163a47e0d2
367d65fef68348fd92b6ba50e22b9bd63d45c7cf8c72072cedb6b8ae6ba7f8fc
Nothing to compile
Contract deployed to address: 0xB2B305a50121d6acC8c0F8951a6cdb41d3bB0C6D
reusing "CrowdHelp" at 0x5a61c16165e797bb770887F339f9DCb6608dce02
*/
