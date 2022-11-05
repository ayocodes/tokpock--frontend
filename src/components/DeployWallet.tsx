import algosdk, { AtomicTransactionComposer, Transaction } from "algosdk";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { Tokpock } from "../beaker/tokpock_client";
import { MyAlgoSession } from "../wallets/myalgo";
var sha512_256 = require("js-sha512").sha512_256;

interface IDeployWallet {
  amount: string;
  accountName: string;
  password: string;
  personalEmail: string;
  receiversEmail: string;
}

const SResponseButton = styled.div`
  height: 3rem;
  /* padding: 5px 0; */
  width: 100%;
  margin: 10px 0;
  background: #565967;
  color: white;
  border-radius: 10px;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const SCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SP = styled.p`
  font-size: 1rem;
`;

const DeployWallet = ({
  amount,
  accountName,
  password,
  personalEmail,
  receiversEmail,
}: IDeployWallet) => {
  const [connected, setConnected] = useState(false);
  const [logs, setLogs] = useState<string[]>([""]);
  const [transComplete, setTransComplete] = useState(false);
  const [transaction, setTransaction] = useState({
    appId: 0,
    appAddress: "",
    createTxId: "",
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
    const suggestedParams = await algodClient.getTransactionParams().do();

    if (!accounts?.length) return;

    setConnected(true);

    //----------------------------------------------------------------------------------
    // Instantiate Tokpock
    const appClient = new Tokpock({
      client: algodClient,
      signer: signer,
      sender: accounts[0].address,
    });

    setLogs((prev) => {
      return [
        ...prev,
        `Creating Wallet...`,
      ];
    });

    //----------------------------------------------------------------------------------
    // Create App
    const { appId, appAddress, txId: createTxId } = await appClient.create();

    setTransaction((prev) => {
      return { ...prev, appId, appAddress, createTxId };
    });

    setLogs((prev) => {
      return [
        ...prev,
        `Created app ${appId} with address ${appAddress} in tx ${createTxId}`,
      ];
    });

    setLogs((prev) => {
      return [...prev, `Creating Deposit Tx...`];
    });

    console.log(
      `Created app ${appId} with address ${appAddress} in tx ${createTxId}`
    );

    console.log(parseFloat(amount) * 1000000);
    console.log(parseFloat(amount));
    console.log(amount);

    //----------------------------------------------------------------------------------
    // Create Deposit Tx
    const deposit = {
      txn: new Transaction({
        amount: parseFloat(amount) * 1000000,
        from: accounts[0].address,
        to: algosdk.getApplicationAddress(appId),
        ...suggestedParams,
      }),
      signer,
    };

    setLogs((prev) => {
      return [...prev, `Creating Password Hash...`];
    });

    //----------------------------------------------------------------------------------
    // Create Password Hash
    const password_hash = sha512_256.array(password);

    //----------------------------------------------------------------------------------
    // Create Account Manager
    var manager = algosdk.generateAccount();

    setLogs((prev) => {
      return [...prev, `Created Account Manager ${manager}...`];
    });

    //----------------------------------------------------------------------------------
    // Start Atomic Transfer
    const atc = new AtomicTransactionComposer();

    // Utility function to return an ABIMethod by its name
    function getMethodByName(name: string): algosdk.ABIMethod {
      const m = appClient.methods.find((mt: algosdk.ABIMethod) => {
        return mt.name == name;
      });
      if (m === undefined) throw Error("Method undefined: " + name);
      return m;
    }

    // Initialize Manager
    atc.addTransaction({
      txn: new Transaction({
        from: accounts[0].address,
        to: manager.addr,
        amount: 400000,
        ...suggestedParams,
      }),
      signer,
    });

    // Initialize Wallet
    atc.addMethodCall({
      method: getMethodByName("init_wallet"),
      methodArgs: [deposit, manager.addr, accountName, password_hash],
      appID: appId,
      sender: accounts[0].address,
      suggestedParams,
      signer,
    });

    setLogs((prev) => {
      return [...prev, `Initializing Wallet...`];
    });

    const result = await atc.execute(algodClient, 2);

    for (const idx in result.methodResults) {
      console.log(result.methodResults[idx]);
    }

    setLogs((prev) => {
      return [...prev, `Deploy Successful!`];
    });

    setTimeout(() => {
      setTransComplete(true);
    }, 1500);
  };

  if (!connected) {
    return (
      <SCenter>
        <SResponseButton onClick={async () => await runTransaction()}>
          Connect Your Wallet
        </SResponseButton>
      </SCenter>
    );
  }

  const href = `https://testnet.algoexplorer.io/application/${transaction.appId}`;

  return transComplete ? (
    <SCenter>
      <SP>
        Wallet app created with id {transaction.appId} and address{" "}
        {transaction.appAddress} in tx {transaction.createTxId}. See it{" "}
        <a href={href}>here</a>
      </SP>
    </SCenter>
  ) : (
    <SCenter>
      <SP>{logs[logs.length - 1]}</SP>
    </SCenter>
  );
};

export default DeployWallet;
