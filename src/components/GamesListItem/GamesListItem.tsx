import React, {useContext} from 'react';
import './GamesListItem.css';
import {Card} from '@vkontakte/vkui';
import Icon12Clock from '@vkontakte/icons/dist/12/clock';
import Icon16Users from '@vkontakte/icons/dist/16/users';
import {Game, MinMax} from "../../utils/types";
import {lang, langNumeric} from "../../utils/langs";
import {classNames} from "@vkontakte/vkjs";
import {AppContext} from "../../AppContext";

interface Props {
  game: Game;
}

export const GamesListItem = (props: Props) => {
  let tags = [];
  const game = props.game;
  const { changeView } = useContext(AppContext);

  const minMaxFormatter = (minMax: MinMax, langKey: string) => {
    if (!minMax.max) {
      return langNumeric(minMax.min, langKey).replace('%s', minMax.min + '+');
    } else {
      return langNumeric(minMax.max, langKey).replace('%s', `${minMax.min}–${minMax.max}`);
    }
  }

  tags.push(<div key="duration" className="GamesListItem__tag"><Icon12Clock /> {minMaxFormatter(game.duration, 'gamelist_item_tag_minutes')}</div>)
  tags.push(<div key="players" className="GamesListItem__tag"><Icon16Users width={12} height={12} /> {minMaxFormatter(game.players, 'gamelist_item_tag_players')}</div>)
  const unavailable = game.view === undefined;
  const onClick = unavailable ? undefined : () => changeView(game.view as string);

  return <Card mode="outline" onClick={onClick}>
    <div className={classNames('GamesListItem', {'GamesListItem--disabled': unavailable})}>
      <div className="GamesListItem__image" style={{backgroundImage: `url(${game.image_url})`}}/>
      <div className="GamesListItem__info">
        <div className="GamesListItem__title">{game.title}</div>
        <div className="GamesListItem__tags">{tags}</div>
      </div>
    </div>
    {unavailable && <div className="GamesListItem__disabledPlaceholder"><div className="GamesListItem__disabledPlaceholderIn">{lang('gamelist_item_unavailable')}</div></div>}
  </Card>;
}
