import algosdk from "algosdk";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { Tokpock } from "../beaker/tokpock_client";

const SModal = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(180deg, #292a31 -12.63%, #000000 100%);
  display: grid;
  place-items: center;
  z-index: 2000;
`;

const SWithdraw = styled.div`
  display: flex;
  flex-direction: column;
  width: 24rem;
  background: linear-gradient(180deg, #3e404b 0%, #232429 100%);
  border-radius: 20px;
  padding: 40px;
`;

const STitle = styled.p`
  font-size: 1rem;
  mix-blend-mode: overlay;
  padding-bottom: 10px;
`;

const STextArea = styled.input`
  border: 2px solid #626575;
  height: 50px;
  font-size: 16px;
  padding: 0 0.5rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  background-color: transparent;
  resize: none;
  outline: none;
  color: white;
`;

const SWithdrawBox = styled.div`
  display: grid;
  place-items: center;
  margin-top: 2rem;
`;

const SRing1 = styled.img`
  position: fixed;
  z-index: -1;
  left: 420.36px;
  top: -104.5px;
`;

const SRing2 = styled(SRing1)`
  left: 298.36px;
  top: 230.5px;
`;

const SWithdrawButton = styled.div`
  height: 3rem;
  width: 100%;
  background: #565967;
  border-radius: 10px;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const SButtonText = styled.p`
  color: white;
  font-size: 1.25rem;
  align-items: center;
  font-weight: 400;
`;

const SRingBox = styled.div``;

const Withdrawal = () => {
  const router = useRouter();
  const [walletId, setWalletId] = useState(0);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [manager, setManager] = useState("");

  useEffect(() => {
    const id = router.query.id as string;
    const manager = router.query.manager as string;
    setWalletId(id ? parseFloat(id) : 0);
    setManager(manager ? manager : "");
  }, [router]);

  const algodClient = new algosdk.Algodv2(
    "",
    "https://testnet-api.algonode.cloud",
    ""
  );

  const signer = useCallback(
    async (txnGroup: algosdk.Transaction[], sk: Uint8Array) => {
      const sTxns = txnGroup.map((txn) => {
        let signedTxn = txn.signTxn(sk);
        return signedTxn;
      });
      return sTxns;
    },
    []
  );

  const withdraw = async () => {
    const managerSKUint8 = Uint8Array.from(Buffer.from(manager, "hex"));
    const passphrase = algosdk.secretKeyToMnemonic(managerSKUint8);
    const myAccount = algosdk.mnemonicToSecretKey(passphrase); // TODO: cHange

    const appClient = new Tokpock({
      client: algodClient,
      signer: (txnGroup) => signer(txnGroup, myAccount.sk),
      sender: myAccount.addr,
      appId: walletId,
    });

    try {
      await appClient.claim_funds(
        {
          password,
          account,
        },
        {
          appAccounts: [account],
        }
      );
      alert("Withdrawal Successful! 😄");
    } catch (error) {
      alert("Withdrawal Failed! 😭");
    }
  };

  return (
    <SModal>
      <SRingBox>
        <SRing1 src="ring.svg" alt="" />
        <SRing2 src="ring.svg" alt="" />
      </SRingBox>
      <SWithdraw>
        <STitle>Wallet Id</STitle>
        <STextArea
          id="wallet"
          value={walletId}
          type={"number"}
          onChange={(e) => setWalletId(parseInt(e.target.value))}
        />
        <STitle>Wallet Manager</STitle>
        <STextArea
          id="manager"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
        />
        <STitle>Account To Withdraw To</STitle>
        <STextArea
          id="account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <STitle>Password</STitle>
        <STextArea
          id="password"
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SWithdrawBox>
          <SWithdrawButton>
            <SButtonText onClick={withdraw}>Withdraw</SButtonText>
          </SWithdrawButton>
        </SWithdrawBox>
      </SWithdraw>
    </SModal>
  );
};

export default Withdrawal;
