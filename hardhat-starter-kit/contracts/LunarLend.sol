// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// 3. Interfaces, Libraries, Contracts, Errors
//error error_notenougheth();
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

//Errors
error Not_Owner();
error Insufficient_Balance();

/**@title Lunar Lend Main Contract
 * @author Stackaccount1
 * @notice This is a contract to deposit ETH and be returned WETH, a chainlink VRF counts time,
 * @dev This implements price feeds as our library
 */

//WETH Contract Deposit ETH, Able to withdraw WETH, Upon Withdraw Account Is In Borrow Mode Account Reduced at 8% per year fee,
//  No liquidation function ETH TO ETH  ust return Weth to Eth position will be reduced, Goverance token printed to borrowers and lenders,
//  Later -> Deposit funds, choose lend func, get 3.5% per year to match max of 3.5% pool or less

// Steps to Complete:
//WETH Working correctly as ERC20
//Chainlink VRF Working Correctly as Mock to deduct balance,
//Distribute Litquidity token seperate ERC20 into the contract

//constructor
//Type Declarations
// *price converter
//State Variables
//Events
//Modifiers
//Functions
///constructor
//recieve
//fallback
//external
//public

//WETH9

contract LunarLend {
    string public name = "Wrapped Ether";
    string public symbol = "WETH";
    uint8 public decimals = 18;

    event Approval(address indexed src, address indexed guy, uint256 wad);
    event Transfer(address indexed src, address indexed dst, uint256 wad);
    event Deposit(address indexed dst, uint256 wad);
    event Withdrawal(address indexed src, uint256 wad);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    receive() external payable {
        deposit();
    }

    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 wad) public {
        require(balanceOf[msg.sender] >= wad, "Insufficient Balance");
        balanceOf[msg.sender] -= wad;
        payable(msg.sender).transfer(wad);
        emit Withdrawal(msg.sender, wad);
    }

    function totalSupply() public view returns (uint256) {
        return address(this).balance;
    }

    function approve(address guy, uint256 wad) public returns (bool) {
        allowance[msg.sender][guy] = wad;
        emit Approval(msg.sender, guy, wad);
        return true;
    }

    function transfer(address dst, uint256 wad) public returns (bool) {
        return transferFrom(msg.sender, dst, wad);
    }

    function transferFrom(
        address src,
        address dst,
        uint256 wad
    ) public returns (bool) {
        require(balanceOf[src] >= wad, "Insufficient Balance");

        if (src != msg.sender && allowance[src][msg.sender] != type(uint256).max) {
            require(allowance[src][msg.sender] >= wad);
            allowance[src][msg.sender] -= wad;
        }

        balanceOf[src] -= wad;
        balanceOf[dst] += wad;

        emit Transfer(src, dst, wad);

        return true;
    }

    function myBalance() public view returns (uint256) {
        return balanceOf[msg.sender];
    }
}
