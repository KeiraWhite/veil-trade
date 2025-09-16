import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Edit, 
  Trash2, 
  Star, 
  Lock, 
  Unlock, 
  ExternalLink,
  Plus,
  Filter,
  Search
} from "lucide-react";
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface UserAsset {
  id: string;
  name: string;
  game: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  price: string;
  isEncrypted: boolean;
  isListed: boolean;
  isSold: boolean;
  imageUrl: string;
  description: string;
  listingDate: string;
  views: number;
  offers: number;
}

const MyAssets = () => {
  const { address } = useAccount();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'listed' | 'sold' | 'draft'>('all');

  // Mock user assets data
  const userAssets: UserAsset[] = [
    {
      id: "1",
      name: "Dragon Blade",
      game: "Fantasy Quest",
      rarity: "Legendary",
      price: "0.5 ETH",
      isEncrypted: true,
      isListed: true,
      isSold: false,
      imageUrl: "/api/placeholder/300/200",
      description: "A legendary weapon forged in the fires of Mount Doom",
      listingDate: "2024-01-15",
      views: 45,
      offers: 3
    },
    {
      id: "2",
      name: "Cyber Rifle",
      game: "Neon Strike",
      rarity: "Epic",
      price: "0.3 ETH",
      isEncrypted: true,
      isListed: true,
      isSold: false,
      imageUrl: "/api/placeholder/300/200",
      description: "High-tech weapon with plasma rounds",
      listingDate: "2024-01-14",
      views: 32,
      offers: 1
    },
    {
      id: "3",
      name: "Mystic Orb",
      game: "Spell Wars",
      rarity: "Rare",
      price: "0.15 ETH",
      isEncrypted: false,
      isListed: false,
      isSold: true,
      imageUrl: "/api/placeholder/300/200",
      description: "Magical orb that enhances spell power",
      listingDate: "2024-01-10",
      views: 28,
      offers: 2
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "Epic": return "bg-gradient-to-r from-purple-400 to-pink-500";
      case "Rare": return "bg-gradient-to-r from-blue-400 to-cyan-500";
      case "Common": return "bg-gradient-to-r from-gray-400 to-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadge = (asset: UserAsset) => {
    if (asset.isSold) {
      return <Badge className="bg-green-500">Sold</Badge>;
    } else if (asset.isListed) {
      return <Badge className="bg-blue-500">Listed</Badge>;
    } else {
      return <Badge variant="outline">Draft</Badge>;
    }
  };

  const filteredAssets = userAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.game.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'listed' && asset.isListed && !asset.isSold) ||
                         (filterStatus === 'sold' && asset.isSold) ||
                         (filterStatus === 'draft' && !asset.isListed && !asset.isSold);
    
    return matchesSearch && matchesFilter;
  });

  if (!address) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">My Assets</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Please connect your wallet to view your assets
              </p>
              <Button className="btn-hero">
                Connect Wallet
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Assets</h1>
              <p className="text-muted-foreground">
                Manage your gaming asset listings and track their performance
              </p>
            </div>
            <Link to="/list-items">
              <Button className="btn-hero">
                <Plus className="h-4 w-4 mr-2" />
                List New Asset
              </Button>
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search assets..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['all', 'listed', 'sold', 'draft'].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status as any)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Assets Grid */}
          {filteredAssets.length === 0 ? (
            <Card className="card-encrypted">
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No assets found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'You haven\'t listed any assets yet'
                  }
                </p>
                {!searchTerm && filterStatus === 'all' && (
                  <Link to="/list-items">
                    <Button className="btn-hero">
                      <Plus className="h-4 w-4 mr-2" />
                      List Your First Asset
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset) => (
                <Card key={asset.id} className="card-encrypted group">
                  {/* Asset Image */}
                  <div className="relative mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={asset.imageUrl}
                      alt={asset.name}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      {getStatusBadge(asset)}
                    </div>

                    {/* Encryption Badge */}
                    <div className="absolute top-3 right-3">
                      {asset.isEncrypted ? (
                        <Badge className="bg-primary">
                          <Lock className="h-3 w-3 mr-1" />
                          Encrypted
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <Unlock className="h-3 w-3 mr-1" />
                          Public
                        </Badge>
                      )}
                    </div>

                    {/* Rarity Badge */}
                    <div className="absolute bottom-3 left-3">
                      <Badge className={getRarityColor(asset.rarity)}>
                        <Star className="h-3 w-3 mr-1" />
                        {asset.rarity}
                      </Badge>
                    </div>
                  </div>

                  {/* Asset Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg">{asset.name}</h3>
                      <p className="text-sm text-muted-foreground">{asset.game}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-gradient-primary">{asset.price}</div>
                      <div className="text-sm text-muted-foreground">
                        Listed {new Date(asset.listingDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{asset.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{asset.offers} offers</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {!asset.isSold && (
                        <>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="card-encrypted">
              <div className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {userAssets.filter(a => a.isListed && !a.isSold).length}
                </div>
                <div className="text-sm text-muted-foreground">Active Listings</div>
              </div>
            </Card>
            
            <Card className="card-encrypted">
              <div className="p-6 text-center">
                <div className="text-2xl font-bold text-green-500 mb-1">
                  {userAssets.filter(a => a.isSold).length}
                </div>
                <div className="text-sm text-muted-foreground">Sold Items</div>
              </div>
            </Card>
            
            <Card className="card-encrypted">
              <div className="p-6 text-center">
                <div className="text-2xl font-bold text-secondary mb-1">
                  {userAssets.reduce((sum, a) => sum + a.views, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
            </Card>
            
            <Card className="card-encrypted">
              <div className="p-6 text-center">
                <div className="text-2xl font-bold text-accent mb-1">
                  {userAssets.reduce((sum, a) => sum + a.offers, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Offers</div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAssets;
