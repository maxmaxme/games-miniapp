import { createContext } from 'react';
import {Filters} from "./utils/types";

const defaultContext = {
  activeModal:<string|null> null,
  activeView: '',
  activePanel: '',
  openModal: (to: string) => {},
  changeView: (to: string) => {},
  changePanel: (to: string) => {},
  goBackPanel: () => {},
  panelsHistory: <string[]> [],
  filters: <Filters> {},
  setFilters: (filters: Filters) => {},
};

export const AppContext = createContext(defaultContext);
