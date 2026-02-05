// Chain configuration for Base Sepolia
export const BASE_SEPOLIA_CHAIN_ID = 84532;

export const BASE_SEPOLIA_CONFIG = {
    chainId: `0x${BASE_SEPOLIA_CHAIN_ID.toString(16)}`,
    chainName: 'Base Sepolia',
    nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: [process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC || 'https://sepolia.base.org'],
    blockExplorerUrls: [process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://sepolia.basescan.org'],
};

export const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS || '';

// Helper to format addresses
export const formatAddress = (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Helper to format ETH values
export const formatEth = (wei: bigint, decimals: number = 4): string => {
    const eth = Number(wei) / 1e18;
    return eth.toFixed(decimals);
};

// Helper to check if wallet is connected
export const isWalletConnected = (): boolean => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};
