const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

import { TOKEN } from "../constants/index";

async function main() {
  const CrowdFundContract = await ethers.getContractFactory("CrowdFund");

  const deployedCrowdFundContract = await CrowdFundContract.deploy();

  await deployedCrowdFundContract.deployed();

  console.log("CrowdFund Contract Address:", deployedCrowdFundContract.address);

  console.log("Sleeping.....");
  await sleep(40000);

  await hre.run("verify:verify", {
    address: deployedCrowdFundContract.address,
    constructorArguments: [TOKEN],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
