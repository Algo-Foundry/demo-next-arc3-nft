import * as algotxn from "@/algorand";
import algosdk from "algosdk";
import { PROVIDER_ID, useWallet } from "@txnlab/use-wallet";
import { useState, useEffect } from "react";
import { getAlgodClient } from "../clients";
import Button from "./Button";

export default function Transact() {
  const { activeAddress, signTransactions, sendTransactions, providers } = useWallet();
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [txnref, setTxnRef] = useState("");
  const [network, setNetwork] = useState(process.env.NEXT_PUBLIC_NETWORK || "SandNet");

  const connectedAcc = activeAddress || "";
  const algod = getAlgodClient(network);

  // kmd will default to SandNet
  useEffect(() => {
    const kmdProvider = providers?.find((p) => p.metadata.id === PROVIDER_ID.KMD);
    if (kmdProvider?.isActive) {
      setNetwork("SandNet");
    } else {
      setNetwork(process.env.NEXT_PUBLIC_NETWORK || "SandNet");
    }
  }, [providers]);

  const handleSetAmount = (value) => {
    setAmount(Number(value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const signAndSubmit = async (groupedTxn) => {
      // reset txn ref
      setTxnRef("");

      groupedTxn = algosdk.assignGroupID(groupedTxn);
      const encodedTxns = groupedTxn.map((txn) => algosdk.encodeUnsignedTransaction(txn));

      try {
        const signed = await signTransactions(encodedTxns);
        const res = await sendTransactions(signed, 4);
        setTxnRef(res.txId);
      } catch (err) {
        console.log(err);
      }
    };

    // create txn
    if (!amount) return;
    let payload = [await algotxn.getPaymentTxn(algod, connectedAcc, receiver, Number(amount))];

    // sign txn and submit to chain
    await signAndSubmit(payload);
  };

  return (
    <div className="w-6/12">
      <h1 className="text-5xl mb-4">Send Algos</h1>
      <p className="mb-4">Network: {network}</p>
      {txnref && <p className="mb-4">Txn ID: {txnref} </p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="from">
            From
          </label>
          <input className="w-full" name="from" value={connectedAcc} type="text" placeholder="Sender Address" disabled={true} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="to">
            To
          </label>
          <input
            className="w-full"
            name="to"
            onChange={(e) => setReceiver(e.target.value)}
            value={receiver}
            type="text"
            placeholder="Recipient Address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount (microAlgos)
          </label>
          <input
            className="w-full"
            name="amount"
            onChange={(e) => handleSetAmount(e.target.value)}
            value={amount}
            type="number"
            placeholder="Amount in microAlgos"
          />
        </div>

        <Button label="Submit" type="submit" />
      </form>
    </div>
  );
}
