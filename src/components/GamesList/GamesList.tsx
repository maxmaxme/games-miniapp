import React from 'react';
import {GamesListItem} from '../GamesListItem/GamesListItem';
import {CardGrid, Footer, Spinner} from '@vkontakte/vkui';
import {defaultProps, Game} from "../../types";

interface Props extends defaultProps {
  games: Game[] | null;
}

export function GamesList(props: Props) {
  if (props.games === null) {
    return <Spinner/>;
  }
  return <>
    <CardGrid size="l">{props.games.map((game) => <GamesListItem go={props.go} game={game} openModal={props.openModal}/>)}</CardGrid>
    <Footer>{props.games.length} игра</Footer>
  </>;
}
