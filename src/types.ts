import React from "react";

export interface Game {
  title: string;
  image_url: string;
  duration: string; // todo
  players: string; // todo
}

export type GoFunc = (event: React.SyntheticEvent<EventTarget>) => void
