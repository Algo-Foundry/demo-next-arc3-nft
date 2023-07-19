import "@/styles/globals.css";
import {
  reconnectProviders,
  useInitializeProviders,
  WalletProvider,
  PROVIDER_ID,
} from "@txnlab/use-wallet";
import { useEffect } from "react";
import { getNetworkCredentials } from "../clients";
import { PeraWalletConnect } from "@perawallet/connect";
import { DeflyWalletConnect } from "@blockshake/defly-connect";

const network = process.env.NEXT_PUBLIC_NETWORK || "SandNet";
const cred = getNetworkCredentials(network);

export default function App({ Component, pageProps }) {
  const providers = useInitializeProviders({
    providers: [
      {
        id: PROVIDER_ID.PERA,
        clientStatic: PeraWalletConnect,
      },
      {
        id: PROVIDER_ID.DEFLY,
        clientStatic: DeflyWalletConnect,
      },
      {
        id: PROVIDER_ID.KMD,
      },
    ],
    nodeConfig: {
      network: network.toLowerCase(), //betanet, testnet, mainnet, sandnet
      nodeServer: cred.algod.address || "",
      nodeToken: cred.algod.token || "",
      nodePort: cred.algod.port || "",
    },
  });
  useEffect(() => {
    reconnectProviders(providers);
  }, []);

  return (
    <WalletProvider value={providers}>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

