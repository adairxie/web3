import hre from "hardhat";
import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("MultiSigWallet", function () {
    async function deployTestContract() {
        const TestContract = await ethers.getContractFactory("TestContract");
        const testContract = await TestContract.deploy()
        return { testContract };
    }

    async function deployMultiSigWallet() {
        const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount, thirdAccount] = await ethers.getSigners();
        const numConfirmationsRequired = 2;

        const multiSigWallet = await MultiSigWallet.deploy([owner, otherAccount, thirdAccount], numConfirmationsRequired);
        return { multiSigWallet };
    }

    it("Deploy multisigwallet", async function () {
        const { multiSigWallet } = await loadFixture(deployMultiSigWallet);
        const { testContract } = await loadFixture(deployTestContract);

        const data = await testContract.getData();

        //await expect(etherWallet.connect(otherAccount).withdraw(1)).to.be.revertedWith("caller is not owner");
        const owners = await multiSigWallet.getOwners();
        const target = owners[1];


        const ONE_GWEI = 1_000_000_000;
        multiSigWallet.submitTransaction(target, ONE_GWEI * ONE_GWEI, data);

    });

    it("Submit transaction", async function () {
        const { multiSigWallet } = await loadFixture(deployMultiSigWallet);
        const { testContract } = await loadFixture(deployTestContract);

        const data = await testContract.getData();

        //await expect(etherWallet.connect(otherAccount).withdraw(1)).to.be.revertedWith("caller is not owner");
        const owners = await multiSigWallet.getOwners();
        const target = owners[1];


        const ONE_GWEI = 1_000_000_000;
        await multiSigWallet.submitTransaction(target, ONE_GWEI, data);

        const count = await multiSigWallet.getTransactionCount()
        console.log('Transaction count', count);
    });

    it("Confirm transaction", async function () {
        const { multiSigWallet } = await loadFixture(deployMultiSigWallet);
        const { testContract } = await loadFixture(deployTestContract);

        const data = await testContract.getData();

        //await expect(etherWallet.connect(otherAccount).withdraw(1)).to.be.revertedWith("caller is not owner");
        const owners = await multiSigWallet.getOwners();
        const target = owners[1];


        const ONE_GWEI = 1_000_000_000;
        await multiSigWallet.submitTransaction(target, ONE_GWEI, data);

        const transactionsCount = await multiSigWallet.getTransactionCount();
        const transactionIndex = transactionsCount - BigInt(1);
        await multiSigWallet.confirmTransaction(transactionIndex);
        const { to, value, data: tdata, executed, numConfirmations } = await multiSigWallet.getTransaction(transactionIndex);
        console.log(
            `Transaction
            to: ${to} 
            value: ${ethers.formatEther(value)}ETH
            data: ${data}
            executed: ${executed}
            numConfirmations: ${numConfirmations}
            `
        );
    });
});