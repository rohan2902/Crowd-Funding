// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC20 {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _value
    ) internal {
        require(_to != address(0), "Transfer to zero address is not allowed");
        require(
            balanceOf[_from] >= _value,
            "Insufficient balance to transfer"
        );

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(_from, _to, _value);
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool) {
        require(
            _value <= allowance[_from][msg.sender],
            "Insufficient allowance"
        );

        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function increaseAllowance(address _spender, uint256 _addedValue)
        public
        returns (bool)
    {
        allowance[msg.sender][_spender] += _addedValue;

        emit Approval(msg.sender, _spender, allowance[msg.sender][_spender]);

        return true;
    }

    function decreaseAllowance(address _spender, uint256 _subtractedValue)
        public
        returns (bool)
    {
        uint256 currentAllowance = allowance[msg.sender][_spender];
        require(
            currentAllowance >= _subtractedValue,
            "Decreased allowance below zero"
        );

        allowance[msg.sender][_spender] = currentAllowance - _subtractedValue;

        emit Approval(msg.sender, _spender, allowance[msg.sender][_spender]);

        return true;
    }

    function _mint(address _account, uint256 _amount) internal {
        require(_account != address(0), "Mint to zero address is not allowed");

        totalSupply += _amount;
        balanceOf[_account] += _amount;

        emit Transfer(address(0), _account, _amount);
    }
}
