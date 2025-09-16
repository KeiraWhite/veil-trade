// VeilTrade Smart Contract ABI
export const veilTradeABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string", 
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imageUrl", 
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "_encryptedPrice",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_encryptedRarity",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_encryptedLevel",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "listAsset",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "encryptedOfferPrice",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "encryptedQuantity",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "createOffer",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      }
    ],
    "name": "purchaseAsset",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "offerId",
        "type": "uint256"
      }
    ],
    "name": "acceptOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      }
    ],
    "name": "getAssetInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imageUrl",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "price",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "rarity",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "level",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isListed",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isSold",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
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
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserProfile",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "reputation",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "totalTrades",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "successfulTrades",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "AssetListed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      }
    ],
    "name": "AssetSold",
    "type": "event"
  }
] as const;

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  sepolia: '0x0000000000000000000000000000000000000000', // Replace with actual deployed contract address
  mainnet: '0x0000000000000000000000000000000000000000', // Replace with actual deployed contract address
} as const;

// Get contract address for current network
export const getContractAddress = (chainId: number): string => {
  switch (chainId) {
    case 11155111: // Sepolia
      return CONTRACT_ADDRESSES.sepolia;
    case 1: // Mainnet
      return CONTRACT_ADDRESSES.mainnet;
    default:
      return CONTRACT_ADDRESSES.sepolia;
  }
};
