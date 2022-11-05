import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import DecisionLooper from "./DecisionLooper";
import DeployWallet from "./DeployWallet";

interface IChoiceState {
  amount: string;
  accountName: string;
  password: string;
  personalEmail: string;
  receiversEmail: string;
}

const SCard = styled.div`
  background: linear-gradient(180deg, #3e404b 0%, #232429 100%);
  width: 20rem;
  height: 29rem;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 0;
  position: relative;
`;

const SButton = styled.div`
  background: linear-gradient(180deg, #3e404b 0%, #232429 100%);
  width: 1.5rem;
  cursor: pointer;
  flex: 1;
`;

const SButtonLeft = styled(SButton)`
  border-radius: 1.5rem 0 0 1.5rem;
`;
const SButtonRight = styled(SButton)`
  border-radius: 0 1.5rem 1.5rem 0;
`;

const SBox = styled.div`
  display: flex;
  width: 23rem;
`;

const Question = () => {
  const [choiceState, setChoiceState] = useState<IChoiceState>({
    amount: "",
    accountName: "",
    password: "",
    personalEmail: "",
    receiversEmail: "",
  });
  const [choiceId, setChoiceId] = useState("genesis");
  const [navigating, setNavigating] = useState(false);
  const [choiceIdHistory, setChoiceIdHistory] = useState([]);

  console.log(choiceState);
  console.log(choiceIdHistory);

  const navigator = useCallback(
    (action: string) => {
      let prevIdIndex;
      let newChoiceId;

      // Tells DecisionLooper NOT to include newChoiceId into setChoiceIdHistory.
      // The intent is to view previously selected choices.
      setNavigating(true);

      switch (action) {
        case "backward":
          prevIdIndex = choiceIdHistory.findIndex((id) => id === choiceId);
          newChoiceId = choiceIdHistory[prevIdIndex - 1];
          break;

        case "forward":
          prevIdIndex = choiceIdHistory.findIndex((id) => id === choiceId);
          newChoiceId =
            choiceIdHistory[
              prevIdIndex + 1 > choiceIdHistory.length - 1
                ? choiceIdHistory.length - 1
                : prevIdIndex + 1
            ];
          break;

        case "freeze":
          prevIdIndex = choiceIdHistory.findIndex((id) => id === choiceId);
          newChoiceId = choiceIdHistory[prevIdIndex];
          break;

        default:
          prevIdIndex = 0;
          newChoiceId = "";
          break;
      }

      if (prevIdIndex > 0) {
        setChoiceId(newChoiceId);
      } else if (action === "forward") {
        setChoiceId(newChoiceId);
      }
    },
    [choiceId, choiceIdHistory]
  );

  const pruneState = useCallback(
    ({ choiceId }: { choiceId: string }) => {
      const length = choiceIdHistory.length;
      const index = choiceIdHistory.findIndex((x) => x === choiceId);
      const paddedIndex = index + 1;
      choiceIdHistory.splice(paddedIndex, length - paddedIndex);
      setChoiceIdHistory(choiceIdHistory);
    },
    [choiceIdHistory]
  );

  const theEnd = useMemo(() => {
    return choiceId === "end";
  }, [choiceId]);

  return (
    <SBox>
      <SButtonLeft onClick={() => navigator(theEnd ? "freeze" : "backward")} />
      <SCard>
        {/* <p>{choiceIdHistory.join(", ")}</p> */}
        {(() => {
          let active;
          if (theEnd) {
            active = (
              <DeployWallet
                amount={choiceState.amount}
                accountName={choiceState.accountName}
                password={choiceState.password}
                personalEmail={choiceState.personalEmail}
                receiversEmail={choiceState.receiversEmail}
              />
            );
          } else {
            active = (
              <DecisionLooper
                navigating={navigating}
                choiceId={choiceId}
                destinyTree={destinyTree}
                choiceState={choiceState}
                setChoiceState={setChoiceState}
                setChoiceId={setChoiceId}
                setChoiceIdHistory={setChoiceIdHistory}
                setNavigating={setNavigating}
                pruneState={pruneState}
              />
            );
          }
          return active;
        })()}
      </SCard>
      <SButtonRight onClick={() => navigator(theEnd ? "freeze" : "forward")} />
    </SBox>
  );
};

