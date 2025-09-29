const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault — deposit limits (reverts)", () => {
  async function deploy() {
    const [owner, alice] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy();
    await vault.waitForDeployment();

    await vault.connect(owner).setMinDeposit(ethers.parseEther("0.001")); 
    await vault.connect(owner).setMaxDeposit(ethers.parseEther("10"));   

    return { vault, owner, alice };
  }

  it("reverts if deposit below minDeposit → TooSmallDeposit", async () => {
    const { vault, alice } = await deploy();
    await expect(
      vault.connect(alice).deposit({ value: ethers.parseEther("0.0005") })
    ).to.be.revertedWithCustomError(vault, "TooSmallDeposit");
  });

  it("reverts if deposit above maxDeposit → TooLargeDeposit", async () => {
    const { vault, alice } = await deploy();
    await expect(
      vault.connect(alice).deposit({ value: ethers.parseEther("12") })
    ).to.be.revertedWithCustomError(vault, "TooLargeDeposit");
  });
});
