import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="CryptMarket Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold text-gradient-primary">CryptMarket</span>
          </Link>
          
                <nav className="hidden md:flex items-center space-x-8">
                  <Link to="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">
                    Marketplace
                  </Link>
                  <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                    How It Works
                  </Link>
                  <Link to="/fhe-demo" className="text-muted-foreground hover:text-primary transition-colors">
                    FHE Demo
                  </Link>
                  <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy
                  </Link>
                </nav>

          <div className="flex items-center space-x-4">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;