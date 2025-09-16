import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Veil Trade',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'your_walletconnect_project_id',
  chains: [sepolia],
  ssr: false,
});
