import React from 'react';
import {GamesListItem} from '../GamesListItem/GamesListItem';
import {Card, CardGrid, Footer, Placeholder, Spinner} from '@vkontakte/vkui';
import {defaultProps, Filters, Game} from "../../utils/types";
import {lang, langNumeric} from "../../utils/langs";
import {Icon24ShareOutline, Icon24FavoriteOutline, Icon24Favorite} from "@vkontakte/icons";
import './GameList.css';
import bridge from "@vkontakte/vk-bridge";

interface Props extends defaultProps {
  games: Game[] | null;
  searchQuery: string;
  filters: Filters;
}

export function GamesList(props: Props) {
  const {searchQuery, filters} = props;
  let {games} = props;
  if (games === null) {
    return <Spinner/>;
  }
  if (searchQuery.length > 0) {
    games = games.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }
    games = games.filter(game => {
      if (filters.playersCount !== null) {
        if (filters.playersCount < game.players.min) {
          return false
        }
        if (game.players.max !== undefined && filters.playersCount > game.players.max) {
          return false
        }
      }
      if (filters.gameDuration !== null) {
        if (filters.gameDuration < game.duration.min) {
          return false
        }
        if (game.duration.max !== undefined && filters.gameDuration > game.duration.max) {
          return false
        }
      }
      return true;
    });
  // games = games.sort((a) => a.unavailable ? 1 : -1); // todo при открытии второй игры она встает на первое место

  const twoCardsPerRow = window.innerWidth > 520;
  let gamesBlock = [];

  const needShareButtons = true;

  if (needShareButtons) {
    if (games.length > 0) {
      const firstRowGames = games.slice(0, twoCardsPerRow ? 2 : 1);
      const otherRowsGames = games.slice(twoCardsPerRow ? 2 : 1);

      gamesBlock.push(<CardGrid key="firstRow"
        size={twoCardsPerRow ? 'm' : 'l'}
      >{firstRowGames.map((game, i) =>
        <GamesListItem
          key={i}
          go={props.go}
          game={game}
          openModal={props.openModal}
        />)}
      </CardGrid>);

      const urlParams = new URLSearchParams(window.location.search);
      const isFavorite = urlParams.get('vk_is_favorite') === '1';
      let favoriteButton;
      if (isFavorite) {
        favoriteButton = <Card className="GamesList__subscribeBlock GamesList__subscribeBlock--orange"><Icon24Favorite/>{lang('card_added_to_favorite')}</Card>
      } else {
        favoriteButton = <Card onClick={() => {
          bridge.send("VKWebAppAddToFavorites");
        }} className="GamesList__subscribeBlock GamesList__subscribeBlock--orange"><Icon24FavoriteOutline/>{lang('card_add_to_favorite')}</Card>
      }

      gamesBlock.push(<CardGrid key="shareRow" size='m'>
        <Card onClick={() => {
          // bridge.send("VKWebAppShowWallPostBox", {"message": lang('card_share_app_text'), "attachments": 'https://vk.com/app7718732'});
          bridge.send("VKWebAppShare", {"link": "https://vk.com/app7718732"});
        }} className="GamesList__subscribeBlock GamesList__subscribeBlock--green"><Icon24ShareOutline/>{lang('card_share_app')}</Card>
        {favoriteButton}
      </CardGrid>);

      gamesBlock.push(<CardGrid
        key="otherRows"
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
