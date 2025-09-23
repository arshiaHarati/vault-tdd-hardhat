// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
error InsufficientBalance();
error WithdrawFailed();

contract Vault {
    mapping(address => uint256) private balances;

    event Deposited(address indexed user,uint amount);
    event Withdrawn(address indexed user, uint amount);

    function deposit() public payable {
        require(msg.value > 0,"0 value");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }
    function balanceOf(address user) external view returns (uint256) {
        return balances[user];
    }


    function withdraw(uint256 amount) external {
    uint256 bal = balances[msg.sender];
    if (amount > bal) revert InsufficientBalance();
        balances[msg.sender] = bal - amount;

        (bool ok, ) = msg.sender.call{value: amount}("");
        if (!ok) revert WithdrawFailed();
        emit Withdrawn(msg.sender, amount);
    }
 
}