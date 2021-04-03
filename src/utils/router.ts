import { Routers } from './types';
import { Views } from './views';
import { Panels } from './panels';

export const routes: Routers = {
  [Views.HOME]: [
    Panels.GAMES_LIST,
  ],

  [Views.NEVER_HATE_I_EVER]: [
    Panels.NEVER_HATE_I_EVER_GAME,
    Panels.NEVER_HATE_I_EVER_SETTINGS,
  ],

  [Views.SPYFALL]: [
    Panels.SPYFALL_GAME,
    Panels.SPYFALL_SETTINGS,
  ],

  [Views.YES_OR_NO]: [
    Panels.YES_OR_NO_INTRO,
    Panels.YES_OR_NO_LIST_VIEW,
    Panels.YES_OR_NO_ONE_VIEW,
  ],

  [Views.OPEN_QUESTIONS]: [
    Panels.OPEN_QUESTIONS_LIST,
  ],
};

export const getView = (routes: Routers, panel: Panels): string => {
  for (const view in routes) {
    if (routes.hasOwnProperty(view) && routes[view].includes(panel)) {
      return view;
    }
  }

  return Views.HOME;
};
