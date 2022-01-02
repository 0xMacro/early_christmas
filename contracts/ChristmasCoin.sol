// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

 contract ChristmasCoin is ERC20 {

  uint256 public christmas = 1640390400;
  uint256 public INITIAL_SUPPLY;
  address public owner;

  constructor(address _owner) ERC20('ChristmasCoin', 'HoHoHo') {
    owner = _owner;
    INITIAL_SUPPLY = 1000000 * (10**uint256(decimals()));
    _mint(owner, INITIAL_SUPPLY);
    emit Transfer(address(0), owner, INITIAL_SUPPLY);
  }
  
  function transfer(address _to, uint256 _value) override public lockTokens returns(bool) {
    return super.transfer(_to, _value);
  }

  // Prevent the initial owner from transferring tokens before Christmas
  modifier lockTokens() {
    if (msg.sender == owner) {
        require(block.timestamp > christmas, "Not until Christmas!");
      _;
    } else {
     _;
    }
  } 
}