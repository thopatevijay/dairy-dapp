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

    // Struct to update ProductionUpdate in BatchByProcessor
    struct ProductionUpdate {
        bool isInProduction;
        uint256 quantity;
        uint256 quality;
        uint256 productionTime;
        bool isSentToDistributor;
    }

    // Struct to update DistributorUpdate in BatchByProcessor
    struct DistributorUpdate {
        bool accepted;
        uint256 updatedTime;
        uint256 quality;
    }

    // Struct to update RetailerUpdate in BatchByProcessor
    struct RetailerUpdate {
        bool accepted;
        uint256 updatedTime;
        uint256 quality;
    }

    // Struct to represent a Batch by milk collector
    struct BatchByProcessor {
        uint256 batchId;
        uint256 batchCreatedTime;
        uint256[] collectorBatchesIds;
        uint256 quantity;
        uint256 quality;
        ProductionUpdate productionStatus;
        DistributorUpdate distributorStatus;
        RetailerUpdate retailerStatus;
    }

    // Mapping to store the farmers
    mapping(uint256 => Farmer) public farmers;

    // Mapping to store the milk collections
    mapping(uint256 => MilkCollection) public milkCollections;

    // Mapping to store the batches
    mapping(uint256 => BatchByCollector) public collectorBatches;

    // Maping to store the processor batches
    mapping(uint256 => BatchByProcessor) public processorBatches;

    // Counter for assigning unique IDs to farmers
    uint256 public farmerIdCounter = 1;

    // Counter for assigning unique IDs to milk collections
    uint256 public milkCollectionCounter = 1;

    // Counter for assigning unique IDs to collectorBatches
    uint256 public collectorBatchIdCounter = 1;

    // Counter for assigning unique IDs to processorBatches
    uint256 public processorBatchIdCounter = 1;

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

    // Function to create a batch by milk processor
    function createProcessorBatch(
        uint256[] memory collectorBatchesIds,
        uint256 quantity,
        uint256 quality
    ) public {
        uint256 batchId = processorBatchIdCounter;
        processorBatchIdCounter++;

        ProductionUpdate memory productionStatus = ProductionUpdate(
            false,
            0,
            0,
            0,
            false
        );
        DistributorUpdate memory distributorStatus = DistributorUpdate(
            false,
            0,
            0
        );
        RetailerUpdate memory retailerStatus = RetailerUpdate(false, 0, 0);

        processorBatches[batchId] = BatchByProcessor(
            batchId,
            block.timestamp,
            collectorBatchesIds,
            quantity,
            quality,
            productionStatus,
            distributorStatus,
            retailerStatus
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

    // Function to get collections ID's from processors batches
    function getProcessorBatchCollectionIds(uint256 batchId)
        public
        view
        returns (uint256[] memory)
    {
        return processorBatches[batchId].collectorBatchesIds;
    }

    // Function to update the accepted status of milk collector batch
    function updateMilkCollectorBatchStatus(uint256 batchId, bool newStatus)
        public
    {
        BatchByCollector storage batch = collectorBatches[batchId];
        batch.accepted = newStatus; //update the accepted status
        batch.statusUpdateTime = block.timestamp; // update the timestamp
    }

    //.....Events..........

    // Event for Production Update
    event ProductionUpdateEvent(
        uint256 indexed batchId,
        bool isInProduction,
        uint256 quantity,
        uint256 quality,
        uint256 productionTime
    );

    // Event for Distributor Update
    event DistributorUpdateEvent(
        uint256 indexed batchId,
        bool accepted,
        uint256 updatedTime,
        uint256 quality
    );

    // Event for Retailer Update
    event RetailerUpdateEvent(
        uint256 indexed batchId,
        bool accepted,
        uint256 updatedTime,
        uint256 quality
    );

    // Event for sendtToDistributor update
    event SendToDistributorEvent(
        uint256 indexed batchId,
        bool isSentToDistributor
    );

    // Function to update production status
    function updateProductionStatus(
        uint256 batchId,
        bool isInProduction,
        uint256 quality,
        uint256 quantity
    ) public {
        BatchByProcessor storage batch = processorBatches[batchId];
        batch.productionStatus.isInProduction = isInProduction;
        batch.productionStatus.quantity = quantity;
        batch.productionStatus.quality = quality;
        batch.productionStatus.productionTime = block.timestamp;
        emit ProductionUpdateEvent(
            batchId,
            isInProduction,
            quantity,
            quality,
            block.timestamp
        );
    }

    // Function to update distributor status
    function updateDistributorStatus(
        uint256 batchId,
        bool accepted,
        uint256 quality
    ) public {
        BatchByProcessor storage batch = processorBatches[batchId];
        batch.distributorStatus.accepted = accepted;
        batch.distributorStatus.updatedTime = block.timestamp;
        batch.distributorStatus.quality = quality;
        emit DistributorUpdateEvent(
            batchId,
            accepted,
            block.timestamp,
            quality
        );
    }

    // Function to update retailer status
    function updateRetailerStatus(
        uint256 batchId,
        bool accepted,
        uint256 quality
    ) public {
        BatchByProcessor storage batch = processorBatches[batchId];
        batch.retailerStatus.accepted = accepted;
        batch.retailerStatus.updatedTime = block.timestamp;
        batch.retailerStatus.quality = quality;
        emit RetailerUpdateEvent(batchId, accepted, block.timestamp, quality);
    }

    // Function to send batch to distributor
    function sendToDistributor(uint256 batchId, bool isSentToDistributor)
        public
    {
        BatchByProcessor storage batch = processorBatches[batchId];
        batch.productionStatus.isSentToDistributor = isSentToDistributor;
        emit SendToDistributorEvent(batchId, isSentToDistributor);
    }
}
