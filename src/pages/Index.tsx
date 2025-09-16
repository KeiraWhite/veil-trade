import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WalletSection from "@/components/WalletSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <WalletSection />
      </main>
    </div>
  );
};

export default Index;