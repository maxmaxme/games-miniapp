import React from 'react';
import {GamesListItem} from '../GamesListItem/GamesListItem';
import {CardGrid, Spinner} from '@vkontakte/vkui';

export function GamesList({ games }) {
  return <div>
    {games !== null ? <CardGrid size="l">{games.map((game) => <GamesListItem game={game} />)}</CardGrid> : <Spinner />}
  </div>;
}
