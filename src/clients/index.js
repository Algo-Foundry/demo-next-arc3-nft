import algosdk from "algosdk";

const getNetworkCredentials = (network) => {
    let algod_token = process.env.NEXT_PUBLIC_ALGOD_TOKEN;
    let algod_address = process.env.NEXT_PUBLIC_ALGOD_ADDRESS;
    let algod_port = process.env.NEXT_PUBLIC_ALGOD_PORT;

    let kmd_token = process.env.NEXT_PUBLIC_KMD_TOKEN;
    let kmd_address = process.env.NEXT_PUBLIC_KMD_SERVER;
    let kmd_port = process.env.NEXT_PUBLIC_KMD_PORT;

    let indexer_token = process.env.NEXT_PUBLIC_INDEXER_TOKEN;
    let indexer_address = process.env.NEXT_PUBLIC_INDEXER_SERVER;
    let indexer_port = process.env.NEXT_PUBLIC_INDEXER_PORT;

    switch (network) {
        case "TestNet":
            // is token json?
            if (process.env.NEXT_PUBLIC_ALGOD_TOKEN_TESTNET !== undefined) {
                try {
                    algod_token = JSON.parse(process.env.NEXT_PUBLIC_ALGOD_TOKEN_TESTNET);
                } catch (e) {
                    algod_token = process.env.NEXT_PUBLIC_ALGOD_TOKEN_TESTNET;
                }
            }

            algod_address = process.env.NEXT_PUBLIC_ALGOD_ADDRESS_TESTNET;
            algod_port = process.env.NEXT_PUBLIC_ALGOD_PORT_TESTNET;

            // is token json?
            if (process.env.NEXT_PUBLIC_INDEXER_TOKEN_TESTNET !== undefined) {
                try {
                    indexer_token = JSON.parse(process.env.NEXT_PUBLIC_INDEXER_TOKEN_TESTNET);
                } catch (e) {
                    indexer_token = process.env.NEXT_PUBLIC_INDEXER_TOKEN_TESTNET;
                }
            }
            indexer_address = process.env.NEXT_PUBLIC_INDEXER_ADDRESS_TESTNET;
            indexer_port = process.env.NEXT_PUBLIC_INDEXER_PORT_TESTNET;

            //no access to kmd for testnet
            kmd_token = "";
            kmd_address = "";
            kmd_port = "";

            break;
        default:
            break;
    }

    return {
        algod: {
            token: algod_token,
            address: algod_address,
            port: algod_port,
        },
        kmd: {
            token: kmd_token,
            address: kmd_address,
            port: kmd_port,
        },
        indexer: {
            token: indexer_token,
            address: indexer_address,
            port: indexer_port,
        }
    };
};

const getAlgodClient = (network) => {
    const { algod } = getNetworkCredentials(network);

    if (algod.token === undefined || algod.address === undefined || algod.port === undefined) {
        throw new Error("Invalid Algod Credentials!");
    }

    const algodClient = new algosdk.Algodv2(algod.token, algod.address, algod.port);

    return algodClient;
};

const getKmdClient = (network) => {
    if (network === "TestNet" || network === "MainNet") return;

    const { kmd } = getNetworkCredentials(network);

    if (kmd.token === undefined) throw new Error("Unable to init KMD Client");
    
    const kmdClient = new algosdk.Kmd(
        kmd.token,
        kmd.address,
        kmd.port
    );

    return kmdClient;
};

const getIndexerClient = (network) => {
    const { indexer } = getNetworkCredentials(network);

    if (indexer.token === undefined) throw new Error("Unable to init Indexer Client");

    const indexerClient = new algosdk.Indexer(
        indexer.token,
        indexer.address,
        indexer.port
    );

    return indexerClient;
};

export {
    getAlgodClient,
    getNetworkCredentials,
    getKmdClient,
    getIndexerClient
};
