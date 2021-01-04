import React from 'react';
import './GamesListItem.css';
import {Card} from '@vkontakte/vkui';
import Icon12Clock from '@vkontakte/icons/dist/12/clock';
import Icon16Users from '@vkontakte/icons/dist/16/users';
import {defaultProps, Game} from "../../types";

interface Props extends defaultProps {
  game: Game;
}

export function GamesListItem(props: Props) {
  let tags = [];
  const game = props.game;

  tags.push(<div className="GamesListItem__tag"><Icon12Clock /> {game.duration}</div>)
  tags.push(<div className="GamesListItem__tag"><Icon16Users width={12} height={12} /> {game.players}</div>)


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
