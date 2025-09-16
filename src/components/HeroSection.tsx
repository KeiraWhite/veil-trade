import { Button } from "@/components/ui/button";
import { Lock, Eye, Zap, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-marketplace.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full animate-float blur-xl" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-secondary/20 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary-glow/20 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Trade In-Game Assets{" "}
              <span className="text-gradient-primary">Privately</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Revolutionary encrypted marketplace where trades remain hidden until settlement, 
              protecting you from bot front-running and price manipulation.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
              <Lock className="h-4 w-4 text-primary" />
              <span>Encrypted Trades</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
              <Eye className="h-4 w-4 text-secondary" />
              <span>Anti-Snipe Protection</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
              <Zap className="h-4 w-4 text-primary-glow" />
              <span>Instant Settlement</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/marketplace">
              <Button className="btn-hero animate-glow-pulse">
                <Zap className="h-4 w-4 mr-2" />
                Browse Marketplace
              </Button>
            </Link>
            <Link to="/list-items">
              <Button className="btn-secondary">
                <Plus className="h-4 w-4 mr-2" />
                List Your Items
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-primary">$2.1M+</div>
              <div className="text-muted-foreground">Trading Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-secondary">15,000+</div>
              <div className="text-muted-foreground">Items Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-primary">99.9%</div>
              <div className="text-muted-foreground">Privacy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;