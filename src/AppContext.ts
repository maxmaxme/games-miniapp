import { createContext } from 'react';
import { Filters, HistoryItem } from './utils/types';
import { Views } from './utils/views';
import { Panels } from './utils/panels';
import { ModalNames } from './panels/Modals';

const defaultContext = {
  activeModal: null as ModalNames | null,
  activeView: Views.HOME,
  activePanel: Panels.HOME_HOME,
  go: (view: Views | null, panel: Panels | null, modal: ModalNames | null) => {},
  goBack: () => {},
  history: [] as HistoryItem[],
  filters: {} as Filters,
  setFilters: (filters: Filters) => {},
  isFavoriteApp: false,
};

export const AppContext = createContext(defaultContext);
