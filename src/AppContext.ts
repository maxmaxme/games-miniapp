import { createContext } from 'react';
import { Filters } from './utils/types';
import { ModalNames } from './panels/Modals';
import { Panels } from './utils/panels';

const defaultContext = {
  activeModal: null as string|null,
  activePanel: '',
  openModal: (to: ModalNames) => {},
  changePanel: (to: Panels) => {},
  goBack: () => {},
  panelsHistory: [] as string[],
  filters: {} as Filters,
  setFilters: (filters: Filters) => {},
  isFavoriteApp: false,
};

export const AppContext = createContext(defaultContext);
