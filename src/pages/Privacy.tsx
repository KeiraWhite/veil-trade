import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, Zap, Server, Key } from "lucide-react";

const Privacy = () => {
  const features = [
    {
      icon: <Lock className="h-8 w-8" />,
      title: "End-to-End Encryption",
      description: "All trades and communications are encrypted with military-grade 256-bit encryption, ensuring complete privacy from listing to settlement."
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Hidden Asset Details",
      description: "Asset information remains obscured until transaction completion, preventing bots and competitors from tracking your trading patterns."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Zero-Knowledge Proofs",
      description: "Verify transactions without revealing sensitive data. Trade with confidence while maintaining complete anonymity."
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Decentralized Storage",
      description: "Your data is distributed across multiple nodes, eliminating single points of failure and ensuring no central authority can access your information."
    },
    {
      icon: <Key className="h-8 w-8" />,
      title: "Self-Custody",
      description: "You maintain full control of your private keys and assets. We never have access to your funds or personal information."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Private Mempool",
      description: "Transactions are processed through private channels, preventing MEV bots and front-running attacks on your trades."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-primary">Privacy</span> First Trading
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your trading privacy is our priority. Learn how CryptMarket protects your data, transactions, and gaming assets from prying eyes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="card-encrypted">
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-12">
            <Card className="card-encrypted">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Data Protection Standards</h2>
                <p className="text-muted-foreground">
                  We follow industry-leading security practices to ensure your information remains private and secure.
                </p>
                <div className="grid md:grid-cols-4 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">256-bit</div>
                    <div className="text-sm text-muted-foreground">Encryption Standard</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-sm text-muted-foreground">Data Breaches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Private Transactions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Security Monitoring</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="card-encrypted">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Privacy Policy Highlights</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold mb-2">What We Collect</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Wallet addresses (public information only)</li>
                      <li>• Transaction hashes (for verification)</li>
                      <li>• Anonymous usage analytics</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">What We Never Collect</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Private keys or seed phrases</li>
                      <li>• Personal identifying information</li>
                      <li>• Trading strategies or patterns</li>
                      <li>• Asset details or valuations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;