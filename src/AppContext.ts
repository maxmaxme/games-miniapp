import { createContext } from 'react';
import {Views} from "./utils/views";

const defaultContext = {
  changeView: (to: Views) => {},
};

export const AppContext = createContext(defaultContext);
