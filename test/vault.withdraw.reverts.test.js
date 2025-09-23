const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault (TDD) — withdraw reverts", () => {
  async function deploy() {
    const [owner, alice] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("contracts/Vault.sol:Vault");
    const vault = await Vault.deploy();
    await vault.waitForDeployment();
    return { vault, owner, alice };
  }

  it("withdraw: reverts if amount > balance (custom error)", async () => {
    const { vault, alice } = await deploy();
    await expect(vault.connect(alice).withdraw(1n))
      .to.be.revertedWithCustomError(vault, "InsufficientBalance");
  });
});
