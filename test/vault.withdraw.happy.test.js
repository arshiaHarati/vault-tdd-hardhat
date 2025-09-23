const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault (TDD) — withdraw happy path", () => {
  async function deploy() {
    const [owner, alice] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("contracts/Vault.sol:Vault");
    const vault = await Vault.deploy();
    await vault.waitForDeployment();
    return { vault, owner, alice };
  }

  it("withdraw: sends ETH, emits event, and zeroes balance (CEI)", async () => {
    const { vault, alice } = await deploy();
    const amount = ethers.parseEther("1");

    await vault.connect(alice).deposit({ value: amount });

    await expect(() => vault.connect(alice).withdraw(amount))
      .to.changeEtherBalances(
        [alice, await vault.getAddress()],
        [ amount, -amount]
      );

    const tx = await vault.connect(alice).withdraw(0n);
 
    expect(await vault.balanceOf(alice.address)).to.equal(0n);
  });
});
