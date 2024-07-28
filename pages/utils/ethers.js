import { ethers } from "ethers";
import { deployer, contract } from "../../details.json";

const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "newStatus",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "statusUpdateTime",
				"type": "uint256"
			}
		],
		"name": "AcceptBatchByCollectorsEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "accepted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			}
		],
		"name": "acceptBatchByDistributor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "accepted",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "updatedTime",
				"type": "uint256"
			}
		],
		"name": "AcceptBatchByDistributorEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "accepted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			}
		],
		"name": "acceptBatchByProcessor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "accepted",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "updatedTime",
				"type": "uint256"
			}
		],
		"name": "AcceptBatchByProcessorEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "milkCollectorId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "addFarmer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "milkCollectorId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "AddFarmerEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "milkCollectorId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "farmerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			}
		],
		"name": "collectMilk",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "milkCollectorId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "farmerId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "CollectMilkEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "collectorId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "collectionIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			}
		],
		"name": "createMilkCollectorBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "collectorId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "batchCreatedTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			}
		],
		"name": "CreateMilkCollectorBatchEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "collectorBatchesIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			}
		],
		"name": "createProcessorBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "batchCreatedTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			}
		],
		"name": "CreateProcessorBatchEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isProductionDone",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			}
		],
		"name": "finishProduction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isProductionDone",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "updatedTime",
				"type": "uint256"
			}
		],
		"name": "FinishProductionEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isSentToDistributor",
				"type": "bool"
			}
		],
		"name": "sendToDistributor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isSentToDistributor",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "updatedTime",
				"type": "uint256"
			}
		],
		"name": "SendToDistributorEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isSentToRetailer",
				"type": "bool"
			}
		],
		"name": "sendToRetailer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isSentToRetailer",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "updatedTime",
				"type": "uint256"
			}
		],
		"name": "SendToRetailerEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isInProduction",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "productIds",
				"type": "uint256[]"
			}
		],
		"name": "startProduction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isInProduction",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "updatedTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "productIds",
				"type": "uint256[]"
			}
		],
		"name": "StartProductionEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "newStatus",
				"type": "bool"
			}
		],
		"name": "updateMilkCollectorBatchStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "collectorBatches",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "collectorId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "batchCreatedTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "accepted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "statusUpdateTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "collectorBatchIdCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "farmerIdCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "farmers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "farmerId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "milkQuantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "milkQuality",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "milkCollectorId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			}
		],
		"name": "getBatchCollectionIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			}
		],
		"name": "getProcessorBatchCollectionIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "milkCollectionCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "milkCollections",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "milkCollectorId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "farmerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "processorBatches",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "batchCreatedTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quality",
				"type": "uint256"
			},
			{
				"components": [
					{
						"components": [
							{
								"internalType": "bool",
								"name": "isInProduction",
								"type": "bool"
							},
							{
								"internalType": "uint256",
								"name": "quantity",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "quality",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "updatedTime",
								"type": "uint256"
							}
						],
						"internalType": "struct Milk.InProduction",
						"name": "inProduction",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "bool",
								"name": "isProductionDone",
								"type": "bool"
							},
							{
								"internalType": "uint256",
								"name": "quantity",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "quality",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "updatedTime",
								"type": "uint256"
							}
						],
						"internalType": "struct Milk.ProductionDone",
						"name": "productionDone",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "bool",
								"name": "isSentToDistributor",
								"type": "bool"
							},
							{
								"internalType": "uint256",
								"name": "updatedTime",
								"type": "uint256"
							}
						],
						"internalType": "struct Milk.MoveToDistributor",
						"name": "moveToDistributor",
						"type": "tuple"
					}
				],
				"internalType": "struct Milk.ProductionUpdate",
				"name": "productionStatus",
				"type": "tuple"
			},
			{
				"components": [
					{
						"components": [
							{
								"internalType": "bool",
								"name": "accepted",
								"type": "bool"
							},
							{
								"internalType": "uint256",
								"name": "quantity",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "quality",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "updatedTime",
								"type": "uint256"
							}
						],
						"internalType": "struct Milk.AtDistributor",
						"name": "atDistributor",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "bool",
								"name": "isSentToRetailer",
								"type": "bool"
							},
							{
								"internalType": "uint256",
								"name": "updatedTime",
								"type": "uint256"
							}
						],
						"internalType": "struct Milk.MoveToRetailer",
						"name": "moveToRetailer",
						"type": "tuple"
					}
				],
				"internalType": "struct Milk.DistributorUpdate",
				"name": "distributorStatus",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "bool",
						"name": "accepted",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "quality",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "updatedTime",
						"type": "uint256"
					}
				],
				"internalType": "struct Milk.RetailerUpdate",
				"name": "retailerStatus",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "processorBatchIdCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "productCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "productId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
let signer = provider.getSigner();
let contractInstance = new ethers.Contract(contract, abi, signer);

export { contractInstance, deployer };
