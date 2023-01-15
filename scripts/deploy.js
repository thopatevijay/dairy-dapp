const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const MilkContract = await hre.ethers.getContractFactory("Milk");
  const milkContract = await MilkContract.deploy();

  await milkContract.deployed();

  console.log(`${milkContract.signer.address} deployed to ${milkContract.address}`);
  let details = {
    deployer: milkContract.signer.address,
    contract: milkContract.address
  };

  fs.writeFile('details.json', JSON.stringify(details, null, 4), (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Details are saved")
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
