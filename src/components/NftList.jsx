import NftItem from "./NftItem";
import { useEffect, useState } from "react";
import * as algotxn from "@/algorand";
import { getAlgodClient } from "../clients";
import { useWallet } from "@txnlab/use-wallet";
import algosdk from "algosdk";

const network = process.env.NEXT_PUBLIC_NETWORK || "SandNet";
const algodClient = getAlgodClient(network);

function NftList() {
  const [nfts, setNfts] = useState([]);
  const [txnref, setTxnRef] = useState("");
  const [txnUrl, setTxnUrl] = useState("");
  const { activeAddress, signTransactions, sendTransactions } = useWallet();

  useEffect(() => {
    const loadNfts = async () => {
      const nftList = await algotxn.fetchNFTs(algodClient);
      console.log(nftList);
      setNfts(nftList);
    };

    loadNfts();
  }, []);

  const getTxnRefUrl = (txId) => {
    if (network === "SandNet") {
      return `https://app.dappflow.org/explorer/transaction/${txId}`;
    } else if (network === "TestNet") {
      return `https://testnet.algoexplorer.io/tx/${txId}`;
    }

    return "";
  }

  const getThisNFT = async (assetId) => {
    try {
      // opt into NFT from connected account
      const payload = [await algotxn.getAssetOptInTxn(algodClient, activeAddress, assetId)];
      const groupedTxn = algosdk.assignGroupID(payload);
      const encodedTxns = groupedTxn.map((txn) => algosdk.encodeUnsignedTransaction(txn));
      const signed = await signTransactions(encodedTxns);
      const res = await sendTransactions(signed, 4);

      if (res) {
        // transfer NFT from deployer account
        const { response } = await algotxn.getNFTFromDeployer(algodClient, activeAddress, assetId);
        setTxnRef(response.txId);
        const txnUrl = getTxnRefUrl(response.txId);
        setTxnUrl(txnUrl);
      }

      // refresh the list
      setNfts(() => {
        return nfts.filter(nft => nft.asset["asset-id"] !== assetId);
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {txnref && (
        <p className="mb-4 text-left">
          <a href={txnUrl} target="_blank" className="text-blue-500">
            Tx ID: {txnref}
          </a>
        </p>
      )}
      {nfts.map((item, index) => (
        <NftItem
          key={index}
          src={item.imgUrl}
          metadata={item.metadata}
          assetId={item.asset["asset-id"]}
          onButtonClick={getThisNFT}
        />
      ))}
    </>
  );
}

export default NftList;
