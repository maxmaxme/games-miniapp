import {Game, GameNames} from "../utils/types";
import {lang} from "../utils/langs";

export function getGames(): Game[] {
  const neverHateIEver = {
    id: GameNames.NeverHateIEver,
    title: lang('games_neverihaveever_title'),
    duration: {min: 10},
    players: {min: 2, max: 10},
    image_url: '/img/games/never-have-i-ever.jpg',
  };
  return [neverHateIEver];
}
