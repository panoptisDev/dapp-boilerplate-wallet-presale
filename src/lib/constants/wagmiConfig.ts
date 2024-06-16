// Raimbow Kit
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  bitgetWallet,
  bifrostWallet,
  bitskiWallet,
  braveWallet,
  coinbaseWallet,
  coin98Wallet,
  coreWallet,
  dawnWallet,
  enkryptWallet,
  foxWallet,
  frameWallet,
  frontierWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  mewWallet,
  okxWallet,
  omniWallet,
  oneKeyWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  safeheronWallet,
  tahoWallet,
  talismanWallet,
  tokenaryWallet,
  tokenPocketWallet,
  trustWallet,
  uniswapWallet,
  walletConnectWallet,
  xdefiWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";

// Wagmi
import { http } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  polygonAmoy,
  sepolia,
  zora,
} from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID || "";

//const { wallets } = getDefaultWallets();
const wallets = [
  //...getDefaultWallets().wallets,
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet,
      rainbowWallet,
      rabbyWallet,
      ledgerWallet,
      walletConnectWallet,
      phantomWallet,
      coinbaseWallet,
      coin98Wallet,
      trustWallet,
      uniswapWallet,
    ],
  },
  {
    groupName: "Other Wallets",
    wallets: [
      argentWallet,
      bitgetWallet,
      bifrostWallet,
      bitskiWallet,
      braveWallet,
      coreWallet,
      dawnWallet,
      enkryptWallet,
      foxWallet,
      frameWallet,
      frontierWallet,
      imTokenWallet,
      injectedWallet,
      mewWallet,
      okxWallet,
      omniWallet,
      oneKeyWallet,
      safeWallet,
      safeheronWallet,
      tahoWallet,
      talismanWallet,
      tokenaryWallet,
      tokenPocketWallet,
      xdefiWallet,
      zerionWallet,
    ],
  },
];
/*
// Define the Polygon Amoy Testnet
const amoy = {
  id: 'amoy',
  name: 'Polygon Amoy Testnet',
  shortName: 'Amoy',
  chainId: 80002, // Replace with the correct chainId if it's different
  network: 'amoy', // Add the network property
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 }, // Add the nativeCurrency property
  rpcUrls: ['https://rpc-amoy.polygon.technology'], // Change rpc to rpcUrls
  blockExplorerUrls: ['https://amoy.polygonscan.com/'], // Add blockExplorerUrls property
};
*/
export const wagmiConfig = getDefaultConfig({
  appName: "Next dApp Template",
  projectId: projectId,
  wallets: wallets,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    polygonAmoy,

    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia, polygonAmoy] : []),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [zora.id]: http(),
    [polygonAmoy.id]: http(),
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
});
