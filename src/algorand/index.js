import algosdk from "algosdk";

const getPaymentTxn = async (algodClient, from, to, amount) => {
  const suggestedParams = await algodClient.getTransactionParams().do();

  return algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from,
    to,
    amount,
    suggestedParams
  });
}

const getCreateNftTxn = async (algodClient, from, assetName, defaultFrozen, unitName, assetURL) => {
  const suggestedParams = await algodClient.getTransactionParams().do();

  // txn to create a pure nft
  return algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from,
    assetName,
    total: 1,
    decimals: 0,
    defaultFrozen,
    unitName,
    assetURL,
    suggestedParams
  });
}

const signAndSubmit = async (algodClient, txns, signer) => {
  // used by backend to sign and submit txns
  const groupedTxns = algosdk.assignGroupID(txns);

  const signedTxns = groupedTxns.map(txn => txn.signTxn(signer.sk));

  const response = await algodClient.sendRawTransaction(signedTxns).do();

  const confirmation = await algosdk.waitForConfirmation(algodClient, response.txId, 4);

  return {
    response,
    confirmation
  };
}

export {
  getPaymentTxn,
  getCreateNftTxn,
  signAndSubmit
}