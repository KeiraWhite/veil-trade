import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Shield, Zap, Plus } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const WalletSection = () => {
  const { isConnected } = useAccount();

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Connect Your Wallet to{" "}
            <span className="text-gradient-primary">Start Trading</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Connect your wallet to list items, make private trades, and access the encrypted marketplace
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="card-encrypted">
              <div className="space-y-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary/20 rounded-full">
                  <Wallet className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Connect Wallet</h3>
                  <p className="text-muted-foreground">
                    Connect your crypto wallet to start trading gaming assets with complete privacy
                  </p>
                </div>
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                  }) => {
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                      ready &&
                      account &&
                      chain &&
                      (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                    return (
                      <div
                        {...(!ready && {
                          'aria-hidden': true,
                          'style': {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <Button className="btn-hero w-full" onClick={openConnectModal}>
                                <Wallet className="h-4 w-4 mr-2" />
                                Connect Wallet
                              </Button>
                            );
                          }

                          if (chain.unsupported) {
                            return (
                              <Button className="btn-hero w-full" onClick={openChainModal}>
                                Wrong network
                              </Button>
                            );
                          }

                          return (
                            <div className="flex flex-col space-y-2 w-full">
                              <Button className="btn-hero w-full" onClick={openAccountModal}>
                                <Wallet className="h-4 w-4 mr-2" />
                                {account.displayName}
                              </Button>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
            </Card>

            <Card className="card-encrypted">
              <div className="space-y-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-secondary/20 rounded-full">
                  <Plus className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">List Items</h3>
                  <p className="text-muted-foreground">
                    Upload your gaming assets and create encrypted listings for secure private sales
                  </p>
                </div>
                <Button className="btn-secondary w-full" onClick={() => window.location.href = '/list-items'}>
                  <Plus className="h-4 w-4 mr-2" />
                  List Your Items
                </Button>
              </div>
            </Card>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-semibold">256-bit Encryption</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="h-6 w-6 text-secondary" />
                <span className="font-semibold">Instant Settlement</span>
              </div>
              <div className="flex items-center space-x-3">
                <Wallet className="h-6 w-6 text-primary-glow" />
                <span className="font-semibold">Multi-Wallet Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;