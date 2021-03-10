import { HistoryItem } from './types';
import { Views } from './views';

export function transformHistory(activeView: Views, history: HistoryItem[]) {
  return history
      .filter((item) => item.view == activeView) // Только текущая view
      .map((item) => item.panel); // Объекты в массив панелей
}
