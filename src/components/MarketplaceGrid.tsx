import { Button } from "@/components/ui/button";
import { Lock, Eye, Star, Zap, Loader2 } from "lucide-react";
import { useAccount } from 'wagmi';
import { useVeilTrade, GameAsset } from '@/hooks/useVeilTrade';
import { TransactionStatus } from '@/components/TransactionStatus';
import encryptedCrate from "@/assets/encrypted-crate.jpg";
import { toast } from 'sonner';
import { useState } from 'react';

interface GameItem {
  id: string;
  name: string;
  game: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  price: string;
  isEncrypted: boolean;
  owner: string;
}

const gameItems: GameItem[] = [
  {
    id: "1",
    name: "Dragon Blade",
    game: "Fantasy Quest",
    rarity: "Legendary",
    price: "0.5 ETH",
    isEncrypted: true,
    owner: "0x1234567890123456789012345678901234567890",
  },
  {
    id: "2", 
    name: "Cyber Rifle",
    game: "Neon Strike",
    rarity: "Epic",
    price: "0.3 ETH",
    isEncrypted: true,
    owner: "0x2345678901234567890123456789012345678901",
  },
  {
    id: "3",
    name: "Mystic Orb",
    game: "Spell Wars",
    rarity: "Rare",
    price: "0.15 ETH",
    isEncrypted: false,
    owner: "0x3456789012345678901234567890123456789012",
  },
  {
    id: "4",
    name: "Steel Armor",
    game: "Battle Realm",
    rarity: "Epic",
    price: "0.4 ETH",
    isEncrypted: true,
    owner: "0x4567890123456789012345678901234567890123",
  },
  {
    id: "5",
    name: "Lightning Spell",
    game: "Magic Realm",
    rarity: "Legendary",
    price: "0.7 ETH", 
    isEncrypted: true,
    owner: "0x5678901234567890123456789012345678901234",
  },
  {
    id: "6",
    name: "Shadow Cloak",
    game: "Stealth Force",
    rarity: "Rare",
    price: "0.2 ETH",
    isEncrypted: false,
    owner: "0x6789012345678901234567890123456789012345",
  },
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Legendary": return "text-gradient-primary";
    case "Epic": return "text-gradient-secondary";
    case "Rare": return "text-accent";
    case "Common": return "text-muted-foreground";
    default: return "text-foreground";
  }
};

const MarketplaceGrid = () => {
  const { address } = useAccount();
  const { purchaseAsset, isProcessing, isSuccess, error, hash } = useVeilTrade();
  const [currentTransaction, setCurrentTransaction] = useState<{
    assetName: string;
    encryptedData?: any;
  } | null>(null);

  const handleBuyNow = async (item: GameItem) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (address.toLowerCase() === item.owner.toLowerCase()) {
      toast.error('You cannot buy your own item');
      return;
    }

    // Set current transaction for status display
    setCurrentTransaction({
      assetName: item.name,
    });

    // Convert GameItem to GameAsset format
    const gameAsset: GameAsset = {
      id: item.id,
      name: item.name,
      game: item.game,
      rarity: item.rarity,
      price: item.price,
      priceInWei: BigInt(0), // Will be calculated in the hook
      isEncrypted: item.isEncrypted,
      owner: item.owner,
      assetId: parseInt(item.id),
    };

    try {
      await purchaseAsset(gameAsset);
      
      // Update transaction status with encrypted data
      if (isSuccess) {
        setCurrentTransaction(prev => ({
          ...prev,
          encryptedData: {
            encryptedPrice: 'encrypted_price_data',
            encryptedRarity: 'encrypted_rarity_data',
            encryptedLevel: 'encrypted_level_data',
          }
        }));
      }
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <>
      {/* Transaction Status Overlay */}
      {currentTransaction && (
        <TransactionStatus
          isProcessing={isProcessing}
          isSuccess={isSuccess}
          error={error}
          transactionHash={hash}
          assetName={currentTransaction.assetName}
          encryptedData={currentTransaction.encryptedData}
        />
      )}

      <section id="marketplace" className="py-20">
        <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">Encrypted</span> Marketplace
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse and trade premium gaming assets with complete privacy protection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameItems.map((item) => (
            <div key={item.id} className="card-encrypted group">
              {/* Item Image */}
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <img 
                  src={encryptedCrate}
                  alt={item.name}
                  className={`w-full h-48 object-cover transition-all duration-500 ${
                    item.isEncrypted ? 'encrypted-blur group-hover:blur-none' : ''
                  }`}
                />
                
                {/* Encryption Overlay */}
                {item.isEncrypted && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500">
                    <div className="text-center">
                      <Lock className="h-8 w-8 mx-auto mb-2 text-primary animate-glow-pulse" />
                      <span className="text-sm font-medium text-primary">Encrypted</span>
                    </div>
                  </div>
                )}
                
                {/* Rarity Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide backdrop-blur-sm border ${getRarityColor(item.rarity)}`}>
                  <Star className="h-3 w-3 inline mr-1" />
                  {item.rarity}
                </div>
              </div>

              {/* Item Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.game}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gradient-primary">{item.price}</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    {item.isEncrypted ? (
                      <>
                        <Lock className="h-3 w-3" />
                        <span>Private</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3" />
                        <span>Public</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    className="btn-hero flex-1 text-sm py-2"
                    onClick={() => handleBuyNow(item)}
                    disabled={isProcessing || address?.toLowerCase() === item.owner.toLowerCase()}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Zap className="h-4 w-4 mr-1" />
                    )}
                    {isProcessing ? 'Processing...' : 'Buy Now'}
                  </Button>
                  <Button className="btn-secondary px-4 text-sm py-2">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn-secondary">
            Load More Items
          </Button>
        </div>
      </div>
    </section>
    </>
  );
};

export default MarketplaceGrid;