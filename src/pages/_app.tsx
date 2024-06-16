import React from "react";
import type { AppProps } from "next/app";
// Importing Next Themes
import { ThemeProvider } from "next-themes";
// TanStack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Importing Layout
import Layout from "@/layout";
// Importing Styles
import "@/assets/styles/globals.scss";
// Raimbow Kit
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, lightTheme, Theme } from "@rainbow-me/rainbowkit";
// Wagmi
import { WagmiProvider } from "wagmi";
// Wagmi Config
import { wagmiConfig } from "@/lib/constants/wagmiConfig";
// Merge
import merge from "lodash.merge";

const theme = merge(lightTheme(), {
  colors: {
    accentColor: "#7504cc",
    accentColorForeground: "#b0d2fc",
    actionButtonSecondaryBackground: "#b0d2fc",
    connectButtonBackground: "#0787f1",
    connectButtonBackgroundError: "#215fbd",
    connectButtonInnerBackground: "#0163a5",
    connectButtonText: "#ffffff",
    connectButtonTextError: "#FF494A",
  },
} as Theme);

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={theme} showRecentTransactions={true}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
