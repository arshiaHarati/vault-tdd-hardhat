const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault (TDD) — direct ETH to contract reverts", () => {
  async function deploy() {
    const [_, alice] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy();
    await vault.waitForDeployment();
    return { vault, alice };
  }

  it("sending ETH directly (no deposit) should revert", async () => {
    const { vault, alice } = await deploy();

    await expect(
      alice.sendTransaction({ to: await vault.getAddress(), value: ethers.parseEther("0.1") })
    ).to.be.revertedWithCustomError(vault, "DirectDepositNotAllowed"); 
  });
});
