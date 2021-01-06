import React from "react";

export interface Game {
  id: GameNames;
  title: string;
  image_url: string;
  duration: MinMax;
  players: MinMax;
}

export interface MinMax {
  min: number;
  max?: number
}

export type GoFunc = (event: React.SyntheticEvent<EventTarget>) => void

export interface defaultProps {
  go: GoFunc;
  openModal: (name: string) => void;
}

export interface panelProps extends defaultProps {
  id: string;
}

export enum GameNames {
  NeverHateIEver = 'NeverHateIEver',
}

export type ListItem = {
  id: number;
  title: string;
  defaultSelected: boolean;
}

export interface WordsListItem extends ListItem {
  words: string[];
  disabled?: boolean;
}
