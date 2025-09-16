import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload, Lock, Zap, Eye, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useAccount } from 'wagmi';
import { useVeilTrade } from '@/hooks/useVeilTrade';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { encryptAssetData, rarityToNumber } from '@/lib/fhe';

interface ListingForm {
  itemName: string;
  game: string;
  rarity: string;
  price: string;
  description: string;
  imageUrl: string;
  isEncrypted: boolean;
}

const ListItems = () => {
  const { address } = useAccount();
  const { createAssetListing, isProcessing } = useVeilTrade();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<ListingForm>({
    itemName: '',
    game: '',
    rarity: '',
    price: '',
    description: '',
    imageUrl: '',
    isEncrypted: true,
  });
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: keyof ListingForm, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('Image size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    
    try {
      // In a real implementation, upload to IPFS or similar decentralized storage
      const mockImageUrl = await simulateImageUpload(file);
      setUploadedImage(mockImageUrl);
      handleInputChange('imageUrl', mockImageUrl);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const simulateImageUpload = async (file: File): Promise<string> => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real implementation, upload to IPFS and return hash
    return `ipfs://mock_hash_${Date.now()}`;
  };

  const validateForm = (): boolean => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return false;
    }

    if (!formData.itemName.trim()) {
      toast.error('Item name is required');
      return false;
    }

    if (!formData.game.trim()) {
      toast.error('Game name is required');
      return false;
    }

    if (!formData.rarity) {
      toast.error('Please select a rarity');
      return false;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error('Please enter a valid price');
      return false;
    }

    if (!formData.description.trim()) {
      toast.error('Description is required');
      return false;
    }

    if (!formData.imageUrl) {
      toast.error('Please upload an image');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSubmitStatus('idle');
      
      // Encrypt asset data using FHE
      const priceValue = parseFloat(formData.price);
      const rarityValue = rarityToNumber(formData.rarity);
      const levelValue = Math.floor(Math.random() * 100) + 1; // Mock level

      const encryptedData = encryptAssetData({
        price: priceValue,
        rarity: rarityValue,
        level: levelValue,
        metadata: JSON.stringify({
          name: formData.itemName,
          game: formData.game,
          description: formData.description,
          imageUrl: formData.imageUrl,
          timestamp: Date.now()
        })
      });

      // Create asset listing
      await createAssetListing(
        formData.itemName,
        formData.game,
        formData.rarity,
        formData.price,
        formData.description,
        formData.imageUrl
      );

      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          itemName: '',
          game: '',
          rarity: '',
          price: '',
          description: '',
          imageUrl: '',
          isEncrypted: true,
        });
        setUploadedImage(null);
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Listing creation failed:', error);
      setSubmitStatus('error');
      toast.error('Failed to create listing. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              List Your <span className="text-gradient-primary">Gaming Assets</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create encrypted listings for your gaming items and trade privately with complete security.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="card-encrypted">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Create New Listing</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="item-name">Item Name</Label>
                      <Input 
                        id="item-name" 
                        placeholder="Enter item name"
                        value={formData.itemName}
                        onChange={(e) => handleInputChange('itemName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="game">Game</Label>
                      <Input 
                        id="game" 
                        placeholder="Game title"
                        value={formData.game}
                        onChange={(e) => handleInputChange('game', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="rarity">Rarity</Label>
                      <Select value={formData.rarity} onValueChange={(value) => handleInputChange('rarity', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rarity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Common">Common</SelectItem>
                          <SelectItem value="Rare">Rare</SelectItem>
                          <SelectItem value="Epic">Epic</SelectItem>
                          <SelectItem value="Legendary">Legendary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (ETH)</Label>
                      <Input 
                        id="price" 
                        placeholder="0.00" 
                        type="number" 
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your item..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Item Image</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div 
                      className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploadedImage ? (
                        <div className="space-y-2">
                          <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                          <p className="font-medium text-green-600">Image uploaded successfully!</p>
                          <p className="text-sm text-muted-foreground">
                            {uploadedImage}
                          </p>
                        </div>
                      ) : isUploading ? (
                        <div className="space-y-2">
                          <Loader2 className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
                          <p className="font-medium">Uploading image...</p>
                          <p className="text-sm text-muted-foreground">
                            Please wait while your image is being processed
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="font-medium">Upload your item image</p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG up to 10MB. Your image will be encrypted until sale.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="encrypted" 
                        className="rounded" 
                        checked={formData.isEncrypted}
                        onChange={(e) => handleInputChange('isEncrypted', e.target.checked)}
                      />
                      <Label htmlFor="encrypted" className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-primary" />
                        <span>Enable encryption (recommended)</span>
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      Your item details will remain hidden until a buyer completes the purchase.
                    </p>
                  </div>

                  <Button 
                    className="btn-hero w-full"
                    onClick={handleSubmit}
                    disabled={isProcessing || !address}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : submitStatus === 'success' ? (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    ) : submitStatus === 'error' ? (
                      <AlertCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    {isProcessing ? 'Creating Listing...' : 
                     submitStatus === 'success' ? 'Listing Created!' :
                     submitStatus === 'error' ? 'Failed - Try Again' :
                     !address ? 'Connect Wallet First' :
                     'Create Encrypted Listing'}
                  </Button>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="card-encrypted">
                <div className="space-y-4 text-center">
                  <Lock className="h-12 w-12 mx-auto text-primary" />
                  <h3 className="text-xl font-bold">Privacy Protection</h3>
                  <p className="text-sm text-muted-foreground">
                    Your listing will be encrypted and only revealed to serious buyers after payment confirmation.
                  </p>
                </div>
              </Card>

              <Card className="card-encrypted">
                <div className="space-y-4 text-center">
                  <Zap className="h-12 w-12 mx-auto text-secondary" />
                  <h3 className="text-xl font-bold">Instant Settlement</h3>
                  <p className="text-sm text-muted-foreground">
                    Smart contracts ensure immediate payment and asset transfer upon successful transaction.
                  </p>
                </div>
              </Card>

              <Card className="card-encrypted">
                <div className="space-y-4 text-center">
                  <Eye className="h-12 w-12 mx-auto text-primary-glow" />
                  <h3 className="text-xl font-bold">Preview Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Buyers can preview encrypted items before purchase without revealing sensitive details.
                  </p>
                </div>
              </Card>

              <div className="bg-card/30 border border-border/50 rounded-lg p-4">
                <h4 className="font-bold mb-2">Listing Fees</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Fee:</span>
                    <span>2.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gas Fee:</span>
                    <span>~$5-15</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-border/50 pt-1 mt-2">
                    <span>Total:</span>
                    <span>2.5% + Gas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListItems;