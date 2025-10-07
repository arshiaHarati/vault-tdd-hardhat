---

# Vault TDD Hardhat

A secure smart contract vault for ETH deposits and withdrawals, built with Test-Driven Development (TDD) using Hardhat. Includes strong security patterns (CEI, ReentrancyGuard) and configurable deposit limits.

---

## Features

* **Secure deposit & withdraw** with custom errors
* **Min/Max deposit enforcement**
* **Prevent direct ETH transfers**
* **Owner-only configuration**
* **Full test suite** with Hardhat & Chai
* **Automated CI/CD** with GitHub Actions

---

## Deployed Contract

The Vault contract is deployed on **Sepolia testnet**:

**Contract Address:** [`0x86E694ae1d2066927A0b58F7e7bff772BB1A63b8`](https://sepolia.etherscan.io/address/0x86E694ae1d2066927A0b58F7e7bff772BB1A63b8)

You can easily interact with it via Etherscan Sepolia or using Hardhat/ethers.js scripts.

---

## Getting Started

```bash
git clone https://github.com/arshiaHarati/vault-tdd-hardhat.git
cd vault-tdd-hardhat
npm install
```

---

## Interacting with the Contract

* **Deposit ETH:** Call `deposit()` function
* **Withdraw ETH:** Call `withdraw(amount)` function
* **Owner Config:** Use `setMinDeposit()` and `setMaxDeposit()` to update limits
* **Read Info:** Use `getMinDeposit()`, `getMaxDeposit()`, `balanceOf(address)` and `internalTotal()`
