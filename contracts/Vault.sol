// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

error InsufficientBalance();
error WithdrawFailed();
error ZeroValue();
error ZeroAmount();
error DirectDepositNotAllowed();


contract Vault is ReentrancyGuard {

    mapping(address => uint256) private balances;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    modifier nonZero(uint256 amount) {
        if (amount == 0) revert ZeroAmount();
        _;
    }

    function deposit() public payable nonZero(msg.value) {
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function balanceOf(address user) external view returns (uint256) {
        return balances[user];
    }

    function withdraw(uint256 amount) external nonReentrant nonZero(amount) {
        uint256 bal = balances[msg.sender];
        if (amount > bal) revert InsufficientBalance();
        balances[msg.sender] = bal - amount;

        (bool ok, ) = msg.sender.call{value: amount}("");
        if (!ok) revert WithdrawFailed();
        emit Withdrawn(msg.sender, amount);
    }

    receive() external payable {
        revert DirectDepositNotAllowed();
    }
    
    fallback() external payable {
        revert DirectDepositNotAllowed();
    }
}