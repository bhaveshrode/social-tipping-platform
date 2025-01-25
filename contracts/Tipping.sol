// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tipping {
    // Mapping to keep track of balances for each content creator
    mapping(address => uint256) public balances;

    // Event to emit when a tip is sent
    event TipSent(address indexed creator, address indexed sender, uint256 amount);

    // Function to tip a content creator
    function tip(address payable creator) external payable {
        require(msg.value > 0, "Tip amount must be greater than zero");
        balances[creator] += msg.value;
        emit TipSent(creator, msg.sender, msg.value);
        creator.transfer(msg.value); // Transfer the tip to the creator
    }

    // Function to get the balance of a content creator
    function getBalance(address creator) external view returns (uint256) {
        return balances[creator];
    }
}
