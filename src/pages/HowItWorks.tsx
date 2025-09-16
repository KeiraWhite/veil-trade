import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Lock, Wallet, Zap, Eye, Key, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Wallet className="h-8 w-8" />,
      title: "Connect Your Wallet",
      description: "Link your crypto wallet to access the encrypted marketplace and start trading gaming assets securely."
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Browse Encrypted Items",
      description: "Explore encrypted gaming assets. Items remain blurred and protected until you're ready to purchase."
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Private Negotiations",
      description: "Negotiate prices and terms privately. All communication and offers are encrypted end-to-end."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Settlement",
      description: "Complete transactions instantly with smart contracts. Items are revealed only after successful payment."
    },
    {
      icon: <Key className="h-8 w-8" />,
      title: "Secure Transfer",
      description: "Assets are transferred securely to your wallet with full encryption and ownership verification."
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Trade Complete",
      description: "Your gaming asset is now yours! Trade, use in games, or list for future sales with complete privacy."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How <span className="text-gradient-primary">CryptMarket</span> Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn how our encrypted marketplace protects your gaming assets and prevents front-running bots from interfering with your trades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <Card key={index} className="card-encrypted relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full text-primary">
                      {step.icon}
                    </div>
                    <div className="text-3xl font-bold text-primary/30">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Why <span className="text-gradient-primary">Encryption</span> Matters
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="font-bold mb-2">No Front-Running</h3>
                <p className="text-sm text-muted-foreground">
                  Bots can't see your trades until settlement, preventing price manipulation
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Private Negotiations</h3>
                <p className="text-sm text-muted-foreground">
                  Keep your trading strategies and asset values confidential
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Secure Ownership</h3>
                <p className="text-sm text-muted-foreground">
                  Full control over your assets with cryptographic proof of ownership
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;