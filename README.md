# Vault TDD Hardhat

A secure smart contract vault for ETH deposits and withdrawals, built with **Test-Driven Development (TDD)** using Hardhat. Includes strong security patterns (CEI, ReentrancyGuard) and configurable deposit limits.

## Features
- Secure deposit & withdraw with custom errors
- Min/Max deposit enforcement
- Prevent direct ETH transfers
- Owner-only configuration
- Full test suite with Hardhat & Chai
- Automated CI/CD with GitHub Actions

## Getting Started
```bash
git clone https://github.com/arshiaHarati/vault-tdd-hardhat.git
cd vault-tdd-hardhat
npm install
