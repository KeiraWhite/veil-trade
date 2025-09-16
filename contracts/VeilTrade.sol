// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract VeilTrade is SepoliaConfig {
    using FHE for *;
    
    struct GameAsset {
        euint32 assetId;
        euint32 price;
        euint32 rarity;
        euint32 level;
        bool isListed;
        bool isSold;
        string name;
        string description;
        string imageUrl;
        address owner;
        address buyer;
        uint256 timestamp;
    }
    
    struct TradeOffer {
        euint32 offerId;
        euint32 assetId;
        euint32 offerPrice;
        euint32 offerQuantity;
        bool isActive;
        bool isAccepted;
        address offerer;
        address assetOwner;
        uint256 timestamp;
    }
    
    struct UserProfile {
        euint32 reputation;
        euint32 totalTrades;
        euint32 successfulTrades;
        bool isVerified;
        string username;
        address userAddress;
    }
    
    mapping(uint256 => GameAsset) public assets;
    mapping(uint256 => TradeOffer) public offers;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => euint32) public userBalances;
    mapping(uint256 => euint32[]) public assetOffers; // assetId => offerIds
    
    uint256 public assetCounter;
    uint256 public offerCounter;
    
    address public owner;
    address public verifier;
    uint256 public platformFee; // in basis points (100 = 1%)
    
    event AssetListed(uint256 indexed assetId, address indexed owner, string name);
    event AssetSold(uint256 indexed assetId, address indexed buyer, address indexed seller);
    event OfferCreated(uint256 indexed offerId, uint256 indexed assetId, address indexed offerer);
    event OfferAccepted(uint256 indexed offerId, uint256 indexed assetId, address indexed assetOwner);
    event UserRegistered(address indexed user, string username);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        platformFee = 250; // 2.5% platform fee
    }
    
    function registerUser(string memory _username) public {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(userProfiles[msg.sender].userAddress == address(0), "User already registered");
        
        userProfiles[msg.sender] = UserProfile({
            reputation: FHE.asEuint32(100), // Starting reputation
            totalTrades: FHE.asEuint32(0),
            successfulTrades: FHE.asEuint32(0),
            isVerified: false,
            username: _username,
            userAddress: msg.sender
        });
        
        emit UserRegistered(msg.sender, _username);
    }
    
    function listAsset(
        string memory _name,
        string memory _description,
        string memory _imageUrl,
        externalEuint32 _price,
        externalEuint32 _rarity,
        externalEuint32 _level,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Asset name cannot be empty");
        require(userProfiles[msg.sender].userAddress != address(0), "User must be registered");
        
        uint256 assetId = assetCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalPrice = FHE.fromExternal(_price, inputProof);
        euint32 internalRarity = FHE.fromExternal(_rarity, inputProof);
        euint32 internalLevel = FHE.fromExternal(_level, inputProof);
        
        assets[assetId] = GameAsset({
            assetId: FHE.asEuint32(0), // Will be set properly later
            price: internalPrice,
            rarity: internalRarity,
            level: internalLevel,
            isListed: true,
            isSold: false,
            name: _name,
            description: _description,
            imageUrl: _imageUrl,
            owner: msg.sender,
            buyer: address(0),
            timestamp: block.timestamp
        });
        
        emit AssetListed(assetId, msg.sender, _name);
        return assetId;
    }
    
    function createOffer(
        uint256 assetId,
        externalEuint32 offerPrice,
        externalEuint32 quantity,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(assets[assetId].owner != address(0), "Asset does not exist");
        require(assets[assetId].isListed, "Asset is not listed");
        require(assets[assetId].owner != msg.sender, "Cannot offer on own asset");
        require(userProfiles[msg.sender].userAddress != address(0), "User must be registered");
        
        uint256 offerId = offerCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalOfferPrice = FHE.fromExternal(offerPrice, inputProof);
        euint32 internalQuantity = FHE.fromExternal(quantity, inputProof);
        
        offers[offerId] = TradeOffer({
            offerId: FHE.asEuint32(0), // Will be set properly later
            assetId: FHE.asEuint32(assetId),
            offerPrice: internalOfferPrice,
            offerQuantity: internalQuantity,
            isActive: true,
            isAccepted: false,
            offerer: msg.sender,
            assetOwner: assets[assetId].owner,
            timestamp: block.timestamp
        });
        
        // Add offer to asset's offer list
        assetOffers[assetId].push(FHE.asEuint32(offerId));
        
        emit OfferCreated(offerId, assetId, msg.sender);
        return offerId;
    }
    
    function acceptOffer(uint256 offerId) public {
        require(offers[offerId].assetOwner != address(0), "Offer does not exist");
        require(offers[offerId].isActive, "Offer is not active");
        require(offers[offerId].assetOwner == msg.sender, "Only asset owner can accept offer");
        
        uint256 assetId = uint256(FHE.decrypt(offers[offerId].assetId));
        require(assets[assetId].isListed, "Asset is no longer listed");
        
        // Mark offer as accepted
        offers[offerId].isAccepted = true;
        offers[offerId].isActive = false;
        
        // Mark asset as sold
        assets[assetId].isSold = true;
        assets[assetId].isListed = false;
        assets[assetId].buyer = offers[offerId].offerer;
        
        // Update user statistics
        userProfiles[msg.sender].totalTrades = FHE.add(userProfiles[msg.sender].totalTrades, FHE.asEuint32(1));
        userProfiles[offers[offerId].offerer].totalTrades = FHE.add(userProfiles[offers[offerId].offerer].totalTrades, FHE.asEuint32(1));
        
        userProfiles[msg.sender].successfulTrades = FHE.add(userProfiles[msg.sender].successfulTrades, FHE.asEuint32(1));
        userProfiles[offers[offerId].offerer].successfulTrades = FHE.add(userProfiles[offers[offerId].offerer].successfulTrades, FHE.asEuint32(1));
        
        emit OfferAccepted(offerId, assetId, msg.sender);
        emit AssetSold(assetId, offers[offerId].offerer, msg.sender);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        require(userProfiles[user].userAddress != address(0), "User not registered");
        
        userProfiles[user].reputation = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function verifyUser(address user, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify users");
        require(userProfiles[user].userAddress != address(0), "User not registered");
        
        userProfiles[user].isVerified = isVerified;
    }
    
    function getAssetInfo(uint256 assetId) public view returns (
        string memory name,
        string memory description,
        string memory imageUrl,
        uint8 price,
        uint8 rarity,
        uint8 level,
        bool isListed,
        bool isSold,
        address owner,
        address buyer,
        uint256 timestamp
    ) {
        GameAsset storage asset = assets[assetId];
        return (
            asset.name,
            asset.description,
            asset.imageUrl,
            0, // FHE.decrypt(asset.price) - will be decrypted off-chain
            0, // FHE.decrypt(asset.rarity) - will be decrypted off-chain
            0, // FHE.decrypt(asset.level) - will be decrypted off-chain
            asset.isListed,
            asset.isSold,
            asset.owner,
            asset.buyer,
            asset.timestamp
        );
    }
    
    function getOfferInfo(uint256 offerId) public view returns (
        uint8 assetId,
        uint8 offerPrice,
        uint8 quantity,
        bool isActive,
        bool isAccepted,
        address offerer,
        address assetOwner,
        uint256 timestamp
    ) {
        TradeOffer storage offer = offers[offerId];
        return (
            0, // FHE.decrypt(offer.assetId) - will be decrypted off-chain
            0, // FHE.decrypt(offer.offerPrice) - will be decrypted off-chain
            0, // FHE.decrypt(offer.offerQuantity) - will be decrypted off-chain
            offer.isActive,
            offer.isAccepted,
            offer.offerer,
            offer.assetOwner,
            offer.timestamp
        );
    }
    
    function getUserProfile(address user) public view returns (
        uint8 reputation,
        uint8 totalTrades,
        uint8 successfulTrades,
        bool isVerified,
        string memory username
    ) {
        UserProfile storage profile = userProfiles[user];
        return (
            0, // FHE.decrypt(profile.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(profile.totalTrades) - will be decrypted off-chain
            0, // FHE.decrypt(profile.successfulTrades) - will be decrypted off-chain
            profile.isVerified,
            profile.username
        );
    }
    
    function getAssetOffers(uint256 assetId) public view returns (uint32[] memory) {
        euint32[] storage encryptedOffers = assetOffers[assetId];
        uint32[] memory decryptedOffers = new uint32[](encryptedOffers.length);
        
        for (uint256 i = 0; i < encryptedOffers.length; i++) {
            decryptedOffers[i] = uint32(FHE.decrypt(encryptedOffers[i]));
        }
        
        return decryptedOffers;
    }
    
    function setPlatformFee(uint256 _fee) public {
        require(msg.sender == owner, "Only owner can set platform fee");
        require(_fee <= 1000, "Platform fee cannot exceed 10%");
        
        platformFee = _fee;
    }
    
    function withdrawFees() public {
        require(msg.sender == owner, "Only owner can withdraw fees");
        
        // Transfer accumulated fees to owner
        // Note: In a real implementation, this would transfer actual accumulated fees
        payable(owner).transfer(address(this).balance);
    }
}
