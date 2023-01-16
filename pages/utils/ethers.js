import { ethers } from "ethers";
import { abi } from "../../artifacts/contracts/Milk.sol/Milk.json"
import { deployer, contract } from "../../details.json";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
let signer = provider.getSigner();
let contractInstance = new ethers.Contract(contract, abi, signer);

module.exports = { contractInstance, deployer };