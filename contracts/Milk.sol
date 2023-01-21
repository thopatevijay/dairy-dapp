//SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract Milk {
    // Struct to represent a Farmer
    struct Farmer {
        uint256 farmerId;
        string name;
        uint256 milkQuantity;
        uint256 milkQuality;
        uint256 milkCollectorId;
    }

    // Struct to represent a MilkCollection
    struct MilkCollection {
        uint256 milkCollectorId;
        uint256 farmerId;
        uint256 quantity;
        uint256 quality;
        uint256 timestamp;
    }

    // Mapping to store the farmers
    mapping(uint256 => Farmer) public farmers;
    // Mapping to store the milk collections
    mapping(uint256 => MilkCollection) public milkCollections;

    // Counter for assigning unique IDs to farmers
    uint256 public farmerIdCounter = 1;

    // Counter for assigning unique IDs to milk collections
    uint256 public milkCollectionCounter = 1;

    // Function to add a farmer to the contract
    function addFarmer(uint256 milkCollectorId, string memory name) public {
        uint256 farmerId = farmerIdCounter;
        farmerIdCounter++;
        // Create a farmer struct and add it to the farmers mapping
        farmers[farmerId] = Farmer(farmerId, name, 0, 0, milkCollectorId);
    }

    // Function to collect milk from a farmer
    function collectMilk(
        uint256 milkCollectorId,
        uint256 farmerId,
        uint256 quantity,
        uint256 quality
    ) public {
        Farmer storage farmer = farmers[farmerId];
        // Add the collected milk to the farmer's total
        farmer.milkQuantity = quantity;
        farmer.milkQuality = quality;
        // Add the milk collection to the milkCollections mapping
        milkCollections[milkCollectionCounter] = MilkCollection(
            milkCollectorId,
            farmerId,
            quantity,
            quality,
            block.timestamp
        );
        milkCollectionCounter++;
    }
}
