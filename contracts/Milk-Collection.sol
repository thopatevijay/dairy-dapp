//SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

// This is the basic implementation for milkCollection.
contract MilkCollection {

    struct Farmer {
        uint id;
        string name;
        uint milkAmount;
        uint milkQuality;
    }

    mapping(uint => Farmer) public farmers;

    event FarmerAdded(uint id, string name);
    event MilkCollected(uint id, uint amount, uint quality);

    uint public farmerIdCounter = 1;

    function addFarmer(string memory name) public {
        uint id = farmerIdCounter;
        farmerIdCounter++;
        farmers[id] = Farmer(id, name, 0, 0);
        emit FarmerAdded(id, name);
    }

    function collectMilk(uint id, uint amount, uint quality) public {
        Farmer storage farmer = farmers[id];
        require(quality < 8, "Milk quality does not meet");
        farmer.milkAmount = amount;
        farmer.milkQuality = quality;
        emit MilkCollected(id, amount, quality);
    }

    function getFarmer(uint id) public view returns (uint, string memory, uint) {
        
        Farmer storage farmer = farmers[id];
        return (farmer.id, farmer.name, farmer.milkAmount);
    }
}