const destinyTree1 = [
  {
    id: "genesis",
    type: "question",
    question: "Are you hungry?",
    responses: [
      {
        response: "Yes",
        action: () => {
          console.log("I want to eat!!!! I'm Hungry 😋");
          return "1";
        },
      },
      {
        response: "No",
        action: () => {
          console.log("I'm fine I just need to use your restroom 🚽");
          return "4";
        },
      },
    ],
  },
  {
    id: "1",
    type: "question",
    question: "would you like rice or fries",
    responses: [
      {
        response: "Rice is fine",
        action: () => {
          console.log("I did enjoy my rice! 🍚");
          return "2";
        },
      },
      {
        response: "Some fries please",
        action: () => {
          console.log("I need more thanks! 🍟");
          return "2";
        },
      },
      {
        response: "None!",
        action: () => {
          console.log("Anything else! I can't believe that's all you have! 😤");
          return "3";
        },
      },
    ],
  },
  {
    id: "2",
    type: "question",
    question: "Are you're satisfied",
    responses: [
      {
        response: "Yes",
        action: () => {
          console.log("Thanks I'm fine! 😊");
          return "genesis";
        },
      },
    ],
  },
  {
    id: "3",
    type: "question",
    question: "We're so sorry, about that",
    responses: [
      {
        response: "Bye",
        action: () => {
          console.log("it's fine 😞");
          return "genesis";
        },
      },
    ],
  },
  {
    id: "4",
    type: "input",
    inputs: [
      {
        id: "email",
        name: "Email",
        placeholder: "Receivers email",
        type: "email",
      },
      { id: "id", name: "Age", type: "number" },
    ],
    responses: [
      {
        response: "Continue",
        action: () => {
          console.log("it's fine 😞");
          return "genesis";
        },
      },
    ],
  },
];

const destinyTree = [
  {
    id: "genesis",
    type: "question",
    question: "Are you creating this wallet for yourself or someone else",
    responses: [
      {
        response: "For myself",
        action: () => {
          return "1";
        },
      },
      {
        response: "For someone else",
        action: () => {
          return "5";
        },
      },
    ],
  },
  {
    id: "1",
    type: "input",
    inputs: [
      {
        id: "amount",
        name: "Amount",
        placeholder: "amount of algos to send",
        type: "number",
      },
      {
        id: "accountName",
        name: "AccountName",
        placeholder: "account name",
        type: "string",
      },
      {
        id: "password",
        name: "Password",
        placeholder: "password",
        type: "password",
      },
    ],
    responses: [
      {
        response: "Continue",
        action: () => {
          return "2";
        },
      },
    ],
  },
  {
    id: "2",
    type: "question",
    question: "Will you like us to send you an email of your credentials?",
    responses: [
      {
        response: "Yes",
        action: () => {
          return "3";
        },
      },
      {
        response: "No",
        action: () => {
          return "4";
        },
      },
    ],
  },
  {
    id: "3",
    type: "input",
    inputs: [
      {
        id: "personalEmail",
        name: "PersonalEmail",
        placeholder: "email",
        type: "email",
      },
    ],
    responses: [
      {
        response: "Continue",
        action: () => {
          return "4";
        },
      },
    ],
  },
  {
    id: "4",
    type: "question",
    question: "Alright, let's create your wallet!",
    responses: [
      {
        response: "Create wallet",
        action: () => {
          return "end";
        },
      },
    ],
  },
  {
    id: "5",
    type: "question",
    question:
      "Will you provide their email so we send them their wallet credentials?",
    responses: [
      {
        response: "Yes",
        action: () => {
          return "6";
        },
      },
      {
        response: "No",
        action: () => {
          return "7";
        },
      },
    ],
  },
  {
    id: "6",
    type: "input",
    inputs: [
      {
        id: "receiversEmail",
        name: "ReceiversEmail",
        placeholder: "Receivers email",
        type: "email",
      },
    ],
    responses: [
      {
        response: "Continue",
        action: () => {
          return "7";
        },
      },
    ],
  },
  {
    id: "7",
    type: "input",
    inputs: [
      {
        id: "amount",
        name: "Amount",
        placeholder: "amount of algos to send",
        type: "number",
      },
      {
        id: "accountName",
        name: "AccountName",
        placeholder: "account name",
        type: "string",
      },
      {
        id: "password",
        name: "Password",
        placeholder: "password",
        type: "password",
      },
    ],
    responses: [
      {
        response: "Continue",
        action: () => {
          return "4";
        },
      },
    ],
  },
];

export default Question;
