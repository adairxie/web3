import { ethers } from "hardhat";

async function main() {
    const testContract = await ethers.deployContract("TestContract", []);

    await testContract.waitForDeployment();

    console.log(
        `TestContract deployed to ${testContract.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});