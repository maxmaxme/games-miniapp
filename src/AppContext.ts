import { createContext } from 'react';
import {Filters} from "./utils/types";

const defaultContext = {
  activeModal: null as string|null,
  activeView: '',
  activePanel: '',
  openModal: (to: string) => {},
  changeView: (to: string) => {},
  changePanel: (to: string) => {},
  goBackPanel: () => {},
  panelsHistory: [] as string[],
  filters: {} as Filters,
  setFilters: (filters: Filters) => {},
  isFavoriteApp: false,
};

export const AppContext = createContext(defaultContext);
