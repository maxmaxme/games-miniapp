import React from 'react';
import {GamesListItem} from '../GamesListItem/GamesListItem';
import {CardGrid, Footer, Placeholder, Spinner} from '@vkontakte/vkui';
import {defaultProps, Game} from "../../utils/types";
import {lang, langNumeric} from "../../utils/langs";

interface Props extends defaultProps {
  games: Game[] | null;
  searchQuery: string;
}

export function GamesList(props: Props) {
  const {searchQuery} = props;
  let {games} = props;
  if (games === null) {
    return <Spinner/>;
  }
  if (searchQuery.length > 0) {
    games = games.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  const cardsSize = window.innerWidth > 666 ? 'm' : 'l' // todo заменить на platform(), когда там появится VKCOM
  return <>
    {
      games.length > 0 ?
      <CardGrid size={cardsSize}>{games.map((game, i) => <GamesListItem key={i} go={props.go} game={game} openModal={props.openModal}/>)}</CardGrid> :
      <Placeholder>{lang('gamelist_search_not_found')}</Placeholder>
    }
    <Footer>{langNumeric(games.length, 'gamelist_search_count').replace('%s', String(games.length))}</Footer>
  </>;
}
