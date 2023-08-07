import hre from "hardhat";
import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("EtherWallet", function () {
    describe("Deployment", function () {
        it("Balance should be zero", async function () {
            const EtherWallet = await ethers.getContractFactory("EtherWallet");
            const etherWallet = await EtherWallet.deploy();

            expect(await etherWallet.getBalance()).to.equal(0);
        });

        it("Balance should be equal to one gwei", async function () {
            const ONE_GWEI = 1_000_000_000;
            const EtherWallet = await ethers.getContractFactory("EtherWallet");
            const etherWallet = await EtherWallet.deploy({ value: ONE_GWEI });

            expect(await etherWallet.getBalance()).to.equal(ONE_GWEI);
        })
    });

    async function deployEtherWalletWithOneGwei() {
        const ONE_GWEI = 1_000_000_000;
        const EtherWallet = await ethers.getContractFactory("EtherWallet");
        const etherWallet = await EtherWallet.deploy({ value: ONE_GWEI });
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
        return { etherWallet, owner, otherAccount };
    }
    describe("Withdraw", function () {
        it("Should revert with the right error if called from another account", async function () {
            const { etherWallet, owner, otherAccount } = await loadFixture(deployEtherWalletWithOneGwei);
            await expect(etherWallet.connect(otherAccount).withdraw(1)).to.be.revertedWith("caller is not owner");
        });
        it("Should balance equal to 1Gwei - 1 after with 1 wei", async function () {
            const { etherWallet } = await loadFixture(deployEtherWalletWithOneGwei);

            const ONE_GWEI = 1_000_000_000;
            await etherWallet.withdraw(1);
            expect(await etherWallet.getBalance()).to.be.equal(ONE_GWEI - 1);
        });
    });
});