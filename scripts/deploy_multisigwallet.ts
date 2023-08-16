import { ethers } from "hardhat";
import { eth } from "web3";

async function main() {
    const multiSigWallet = await ethers.deployContract("MultiSigWallet", [["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"], 2]);

    await multiSigWallet.waitForDeployment();

    console.log(`MutliSigWallet deployed to ${multiSigWallet.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});