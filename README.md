# ARC3 NFT Demo
Sample Dapp that deploys and transacts ARC3 NFTs. Allows user to connect to the Dapp and receive NFTs from the deployer.

2 transactions will be performed in order to receive the NFT
1. Asset Opt In from the user
2. Asset Transfer from deployer to user

## Setup instructions

### Install packages
```
yarn install
```

### Update environement variables
1. Copy `.env.example` to `.env.local`.
2. Add your deployer account menmonic and address.
3. Set the network to either `SandNet` or `TestNet`

### Setup Pinata IPFS
1. Create a free account on [Pinata](https://www.pinata.cloud/)
2. Generate API key via account page.
3. Update `.env.local` file with the credentials.

### Deploying Assets
1. Run deployment script to create the ARC3 NFTs. 
```
yarn tsx scripts/deploy.js
```

### Run the Dapp on localhost
```
yarn dev
```

### Pinning content using Pinata
Use the following methods to pin files/folders to IPFS

- [pinFileToIPFS](https://www.npmjs.com/package/@pinata/sdk#pinFileToIPFS) - Pins a file to IPFS.
- [pinFromFS](https://www.npmjs.com/package/@pinata/sdk#pinFromFS) - Pins a directory to IPFS. 

For `pinFromFS`, windows users might encounter an issue where files are pinned to the wrong directory. Additional sub directories were created (i.e. `ipfs://<content_id>/Users/<usersname>/<repo directory>/assets/nft/<asset filename>`) instead of `ipfs://<content_id>/<asset_filename>`. You might need to tweak the image url accordingly in your JSON metadata.

