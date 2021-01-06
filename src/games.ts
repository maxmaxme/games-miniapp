import {Game, GameNames} from "./types";

export function getGames(): Game[] {
  const neverHateIEver = {
    id: GameNames.NeverHateIEver,
    title: 'Я никогда не..',
    duration: {min: 10},
    players: {min: 2, max: 10},
    image_url: '/img/games/never-have-i-ever.jpg',
  };
  return [neverHateIEver];
}
