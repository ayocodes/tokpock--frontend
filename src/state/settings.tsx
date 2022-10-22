import { createContext, useReducer } from "react";

const reducer: SettingsReducer = (state, action) => {
  let newState: SettingsState;
  switch (action.type) {
    case settingsActions.CHANGE_INPUT:
      newState = {
        ...state,
        [action.inputPayload!.name]: action.inputPayload!.value,
      };
      break;
    case settingsActions.CLEAR_STATE:
      newState = {
        didSeedKey: "",
        ceramicNode: "",
        serverEndpoint: "",
      };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
};

export const SettingsContext = createContext<any>(undefined);

export const SettingsProvider: React.FC<SettingsProvider> = ({
  children,
  initialState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};


export const settingsActions = {
  CHANGE_INPUT: "CHANGE_INPUT",
  CLEAR_STATE: "CLEAR_STATE",
};
