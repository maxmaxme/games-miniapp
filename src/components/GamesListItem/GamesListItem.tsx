import React from 'react';
import './GamesListItem.css';
import {Card} from '@vkontakte/vkui';
import Icon12Clock from '@vkontakte/icons/dist/12/clock';
import Icon16Users from '@vkontakte/icons/dist/16/users';
import {defaultProps, Game, MinMax} from "../../utils/types";
import {langNumeric} from "../../utils/langs";

interface Props extends defaultProps {
  game: Game;
}

export const GamesListItem = (props: Props) => {
  let tags = [];
  const game = props.game;

  const minMaxFormatter = (minMax: MinMax, langKey: string) => {
    if (!minMax.max) {
      return langNumeric(minMax.min, langKey).replace('%s', minMax.min + '+');
    } else {
      return langNumeric(minMax.max, langKey).replace('%s', `${minMax.min}–${minMax.max}`);
    }
  }

  tags.push(<div key="duration" className="GamesListItem__tag"><Icon12Clock /> {minMaxFormatter(game.duration, 'gamelist_item_tag_minutes')}</div>)
  tags.push(<div key="players" className="GamesListItem__tag"><Icon16Users width={12} height={12} /> {minMaxFormatter(game.players, 'gamelist_item_tag_players')}</div>)


  return <Card mode="outline" onClick={props.go} data-to={game.id}>
    <div className="GamesListItem">
      <div className="GamesListItem__image" style={{backgroundImage: `url(${game.image_url})`}}/>
      <div className="GamesListItem__info">
        <div className="GamesListItem__title">{game.title}</div>
        <div className="GamesListItem__tags">{tags}</div>
      </div>
    </div>
  </Card>;
}
