/* eslint-disable no-unused-vars */
import { Views } from './views';

export interface Game {
  id: GameNames;
  title: string;
  imageUrl: string;
  duration: MinMax;
  players: MinMax;
  view?: Views;
}

export interface MinMax {
  min: number;
  max?: number
}

export interface Filters {
  playersCount: number | null;
  gameDuration: number | null;
}

export type GoFunc = (to: string) => void

export enum GameNames {
  NeverHateIEver = 'NeverHateIEver',
  TruthOrDare = 'TruthOrDare',
  OpenQuestions = 'OpenQuestions',
  YesNo = 'YesNo',
  SpyFall = 'SpyFall',
  Twister = 'Twister',
  Alias = 'Alias',
}

export type ListItem = {
  id: number;
  title: string;
  defaultSelected: boolean;
}

export interface WordsListItem extends ListItem {
  words: string[];
  imageUrl: string;
  disabled?: boolean;
}


export interface YesNoItem {
  title: string;
  question: string;
  answer: string;
}
