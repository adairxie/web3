import { ethers } from "hardhat";

async function main() {
    const ONE_GWEI = 1_000_000_000;
    const etherWallet = await ethers.deployContract("EtherWallet", [], {
        value: ONE_GWEI,
    });

    await etherWallet.waitForDeployment();

    console.log(
        `EtherWallet with ${ethers.formatEther(
            ONE_GWEI
        )}ETH deployed to ${etherWallet.target}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});