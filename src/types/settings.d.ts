interface SettingsState {
    didSeedKey: string;
    ceramicNode: string;
    serverEndpoint: string;
}

interface SettingsProvider {
    children: React.ReactNode;
    initialState: SettingsState;
  }
  
  type SettingsReducer = (
    state: SettingsState,
    action: any
  ) => SettingsState;
  