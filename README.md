# Wallet Connector Demo
This demo showcases the available wallet connectors for Algorand Dapps. They include,

1. [Pera Algo Wallet](https://github.com/perawallet/connect)
2. [Defly Wallet](https://github.com/blockshake-io/defly-connect)
3. [Walletconnect](https://developer.algorand.org/docs/get-details/walletconnect/)
4. Sandbox (kmd)

Walletconnect is previously used to connect to Pera Algo Wallet, but Pera Algo Wallet has since introduced their own library to do the same.

Please create your sender and receiver accounts on those wallets first. Use the [dispenser](https://bank.testnet.algorand.network/) to fund your sender account.

## Sandbox
Please ensure that your sandbox is up and running before connecting to sandbox.

## Switching to TestNet

Also, do switch the Algorand network to TestNet on both Pera and Defly app before using the demo.

- Pera: Settings > Developer Settings > Node Settings > TestNet
- Defly: More > Preferences > Advanced > Developer Mode > TestNet

Change the network variable `NEXT_PUBLIC_NETWORK` in the `.env` file from `SandNet` to `TestNet` before deploying the Dapp.

## Setup instructions

1. Install packages
```
yarn install
```

2. Copy `.env.example` to `.env`.

3. Set env var
```
source .env
```

4. Run the Dapp on localhost
```
yarn dev
```
