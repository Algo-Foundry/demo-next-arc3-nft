# Wallet Connector Demo
This demo showcases the available wallet connectors for Algorand Dapps. They include,

1. [Pera Algo Wallet](https://github.com/perawallet/connect)
2. [Defly Wallet](https://github.com/blockshake-io/defly-connect)
3. [Walletconnect](https://developer.algorand.org/docs/get-details/walletconnect/)
4. Sandbox (kmd)

It uses the [use-wallet](https://github.com/TxnLab/use-wallet) library, which is a react hook that includes the above wallets. 

Please create your sender and receiver accounts on those wallets first. Use the [dispenser](https://bank.testnet.algorand.network/) to fund your sender account.

## Running the demo on SandNet
1. Please ensure that your sandbox is up and running before connecting to sandbox.
2. Change the network variable `NEXT_PUBLIC_NETWORK` in the `.env` file from `TestNet` to `SandNet` before deploying the Dapp.

## Running the demo on TestNet

1. Change the network variable `NEXT_PUBLIC_NETWORK` in the `.env` file from `SandNet` to `TestNet` before deploying the Dapp.
2. Switch the Algorand network to TestNet on both Pera and Defly app if you are connecting to the Dapp with them.

- Pera: Settings > Developer Settings > Node Settings > TestNet
- Defly: More > Preferences > Advanced > Developer Mode > TestNet

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
