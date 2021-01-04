import {Game, GameNames} from "./types";

export function getGames(): Game[] {
  const game = {id: GameNames.NeverHateIEver, title: 'Я никогда не..', duration: '10+', players: '2+', image_url: 'https://sun9-62.userapi.com/impf/CjpreBz-At3iffDV1988mdTk3KSRWHzlBLhUeA/gF6X3_BfEN4.jpg?size=1090x604&quality=96&proxy=1&sign=e3e0b7280d2ef0a778a37888ac3b09c2&type=album'};
  return [game];
}
