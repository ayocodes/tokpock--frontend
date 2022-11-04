import algosdk from "algosdk";
import { useCallback, useState } from "react";
import { Tokpock } from "../beaker/tokpock_client";
import { MyAlgoSession } from "../wallets/myalgo";
var sha512_256 = require("js-sha512").sha512_256;

console.log(sha512_256);

const DeployWallet = ({
  amount,
  accountName,
  password,
  personalEmail,
  receiversEmail,
}: {
  amount: number;
  accountName: string;
  password: string;
  personalEmail: string;
  receiversEmail: string;
}) => {
  const [connected, setConnected] = useState(false);
  const [logs, setLogs] = useState("");
  const [transComplete, setTransComplete] = useState(false);
  const [transaction, setTransaction] = useState({
    appId: "",
    appAddress: "",
    txId: "",
  });

  const myAlgo = new MyAlgoSession();

  const algodClient = new algosdk.Algodv2(
    "",
    "https://testnet-api.algonode.cloud",
    ""
  );

  const signer = useCallback(
    async (txns: algosdk.Transaction[]) => {
      const sTxns = await myAlgo.signTxns(txns);
      return sTxns.map((s: any) => s.blob);
    },
    [myAlgo]
  );

  const runTransaction = async () => {
    await myAlgo.getAccounts();
    const accounts = myAlgo.accounts;

    if (!accounts?.length) return;

    setConnected(true);

    const appClient = new Tokpock({
      client: algodClient,
      signer: signer,
      sender: accounts[0].address,
    });

    console.log("what");
    console.log(appClient);
    console.log("is this");

    //----------------------------------------------------------------------------------
    // Create App
    const { appId, appAddress, txId } = await appClient.create();
    console.log(
      `Created app ${appId} with address ${appAddress} in tx ${txId}`
    );

    //----------------------------------------------------------------------------------
    // Create payment
    const payment = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      suggestedParams: await algodClient.getTransactionParams().do(),
      amount: amount,
      from: accounts[0].address,
      to: algosdk.getApplicationAddress(appId),
    });

    //----------------------------------------------------------------------------------
    // Create password hash
    const password_hash = sha512_256.array(password);

    //----------------------------------------------------------------------------------
    // Initialize wallet
    await appClient.init_wallet({
      payment,
      manager: "", // TODO:
      account_name: accountName,
      password_hash,
    });
    console.log("initialized the wallet");
  };

  if (!connected) {
    return (
      <div>
        <button onClick={async () => await runTransaction()}>
          Connect Wallet
        </button>
      </div>
    );
  }

  return transComplete ? (
    <>
      <div>showingLogs: {logs}</div>
    </>
  ) : (
    <>
      Wallet app created with id {transaction.appId} and address{" "}
      {transaction.appAddress} in tx {transaction.txId}. See it{" "}
      <a href="https://testnet.algoexplorer.io/application/${appId}">here</a>
    </>
  );
};

export default DeployWallet;
