import React from 'react';
import {GamesListItem} from '../GamesListItem/GamesListItem';
import {CardGrid, Spinner} from '@vkontakte/vkui';
import {Game} from "../../types";

interface Props {
  games: Game[] | null;
}

export function GamesList(props: Props) {
  return <div>
    {props.games !== null ? <CardGrid size="l">{props.games.map((game) => <GamesListItem game={game} />)}</CardGrid> : <Spinner />}
  </div>;
}
