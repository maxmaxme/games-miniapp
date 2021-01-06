import React from 'react';
import {GamesListItem} from '../GamesListItem/GamesListItem';
import {Card, CardGrid, Footer, Placeholder, Spinner} from '@vkontakte/vkui';
import {defaultProps, Game} from "../../utils/types";
import {lang, langNumeric} from "../../utils/langs";
import {Icon24ShareOutline, Icon24FavoriteOutline} from "@vkontakte/icons";
import './GameList.css';
import bridge from "@vkontakte/vk-bridge";

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
  games = games.sort((a) => a.unavailable ? 1 : -1);

  const twoCardsPerRow = window.innerWidth > 520 // todo заменить на platform(), когда там появится VKCOM
  let gamesBlock = [];

  const needShareButtons = true;

  if (needShareButtons) {
    if (games.length > 0) {
      const firstRowGames = games.slice(0, twoCardsPerRow ? 2 : 1);
      const otherRowsGames = games.slice(twoCardsPerRow ? 2 : 1);

      gamesBlock.push(<CardGrid
        size={twoCardsPerRow ? 'm' : 'l'}
      >{firstRowGames.map((game, i) =>
        <GamesListItem
          key={i}
          go={props.go}
          game={game}
          openModal={props.openModal}
        />)}
      </CardGrid>);

      gamesBlock.push(<CardGrid size='m'>
        <Card onClick={() => {
          bridge.send("VKWebAppShare", {"link": "https://vk.com/app7718732"});
        }} className="GamesList__subscribeBlock GamesList__subscribeBlock--green"><Icon24ShareOutline/>Поделиться</Card>
        <Card onClick={() => {
          bridge.send("VKWebAppAddToFavorites");
        }} className="GamesList__subscribeBlock GamesList__subscribeBlock--orange"><Icon24FavoriteOutline/>В избранное</Card>
      </CardGrid>);

      gamesBlock.push(<CardGrid
        size={twoCardsPerRow ? 'm' : 'l'}
      >{otherRowsGames.map((game, i) =>
        <GamesListItem
          key={i}
          go={props.go}
          game={game}
          openModal={props.openModal}
        />)}
      </CardGrid>);

    }
  } else {
    gamesBlock.push(<CardGrid size={twoCardsPerRow ? 'm' : 'l'}>{games.map((game, i) => <GamesListItem key={i} go={props.go} game={game} openModal={props.openModal}/>)}</CardGrid>);
  }

  return <>
    {gamesBlock.length > 0 ? gamesBlock : <Placeholder>{lang('gamelist_search_not_found')}</Placeholder>}
    <Footer>{langNumeric(games.length, 'gamelist_search_count').replace('%s', String(games.length))}</Footer>
  </>;
}
