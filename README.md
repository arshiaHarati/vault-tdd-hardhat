# Vault (TDD, Hardhat)

A minimal ETH vault built with TDD. Focus on CEI, custom errors, and clean tests.

## Features
- deposit() with zero-value guard
- withdraw() with InsufficientBalance, CEI, low-level call check
- Events: Deposited, Withdrawn

## Dev
```bash
npm ci
npm run compile
npm test
