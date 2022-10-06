import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import Header from "../components/header";
import { Chain, RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, configureChains, defaultChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const localChain: Chain = {
  id: 31337,
  name: 'LocalHost',
  network: 'Hardhat',
  iconUrl: 'https://seeklogo.com/images/H/hardhat-logo-888739EBB4-seeklogo.com.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'http://127.0.0.1:8545/',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
};
const { chains, provider, webSocketProvider } = configureChains(
  [
    localChain,
    chain.polygonMumbai,
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.rinkeby,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Header />
          <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
