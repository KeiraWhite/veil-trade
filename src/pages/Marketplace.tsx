import Header from "@/components/Header";
import MarketplaceGrid from "@/components/MarketplaceGrid";

const Marketplace = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gradient-primary">Encrypted</span> Gaming Marketplace
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Browse and trade premium gaming assets with complete privacy protection. All transactions remain encrypted until settlement.
              </p>
            </div>
          </div>
        </section>
        <MarketplaceGrid />
      </main>
    </div>
  );
};

export default Marketplace;