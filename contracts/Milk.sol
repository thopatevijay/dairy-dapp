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

    // Struct to represent a Batch by milk collector
    struct BatchByCollector {
        uint256 batchId;
        uint256 collectorId;
        uint256 batchCreatedTime;
        uint256[] collectionIds;
        uint256 quantity;
        uint256 quality;
        bool accepted;
        uint256 statusUpdateTime;
    }

    // Mapping to store the farmers
    mapping(uint256 => Farmer) public farmers;

    // Mapping to store the milk collections
    mapping(uint256 => MilkCollection) public milkCollections;

    // Mapping to store the batches
    mapping(uint256 => BatchByCollector) public collectorBatches;

    // Counter for assigning unique IDs to farmers
    uint256 public farmerIdCounter = 1;

    // Counter for assigning unique IDs to milk collections
    uint256 public milkCollectionCounter = 1;

    // Counter for assigning unique IDs to collectorBatches
    uint256 public collectorBatchIdCounter = 1;

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

    // Function to create a batch by milk collectors
    function createMilkCollectorBatch(
        uint256 collectorId,
        uint256[] memory collectionIds,
        uint256 quantity,
        uint256 quality
    ) public {
        // Create a batch struct and add it to the batches mapping
        uint256 batchId = collectorBatchIdCounter;
        collectorBatchIdCounter++;
        collectorBatches[batchId] = BatchByCollector(
            batchId,
            collectorId,
            block.timestamp,
            collectionIds,
            quantity,
            quality,
            false,
            block.timestamp
        );
    }

    // Function to get collections ID's from batches
    function getBatchCollectionIds(uint256 batchId)
        public
        view
        returns (uint256[] memory)
    {
        return collectorBatches[batchId].collectionIds;
    }

    // Function to update the accepted status of milk collector batch
    function updateMilkCollectorBatchStatus(uint256 batchId, bool newStatus)
        public
    {
        BatchByCollector storage batch = collectorBatches[batchId];
        batch.accepted = newStatus; //update the accepted status
        batch.statusUpdateTime = block.timestamp; // update the timestamp
    }
}
