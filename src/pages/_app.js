import "@/styles/globals.css";
import { reconnectProviders, initializeProviders, WalletProvider, PROVIDER_ID } from "@txnlab/use-wallet";
import { useEffect } from "react";
import { getNetworkCredentials } from "../clients";

const network = process.env.NEXT_PUBLIC_NETWORK || "SandNet";
const cred = getNetworkCredentials(network);

const walletProviders = initializeProviders([PROVIDER_ID.WALLETCONNECT, PROVIDER_ID.PERA, PROVIDER_ID.DEFLY, PROVIDER_ID.KMD], {
    network: network.toLowerCase(), //betanet, testnet, mainnet, sandnet
    nodeServer: cred.algod.address || "",
    nodeToken: cred.algod.token || "",
    nodePort: cred.algod.port || "",
});

export default function App({ Component, pageProps }) {
    useEffect(() => {
        reconnectProviders(walletProviders);
    }, []);

    return (
        <WalletProvider value={walletProviders}>
            <Component {...pageProps} />
        </WalletProvider>
    );
}
