# Veil Trade - Encrypted Gaming Asset Marketplace

## Overview

Veil Trade is a revolutionary encrypted gaming asset marketplace that enables private trading of in-game assets using Fully Homomorphic Encryption (FHE). Our platform protects traders from bot front-running and price manipulation while maintaining complete privacy of transaction details.

## Features

- **FHE-Encrypted Trading**: All sensitive trading data is encrypted using Zama's FHE technology
- **Real Wallet Integration**: Connect with popular wallets like Rainbow, MetaMask, and more
- **Privacy Protection**: Trade without revealing your strategies or positions
- **Anti-Frontrunning**: Built-in protection against MEV and bot manipulation
- **Cross-Chain Support**: Trade assets across multiple blockchain networks

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Ethereum (Sepolia Testnet)
- **Encryption**: Zama FHE (Fully Homomorphic Encryption)
- **Wallet Integration**: RainbowKit, Wagmi, Viem

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/KeiraWhite/veil-trade.git

# Navigate to the project directory
cd veil-trade

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## Smart Contracts

The project includes FHE-enabled smart contracts for secure trading:

- **VeilTrade.sol**: Main trading contract with FHE encryption
- **AssetRegistry.sol**: Asset registration and metadata management
- **PrivacyPool.sol**: Privacy-preserving liquidity pools

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── contracts/          # Smart contract interfaces
└── assets/             # Static assets
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred hosting service
# The build files will be in the 'dist' directory
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in this repository
- Join our community discussions
- Contact: support@veiltrade.com

## Roadmap

- [ ] Multi-chain support expansion
- [ ] Advanced FHE features
- [ ] Mobile app development
- [ ] API for third-party integrations
- [ ] Governance token implementation