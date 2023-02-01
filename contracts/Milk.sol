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

    struct InProduction {
        bool isInProduction;
        uint256 quantity;
        uint256 quality;
        uint256 updatedTime;
    }

    struct ProductionDone {
        bool isProductionDone;
        uint256 quantity;
        uint256 quality;
        uint256 updatedTime;
    }

    struct MoveToDistributor {
        bool isSentToDistributor;
        uint256 updatedTime;
    }

    struct ProductionUpdate {
        InProduction inProduction;
        ProductionDone productionDone;
        MoveToDistributor moveToDistributor;
    }

    // Struct to update DistributorUpdate in BatchByProcessor
    struct AtDistributor {
        bool accepted;
        uint256 quantity;
        uint256 quality;
        uint256 updatedTime;
    }

    struct MoveToRetailer {
        bool isSentToRetailer;
        uint256 updatedTime;
    }

    struct DistributorUpdate {
        AtDistributor atDistributor;
        MoveToRetailer moveToRetailer;
    }

    // Struct to update RetailerUpdate in BatchByProcessor
    struct RetailerUpdate {
        bool accepted;
        uint256 quantity;
        uint256 quality;
        uint256 updatedTime;
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

    // Struct to represent a product by batch ID
    struct Product {
        uint256 productId;
        uint256 batchId;
    }

    // Mapping to store the farmers
    mapping(uint256 => Farmer) public farmers;

    // Mapping to store the milk collections
    mapping(uint256 => MilkCollection) public milkCollections;

    // Mapping to store the batches
    mapping(uint256 => BatchByCollector) public collectorBatches;

    // Maping to store the processor batches
    mapping(uint256 => BatchByProcessor) public processorBatches;

    // Mapping to store the product ids
    mapping(uint256 => Product) public products;

    // Counter for assigning unique IDs to farmers
    uint256 public farmerIdCounter = 1;

    // Counter for assigning unique IDs to milk collections
    uint256 public milkCollectionCounter = 1;

    // Counter for assigning unique IDs to collectorBatches
    uint256 public collectorBatchIdCounter = 1;

    // Counter for assigning unique IDs to processorBatches
    uint256 public processorBatchIdCounter = 1;

    // Event for add farmer
    event AddFarmerEvent(uint256 indexed milkCollectorId, string name);

    // Function to add a farmer to the contract
    function addFarmer(uint256 milkCollectorId, string memory name) public {
        uint256 farmerId = farmerIdCounter;
        farmerIdCounter++;
        // Create a farmer struct and add it to the farmers mapping
        farmers[farmerId] = Farmer(farmerId, name, 0, 0, milkCollectorId);
        emit AddFarmerEvent(milkCollectorId, name);
    }

    // Event for collect milk
    event CollectMilkEvent(
        uint256 indexed milkCollectorId,
        uint256 farmerId,
        uint256 quantity,
        uint256 quality,
        uint256 timestamp
    );

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

        emit CollectMilkEvent(
            milkCollectorId,
            farmerId,
            quantity,
            quality,
            block.timestamp
        );
    }

    // Event for create milk collector batch
    event CreateMilkCollectorBatchEvent(
        uint256 indexed batchId,
        uint256 collectorId,
        uint256 batchCreatedTime,
        uint256 quantity,
        uint256 quality
    );

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

        emit CreateMilkCollectorBatchEvent(
            batchId,
            collectorId,
            block.timestamp,
            quantity,
            quality
        );
    }

    // Event for create processor batch
    event CreateProcessorBatchEvent(
        uint256 indexed batchId,
        uint256 batchCreatedTime,
        uint256 quantity,
        uint256 quality
    );

    // Function to create a batch by milk processor
    function createProcessorBatch(
        uint256[] memory collectorBatchesIds,
        uint256 quantity,
        uint256 quality
    ) public {
        uint256 batchId = processorBatchIdCounter;
        processorBatchIdCounter++;

        InProduction memory inProduction = InProduction(false, 0, 0, 0);
        ProductionDone memory productionDone = ProductionDone(false, 0, 0, 0);
        MoveToDistributor memory moveToDistributor = MoveToDistributor(
            false,
            0
        );
        ProductionUpdate memory productionStatus = ProductionUpdate(
            inProduction,
            productionDone,
            moveToDistributor
        );

        AtDistributor memory atDistributor = AtDistributor(false, 0, 0, 0);
        MoveToRetailer memory moveToRetailer = MoveToRetailer(false, 0);
        DistributorUpdate memory distributorStatus = DistributorUpdate(
            atDistributor,
            moveToRetailer
        );

        RetailerUpdate memory retailerStatus = RetailerUpdate(false, 0, 0, 0);

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

        emit CreateProcessorBatchEvent(
            batchId,
            block.timestamp,
            quantity,
            quantity
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

    // Event for Accept batch from collectors
    event AcceptBatchByCollectorsEvent(
        uint256 indexed batchId,
        bool newStatus,
        uint256 statusUpdateTime
    );

    // Function to update the accepted status of milk collector batch
    function updateMilkCollectorBatchStatus(uint256 batchId, bool newStatus)
        public
    {
        BatchByCollector storage batch = collectorBatches[batchId];
        batch.accepted = newStatus; //update the accepted status
        batch.statusUpdateTime = block.timestamp; // update the timestamp

        emit AcceptBatchByCollectorsEvent(batchId, newStatus, block.timestamp);
    }

    //........Events..........

    // Event for start production
    event StartProductionEvent(
        uint256 indexed batchId,
        bool isInProduction,
        uint256 quantity,
        uint256 quality,
        uint256 updatedTime,
        uint256[] productIds
    );

    // Event for finish production
    event FinishProductionEvent(
        uint256 indexed batchId,
        bool isProductionDone,
        uint256 quantity,
        uint256 quality,
        uint256 updatedTime
    );

    // Event for send to ditributor
    event SendToDistributorEvent(
        uint256 indexed batchId,
        bool isSentToDistributor,
        uint256 updatedTime
    );

    // Event for accept batch by processor
    event AcceptBatchByProcessorEvent(
        uint256 indexed batchId,
        bool accepted,
        uint256 quantity,
        uint256 quality,
        uint256 updatedTime
    );

    // Event for send batch to retailer
    event SendToRetailerEvent(
        uint256 batchId,
        bool isSentToRetailer,
        uint256 updatedTime
    );

    // Event for accept by batch by distributor
    event AcceptBatchByDistributorEvent(
        uint256 batchId,
        bool accepted,
        uint256 quantity,
        uint256 quality,
        uint256 updatedTime
    );

    // Function to move batch from processing to production
    function startProduction(
        uint256 batchId,
        bool isInProduction,
        uint256 quantity,
        uint256 quality,
        uint256[] memory productIds
    ) public {
        BatchByProcessor storage batch = processorBatches[batchId];

        batch.productionStatus.inProduction.isInProduction = isInProduction;
        batch.productionStatus.inProduction.quantity = quantity;
        batch.productionStatus.inProduction.quality = quality;
        batch.productionStatus.inProduction.updatedTime = block.timestamp;

        // Loop to add to product ids with batch
        for (uint256 i = 0; i < productIds.length; i++) {
            products[productIds[i]] = Product(productIds[i], batchId);
        }

        emit StartProductionEvent(
            batchId,
            isInProduction,
            quantity,
            quality,
            block.timestamp,
            productIds
        );
    }

    // Function to finish production
    function finishProduction(
        uint256 batchId,
        bool isProductionDone,
        uint256 quantity,
        uint256 quality
    ) public {
        BatchByProcessor storage batch = processorBatches[batchId];

        batch
            .productionStatus
            .productionDone
            .isProductionDone = isProductionDone;
        batch.productionStatus.productionDone.updatedTime = block.timestamp;
        batch.productionStatus.productionDone.quantity = quantity;
        batch.productionStatus.productionDone.quality = quality;

        emit FinishProductionEvent(
            batchId,
            isProductionDone,
            quantity,
            quality,
            block.timestamp
        );
    }

    // Function to send batch to distributor
    function sendToDistributor(uint256 batchId, bool isSentToDistributor)
        public
    {
        BatchByProcessor storage batch = processorBatches[batchId];

        batch
            .productionStatus
            .moveToDistributor
            .isSentToDistributor = isSentToDistributor;
        batch.productionStatus.moveToDistributor.updatedTime = block.timestamp;

        emit SendToDistributorEvent(
            batchId,
            isSentToDistributor,
            block.timestamp
        );
    }

    // Function to accept batch by processor
    function acceptBatchByProcessor(
        uint256 batchId,
        bool accepted,
        uint256 quantity,
        uint256 quality
    ) public {
        BatchByProcessor storage batch = processorBatches[batchId];

        batch.distributorStatus.atDistributor.accepted = accepted;
        batch.distributorStatus.atDistributor.updatedTime = block.timestamp;
        batch.distributorStatus.atDistributor.quantity = quantity;
        batch.distributorStatus.atDistributor.quality = quality;

        emit AcceptBatchByProcessorEvent(
            batchId,
            accepted,
            quantity,
            quality,
            block.timestamp
        );
    }

    // Function to send batch to retailer
    function sendToRetailer(uint256 batchId, bool isSentToRetailer) public {
        BatchByProcessor storage batch = processorBatches[batchId];

        batch
            .distributorStatus
            .moveToRetailer
            .isSentToRetailer = isSentToRetailer;
        batch.distributorStatus.moveToRetailer.updatedTime = block.timestamp;

        emit SendToRetailerEvent(batchId, isSentToRetailer, block.timestamp);
    }

    // Function to accept batch by distributor
    function acceptBatchByDistributor(
        uint256 batchId,
        bool accepted,
        uint256 quantity,
        uint256 quality
    ) public {
        BatchByProcessor storage batch = processorBatches[batchId];

        batch.retailerStatus.accepted = accepted;
        batch.retailerStatus.updatedTime = block.timestamp;
        batch.retailerStatus.quantity = quantity;
        batch.retailerStatus.quality = quality;

        emit AcceptBatchByDistributorEvent(
            batchId,
            accepted,
            quantity,
            quality,
            block.timestamp
        );
    }
}
