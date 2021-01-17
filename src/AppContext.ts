import { createContext } from 'react';
import {Filters} from "./utils/types";
import {ModalNames} from "./panels/Modals";

const defaultContext = {
  activeModal: null as string|null,
  activeView: '',
  activePanel: '',
  openModal: (to: ModalNames) => {},
  changeView: (to: string) => {},
  changePanel: (to: string) => {},
  goBackPanel: () => {},
  panelsHistory: [] as string[],
  filters: {} as Filters,
  setFilters: (filters: Filters) => {},
  isFavoriteApp: false,
};

export const AppContext = createContext(defaultContext);
