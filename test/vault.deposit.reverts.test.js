const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault (TDD) — deposit reverts", () => {
  async function deploy() {
    const [owner, alice] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("contracts/Vault.sol:Vault");
    const vault = await Vault.deploy();
    await vault.waitForDeployment();
    return { vault, owner, alice };
  }

  it("deposit(0): reverts with ZeroAmount()", async () => {
    const { vault, alice } = await deploy();

    await expect(
      vault.connect(alice).deposit({ value: 0n })
    ).to.be.revertedWithCustomError(vault, "ZeroAmount");
  });
});
