# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## Required Environment Variables

- `VITE_WALLET_CONNECT_PROJECT_ID`: Your WalletConnect Project ID
- `NEXT_PUBLIC_CHAIN_ID`: The blockchain network ID (11155111 for Sepolia)
- `NEXT_PUBLIC_RPC_URL`: RPC endpoint for the blockchain network

## Optional Environment Variables

- `NEXT_PUBLIC_INFURA_API_KEY`: Infura API key for additional RPC endpoints
- `NEXT_PUBLIC_RPC_URL`: Alternative RPC URL

## Setup Instructions

1. Copy the environment variables above
2. Create a `.env.local` file in the project root
3. Paste the variables into the file
4. Save the file
5. Restart your development server

## Security Notes

- Never commit `.env.local` to version control
- Keep your API keys secure
- Use different keys for development and production
