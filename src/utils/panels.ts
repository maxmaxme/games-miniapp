/* eslint-disable no-unused-vars */
import { Views } from './views';
import { Routers } from './types';

export function transformActivePanel(panel: string, defaultPanel: string, panels: object) {
  if (!Object.values(panels).includes(panel)) {
    panel = defaultPanel;
  }
  return panel;
}

export enum Panels {
  GAMES_LIST = 'GAMES_LIST',

  NEVER_HATE_I_EVER_SETTINGS = 'NeverHateIEver_settings',
  NEVER_HATE_I_EVER_GAME = 'NeverHateIEver_game',

  SPYFALL_SETTINGS = 'SpyFall_settings',
  SPYFALL_GAME = 'SpyFall_game',

  YES_OR_NO_INTRO = 'YesOrNo_intro',
  YES_OR_NO_LIST_VIEW = 'YesOrNo_list_view',
  YES_OR_NO_ONE_VIEW = 'YesOrNo_one_view',

  OPEN_QUESTIONS_LIST = 'OpenQuestions_list',
}
