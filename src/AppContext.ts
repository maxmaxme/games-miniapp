import { createContext } from 'react';

const defaultContext = {
  activeView: '',
  activePanel: '',
  changeView: (to: string) => {},
  changePanel: (to: string) => {},
  goBackPanel: () => {},
  panelsHistory: <string[]> [],
};

export const AppContext = createContext(defaultContext);
