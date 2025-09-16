import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload, Lock, Zap, Eye } from "lucide-react";

const ListItems = () => {
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
                      <Input id="item-name" placeholder="Enter item name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="game">Game</Label>
                      <Input id="game" placeholder="Game title" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="rarity">Rarity</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rarity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="common">Common</SelectItem>
                          <SelectItem value="rare">Rare</SelectItem>
                          <SelectItem value="epic">Epic</SelectItem>
                          <SelectItem value="legendary">Legendary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (ETH)</Label>
                      <Input id="price" placeholder="0.00" type="number" step="0.01" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe your item..." rows={4} />
                  </div>

                  <div className="space-y-4">
                    <Label>Item Image</Label>
                    <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <div className="space-y-2">
                        <p className="font-medium">Upload your item image</p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG up to 10MB. Your image will be encrypted until sale.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="encrypted" className="rounded" defaultChecked />
                      <Label htmlFor="encrypted" className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-primary" />
                        <span>Enable encryption (recommended)</span>
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      Your item details will remain hidden until a buyer completes the purchase.
                    </p>
                  </div>

                  <Button className="btn-hero w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Encrypted Listing
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