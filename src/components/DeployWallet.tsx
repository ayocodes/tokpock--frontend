import algosdk, { AtomicTransactionComposer, Transaction } from "algosdk";
import { useCallback, useMemo, useState } from "react";
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

const SInput = styled.input`
  border: 2px solid #626575;
  font-size: 16px;
  padding: 0 1rem;
  margin: 10px 0;
  width: 100%;
  height: 3em;
  border-radius: 0.5rem;
  background-color: transparent;
  resize: none;
  outline: none;
  color: white;
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
    sk: "",
  });

  const myAlgo = useMemo(() => new MyAlgoSession(), []);

  const algodClient = useMemo(
    () => new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", ""),
    []
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
      return [...prev, `Creating Wallet...`];
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

    const sk_hex = Buffer.from(manager.sk).toString("hex");

    setTransaction((prev) => {
      return { ...prev, sk: sk_hex };
    });

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

    if (personalEmail || receiversEmail) {
      setLogs((prev) => {
        return [...prev, `Sending Mail...`];
      });

      const hostname = window.location.hostname;
      const message = `${hostname}/withdraw?id=${appId}&manager=${sk_hex}`;

      const mail = {
        email: personalEmail || receiversEmail,
        config: {
          message: `You can access funds and withdraw from your Tokpock Wallet! ${message}`,
        },
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mail),
      };

      await fetch(
        "https://rainy-necessary-trawler.glitch.me/api/send-mail",
        options
      ).catch((e) => {
        console.log(e);
      });

      setLogs((prev) => {
        return [...prev, `Transaction Successful!`];
      });
    }

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
    <div>
      <SP>Save your Wallet Id</SP>
      <SInput disabled={true} value={transaction.appId} />
      <SP>Save your Manager</SP>
      <SInput disabled={true} value={transaction.sk} />
      <a href={href}>View transaction</a>
    </div>
  ) : (
    <SCenter>
      <SP>{logs[logs.length - 1]}</SP>
    </SCenter>
  );
};

export default DeployWallet;
