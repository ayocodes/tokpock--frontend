import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";

const SCard = styled.div`
  background: linear-gradient(180deg, #3e404b 0%, #232429 100%);
  width: 20rem;
  height: 29rem;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 0;
  position: relative;
`;

const STitle = styled.p`
  font-size: 1rem;
  mix-blend-mode: overlay;
  margin-top: 15px;
  /* padding-bottom: 0.3rem; */
`;

const SQA = styled.p`
  font-size: 1.4rem;
  /* padding-bottom: 1rem; */
  margin: 3px 0 10px;
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

const Exp = () => {
  const [choiceState, setChoiceState] = useState({});
  const [choiceId, setChoiceId] = useState("genesis");
  const [navigating, setNavigating] = useState(false);
  const [choiceIdHistory, setChoiceIdHistory] = useState([]);

  const navigator = useCallback(
    (action) => {
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

        default:
          break;
      }

      prevIdIndex >= 0 && setChoiceId(newChoiceId);
    },
    [choiceId, choiceIdHistory]
  );

  const pruneState = useCallback(
    ({ choiceId }) => {
      const length = choiceIdHistory.length;
      const index = choiceIdHistory.findIndex((x) => x === choiceId);
      const paddedIndex = index + 1;
      choiceIdHistory.splice(paddedIndex, length - paddedIndex);
      setChoiceIdHistory(choiceIdHistory);
    },
    [choiceIdHistory]
  );

  return (
    <SBox>
      <SButtonLeft onClick={() => navigator("backward")} />
      <SCard>
        {/* <p>{choiceIdHistory.join(", ")}</p> */}
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
      </SCard>
      <SButtonRight onClick={() => navigator("forward")} />
    </SBox>
  );
};

const DecisionLooper = ({
  navigating,
  choiceId,
  destinyTree,
  choiceState,
  setChoiceState,
  setChoiceId,
  setChoiceIdHistory,
  setNavigating,
  pruneState,
}) => {
  useEffect(() => {
    !navigating &&
      setChoiceIdHistory((prevState) => {
        return [...prevState, choiceId];
      });
  }, [choiceId, navigating, setChoiceIdHistory, setNavigating]);

  const choice = destinyTree.find((e) => e.id === choiceId);
  const { type, question, responses, inputs } = choice;

  let ui;

  switch (type) {
    case "question":
      ui = (
        <>
          <QuestionUI question={question} />
          <ResponseButtonsUI
            responses={responses}
            choiceState={choiceState}
            setChoiceState={setChoiceState}
            choiceId={choiceId}
            setChoiceId={setChoiceId}
            setNavigating={setNavigating}
            pruneState={pruneState}
          />
        </>
      );
      break;

    case "input":
      ui = (
        <>
          <InputUI
            inputs={inputs}
            choiceState={choiceState}
            setChoiceState={setChoiceState}
          />
          <ResponseButtonsUI
            responses={responses}
            choiceState={choiceState}
            setChoiceState={setChoiceState}
            choiceId={choiceId}
            setChoiceId={setChoiceId}
            setNavigating={setNavigating}
            pruneState={pruneState}
          />
        </>
      );
      break;

    default:
      ui = <></>;
      break;
  }

  return ui;
};

const QuestionUI = ({ question }) => {
  return (
    <div>
      <STitle>Question</STitle>
      <SQA>{question}</SQA>
    </div>
  );
};

const ResponseButtonsUI = ({
  responses,
  choiceState,
  setChoiceState,
  choiceId,
  setChoiceId,
  pruneState,
  setNavigating,
}) => {
  const responseButtons = responses.map((element, index) => {
    const globalId = `buttonID-${choiceId}-${index}`;
    const inState = choiceState[choiceId] === globalId;

    return (
      <SResponseButton
        key={globalId}
        style={{ border: !!inState ? "2px purple solid" : "0px" }}
        onClick={() => {
          // Tells DecisionLooper TO include newChoiceId into setChoiceIdHistory.
          // The intent is to make a new choice EXCEPT if the choice was prev made.
          inState ? setNavigating(true) : setNavigating(false);

          // If a user goes back in their choice id history and presses another action,
          // pruneState() clears all the choice ids ahead of it in the history array,
          // but if the user re-selects a prev selected button the pruning is ignored.
          !inState && pruneState({ choiceId });

          const newChoiceId = element.action();

          setChoiceId(newChoiceId);

          setChoiceState((prevState) => {
            return {
              ...prevState,
              [choiceId]: globalId,
            };
          });
        }}
      >
        {element.response}
      </SResponseButton>
    );
  });

  return (
    <div>
      <STitle>Response</STitle>
      <div>{responseButtons}</div>
    </div>
  );
};

const InputUI = ({ inputs, choiceState, setChoiceState }) => {
  const inputUI = inputs.map((element) => {
    const { id, name, placeholder, type } = element;

    return (
      <SInput
        key={id}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={choiceState[id] || ""}
        onChange={(e) => {
          setChoiceState((prevState) => {
            return { ...prevState, [id]: e.target.value };
          });
        }}
      />
    );
  });

  return (
    <div>
      <STitle>Fill in</STitle>
      <div>{inputUI}</div>
    </div>
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
        placeholder: "amount to send",
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
        type: "string",
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
    question: "Will you like us to send you an email of your credential's?",
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
      }
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
          return "genesis";
        },
      },
    ],
  },
  {
    id: "5",
    type: "question",
    question: "Will you provide their email so we send them their wallet credentials?",
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
        placeholder: "amount to send",
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
        type: "string",
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
  }
];

export default Exp;
