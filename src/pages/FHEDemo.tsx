import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, Zap, Shield, Key } from "lucide-react";
import { useState } from "react";
import { 
  encryptAssetData, 
  decryptAssetData, 
  rarityToNumber, 
  numberToRarity 
} from '@/lib/fhe';
import { toast } from 'sonner';

const FHEDemo = () => {
  const [showDecrypted, setShowDecrypted] = useState(false);
  const [encryptedData, setEncryptedData] = useState<any>(null);
  const [decryptedData, setDecryptedData] = useState<any>(null);

  const demoAsset = {
    name: "Dragon Blade",
    game: "Fantasy Quest",
    rarity: "Legendary",
    price: 0.5,
    level: 85,
    description: "A legendary weapon forged in the fires of Mount Doom"
  };

  const handleEncrypt = () => {
    const assetData = {
      price: demoAsset.price,
      rarity: rarityToNumber(demoAsset.rarity),
      level: demoAsset.level,
      metadata: JSON.stringify({
        name: demoAsset.name,
        game: demoAsset.game,
        description: demoAsset.description
      })
    };

    const encrypted = encryptAssetData(assetData);
    setEncryptedData(encrypted);
    setDecryptedData(null);
    setShowDecrypted(false);
    
    toast.success('Asset data encrypted successfully!');
  };

  const handleDecrypt = () => {
    if (!encryptedData) return;

    const decrypted = decryptAssetData({
      encryptedPrice: encryptedData.encryptedPrice,
      encryptedRarity: encryptedData.encryptedRarity,
      encryptedLevel: encryptedData.encryptedLevel,
      metadata: encryptedData.metadata
    });

    setDecryptedData(decrypted);
    setShowDecrypted(true);
    
    toast.success('Asset data decrypted successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient-primary">FHE</span> Encryption Demo
              </h1>
              <p className="text-xl text-muted-foreground">
                Experience how Fully Homomorphic Encryption protects your gaming assets
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Original Data */}
              <Card className="card-encrypted">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Eye className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Original Asset Data</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <p className="font-medium">{demoAsset.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Game:</span>
                      <p className="font-medium">{demoAsset.game}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Rarity:</span>
                      <p className="font-medium text-gradient-primary">{demoAsset.rarity}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <p className="font-medium">{demoAsset.price} ETH</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Level:</span>
                      <p className="font-medium">{demoAsset.level}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Description:</span>
                      <p className="text-sm">{demoAsset.description}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Encrypted Data */}
              <Card className="card-encrypted">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lock className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Encrypted Data</h3>
                  </div>
                  
                  {encryptedData ? (
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Encrypted Price:</span>
                        <p className="font-mono text-xs break-all bg-muted/50 p-2 rounded">
                          {encryptedData.encryptedPrice.slice(0, 50)}...
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Encrypted Rarity:</span>
                        <p className="font-mono text-xs break-all bg-muted/50 p-2 rounded">
                          {encryptedData.encryptedRarity.slice(0, 50)}...
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Encrypted Level:</span>
                        <p className="font-mono text-xs break-all bg-muted/50 p-2 rounded">
                          {encryptedData.encryptedLevel.slice(0, 50)}...
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Metadata:</span>
                        <p className="text-sm">{encryptedData.metadata}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No encrypted data yet</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Decrypted Data */}
            {decryptedData && showDecrypted && (
              <Card className="card-encrypted mb-8">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Key className="h-5 w-5 text-green-500" />
                    <h3 className="text-xl font-bold">Decrypted Data</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <p className="font-medium text-green-600">{decryptedData.price} ETH</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Rarity:</span>
                      <p className="font-medium text-green-600">{numberToRarity(decryptedData.rarity)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Level:</span>
                      <p className="font-medium text-green-600">{decryptedData.level}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={handleEncrypt}
                className="btn-hero"
                disabled={!!encryptedData}
              >
                <Lock className="h-4 w-4 mr-2" />
                Encrypt Data
              </Button>
              
              <Button 
                onClick={handleDecrypt}
                className="btn-secondary"
                disabled={!encryptedData || showDecrypted}
              >
                <Key className="h-4 w-4 mr-2" />
                Decrypt Data
              </Button>
              
              <Button 
                onClick={() => {
                  setEncryptedData(null);
                  setDecryptedData(null);
                  setShowDecrypted(false);
                }}
                variant="outline"
              >
                Reset Demo
              </Button>
            </div>

            {/* FHE Benefits */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center mb-8">
                Why FHE Matters for Gaming Assets
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="card-encrypted">
                  <div className="p-6 text-center">
                    <Shield className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <h3 className="font-bold mb-2">Privacy Protection</h3>
                    <p className="text-sm text-muted-foreground">
                      Asset details remain encrypted until transaction completion, preventing front-running
                    </p>
                  </div>
                </Card>
                
                <Card className="card-encrypted">
                  <div className="p-6 text-center">
                    <Zap className="h-8 w-8 mx-auto mb-4 text-secondary" />
                    <h3 className="font-bold mb-2">Fair Trading</h3>
                    <p className="text-sm text-muted-foreground">
                      No one can see your bids or asset details before you're ready to reveal them
                    </p>
                  </div>
                </Card>
                
                <Card className="card-encrypted">
                  <div className="p-6 text-center">
                    <Lock className="h-8 w-8 mx-auto mb-4 text-accent" />
                    <h3 className="font-bold mb-2">Secure Computation</h3>
                    <p className="text-sm text-muted-foreground">
                      Smart contracts can process encrypted data without revealing sensitive information
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FHEDemo;
