// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

error InsufficientBalance();
error WithdrawFailed();
error ZeroValue();
error ZeroAmount();
error DirectDepositNotAllowed();
error TooSmallDeposit();
error TooLargeDeposit();
error OnlyOwner();


contract Vault is ReentrancyGuard {

    mapping(address => uint256) private balances;

    uint256 private _minDeposit;
    uint256 private _maxDeposit;
    uint256 private _internalTotal;
    address public owner;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event ConfigUpdated(bytes32 key, uint256 value);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyOwner();
        _;
    }

    modifier nonZero(uint256 amount) {
        if (amount == 0) revert ZeroAmount();
        _;
    }
    function setMinDeposit(uint256 newValue) external onlyOwner {
        _minDeposit = newValue;
        emit ConfigUpdated("minDeposit", newValue);
    }
    function setMaxDeposit(uint256 newValue) external onlyOwner {
        _maxDeposit = newValue;
        emit ConfigUpdated("maxDeposit", newValue);
    }

    function deposit() external payable nonZero(msg.value) {
        if (_minDeposit != 0 && msg.value < _minDeposit) revert TooSmallDeposit();
        if (_maxDeposit != 0 && msg.value > _maxDeposit) revert TooLargeDeposit();
        balances[msg.sender] += msg.value;
        _internalTotal += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external nonReentrant nonZero(amount) {
        uint256 bal = balances[msg.sender];
        if (amount > bal) revert InsufficientBalance();
        balances[msg.sender] = bal - amount;
        _internalTotal -= amount;

        (bool ok, ) = msg.sender.call{value: amount}("");
        if (!ok) revert WithdrawFailed();
        emit Withdrawn(msg.sender, amount);
    }
    
    function getMinDeposit() external view returns(uint256) {return _minDeposit;}
    function getMaxDeposit() external view returns(uint256) {return _maxDeposit;}
    function internalTotal() external view returns(uint256) {return _internalTotal;}
    function balanceOf(address user) external view returns(uint256) {return balances[user];}

    receive() external payable {revert DirectDepositNotAllowed();}
    fallback() external payable {revert DirectDepositNotAllowed();}
}