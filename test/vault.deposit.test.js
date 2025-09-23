const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault (TDD) — deposit", () => {
  async function deploy() {
    const [owner, alice] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("contracts/Vault.sol:Vault");
    const vault = await Vault.deploy();
    await vault.waitForDeployment();
    return { vault, owner, alice };
  }

  it("deposit: increases sender balance and emits event", async () => {
    const { vault, alice } = await deploy();
    const amount = ethers.parseEther("1");

    const tx = await vault.connect(alice).deposit({ value: amount });
    await expect(tx).to.emit(vault, "Deposited").withArgs(alice.address, amount);

    expect(await vault.balanceOf(alice.address)).to.equal(amount);
  });
});
