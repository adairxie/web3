import { ethers } from "hardhat";

async function main() {

    const iterableMapping = await ethers.deployContract("IterableMapping");
    await iterableMapping.waitForDeployment();

    const testIterableMap = await ethers.deployContract("TestIterableMap", {
        libraries: {
            IterableMapping: iterableMapping.target,
        },
    });
    await testIterableMap.waitForDeployment();

    await testIterableMap.testIterableMap();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});