import {localStorage} from "@vkontakte/vkjs";

export enum LocalStorageKeys {
  SPYFALL_PLAYERS_COUNT = 'spyfall_players_count',
  SPYFALL_DEFAULT_SELECTED = 'spyfall_defaultSelected',

  OPENQUESTIONS_VIEWED_QUESTIONS = 'games_openquestions_viewedQuestions',
}

export class LocalStorage {
  static getNumber(key: string, defaultValue: number): number {
    const valueFromLC = localStorage.getItem(key);
    const number = parseInt(String(valueFromLC));

    return valueFromLC !== null && !isNaN(number) ? number : defaultValue;
  }

  static setNumber(key: string, value: number) {
    localStorage.setItem(key, String(value))
  }

  static getNumberArray(key: string, defaultValue: number[]): number[] {
    const valueFromLC = localStorage.getItem(key);

    if (valueFromLC !== null) {
      return valueFromLC.split(',').map(itemId => parseInt(itemId));
    } else {
      return defaultValue;
    }
  }

  static setNumberArray(key: string, value: number[]) {
    localStorage.setItem(key, value.join(','));
  }
}
