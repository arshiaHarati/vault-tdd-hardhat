const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault — deposit limits (happy path)", () => {
  async function deploy() {
    const [owner, alice] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy();
    await vault.waitForDeployment();

    await vault.connect(owner).setMinDeposit(ethers.parseEther("0.001"));
    await vault.connect(owner).setMaxDeposit(ethers.parseEther("10"));
    return { vault, owner, alice };
  }

  it("accepts deposit within [min,max] and updates balance/internalTotal", async () => {
    const { vault, alice } = await deploy();
    const amount = ethers.parseEther("0.5");

    await expect(vault.connect(alice).deposit({ value: amount }))
      .to.emit(vault, "Deposited").withArgs(alice.address, amount);

    expect(await vault.balanceOf(alice.address)).to.equal(amount);
    expect(await vault.internalTotal()).to.equal(amount); 
  });
});
