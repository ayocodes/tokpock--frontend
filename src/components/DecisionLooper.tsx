import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";

interface IDestinyTreeItem {
  id: string;
  type: string;
  question?: string;
  inputs?: IInput[];
  responses: IResponse[];
}

interface IResponse {
  response: string;
  action: () => string;
}

interface IInput {
  id: string;
  name: string;
  placeholder: string;
  type: string;
}

interface IDecisionLooper {
  navigating: boolean;
  choiceId: string;
  destinyTree: IDestinyTreeItem[];
  choiceState: IChoiceState;
  setChoiceState: ISetChoiceState;
  setChoiceId(x: string): void;
  setChoiceIdHistory: Dispatch<SetStateAction<string[]>>;
  setNavigating(x: boolean): void;
  pruneState: any;
}

interface IQuestionUI {
  question: string;
}

interface IResponseButtonsUI {
  responses: IResponse[];
  choiceState: IChoiceState;
  setChoiceState: ISetChoiceState;
  choiceId: string;
  setChoiceId(x: string): void;
  pruneState: any;
  setNavigating(x: boolean): void;
}

interface IInputUI {
  inputs: IInput[];
  choiceState: IChoiceState;
  setChoiceState: ISetChoiceState;
}

interface ISetChoiceState {
  (x: (x: IChoiceState) => IChoiceState): void;
}

interface IChoiceState {
  [key: string | number]: string;
}

interface ISetChoiceIdHistory {
  (x: (x: string[]) => string[]): void;
}

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
}: IDecisionLooper) => {
  useEffect(() => {
    !navigating &&
      setChoiceIdHistory((prevState) => {
        return [...prevState, choiceId];
      });
  }, [choiceId, navigating, setChoiceIdHistory, setNavigating]);

  if (choiceId === "end") return <></>;

  const choice = destinyTree.find((e) => e.id === choiceId);

  if (!choice) throw new Error("Choice not found");

  const { type, question, responses, inputs } = choice;

  let ui;

  switch (type) {
    case "question":
      ui = (
        <>
          <QuestionUI question={question || ""} />
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
            inputs={inputs || []}
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

const QuestionUI = ({ question }: IQuestionUI) => {
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
}: IResponseButtonsUI) => {
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

          if (newChoiceId == "end") return;

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

const InputUI = ({ inputs, choiceState, setChoiceState }: IInputUI) => {
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
          setChoiceState((prevState: IChoiceState) => {
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

export default DecisionLooper;
