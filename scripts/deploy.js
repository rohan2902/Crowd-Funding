const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const CrowdHelp = await hre.ethers.getContractFactory("CrowdHelp");
  const crowdHelp = await CrowdHelp.deploy();

  await crowdHelp.deployed();

  console.log("CrowdHelp deployed to:", crowdHelp.address);


  const ERC20 = await hre.ethers.getContractFactory("ERC20");
  const eRC20 = await ERC20.deploy();

  await eRC20.deployed();

  console.log("ERC20 deployed to:", eRC20.address);



  const TokenFactory = await hre.ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy();

  await tokenFactory.deployed();

  console.log("TokenFactory deployed to:", tokenFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
