import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle, Clock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface TransactionStatusProps {
  isProcessing: boolean;
  isSuccess: boolean;
  error: Error | null;
  transactionHash?: string;
  assetName: string;
  encryptedData?: {
    encryptedPrice: string;
    encryptedRarity: string;
    encryptedLevel: string;
  };
}

export const TransactionStatus = ({
  isProcessing,
  isSuccess,
  error,
  transactionHash,
  assetName,
  encryptedData
}: TransactionStatusProps) => {
  const [showEncryptedData, setShowEncryptedData] = useState(false);

  if (!isProcessing && !isSuccess && !error) {
    return null;
  }

  return (
    <Card className="fixed top-4 right-4 w-96 z-50 bg-card/95 backdrop-blur-sm border border-border/50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Transaction Status</h3>
          {isSuccess && (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
          {isProcessing && (
            <Clock className="h-5 w-5 text-blue-500 animate-spin" />
          )}
          {error && (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Asset:</p>
            <p className="font-medium">{assetName}</p>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Lock className="h-4 w-4 text-primary" />
                <span>Encrypting transaction data...</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-blue-500 animate-spin" />
                <span>Submitting to blockchain...</span>
              </div>
            </div>
          )}

          {isSuccess && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Transaction confirmed!</span>
              </div>
              {transactionHash && (
                <div className="text-xs text-muted-foreground">
                  <p>Hash: {transactionHash.slice(0, 20)}...</p>
                </div>
              )}
              <div className="flex items-center space-x-2 text-sm">
                <Lock className="h-4 w-4 text-primary" />
                <span>Asset details remain encrypted</span>
              </div>
            </div>
          )}

          {error && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>Transaction failed</span>
              </div>
              <p className="text-xs text-muted-foreground">{error.message}</p>
            </div>
          )}

          {encryptedData && isSuccess && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Encrypted Data</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEncryptedData(!showEncryptedData)}
                  className="h-6 px-2"
                >
                  {showEncryptedData ? (
                    <EyeOff className="h-3 w-3" />
                  ) : (
                    <Eye className="h-3 w-3" />
                  )}
                </Button>
              </div>
              
              {showEncryptedData && (
                <div className="space-y-1 text-xs bg-muted/50 p-2 rounded">
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <p className="font-mono break-all">{encryptedData.encryptedPrice.slice(0, 20)}...</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rarity:</span>
                    <p className="font-mono break-all">{encryptedData.encryptedRarity.slice(0, 20)}...</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Level:</span>
                    <p className="font-mono break-all">{encryptedData.encryptedLevel.slice(0, 20)}...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
