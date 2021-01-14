import {localStorage} from "@vkontakte/vkjs";

export enum LocalStorageKeys {
  SPYFALL_PLAYERS_COUNT = 'spyfall_players_count',
  SPYFALL_DEFAULT_SELECTED = 'spyfall_defaultSelected',
}

export function getNumberFromLocalStorage(key: string, defaultValue: number): number {
  const valueFromLC = localStorage.getItem(key);
  const number = parseInt(String(valueFromLC));

  return valueFromLC !== null && !isNaN(number) ? number : defaultValue;
}

export function setNumberToLocalStorage(key: string, value: number) {
  localStorage.setItem(key, String(value))
}

export function getNumberArrayFromLocalStorage(key: string, defaultValue: number[]): number[] {
  const valueFromLC = localStorage.getItem(key);

  if (valueFromLC !== null) {
    return valueFromLC.split(',').map(itemId => parseInt(itemId));
  } else {
    return defaultValue;
  }
}

export function setNumberArrayToLocalStorage(key: string, value: number[]) {
  localStorage.setItem(key, value.join(','));
}

