import {Button,  HorizontalCell, HorizontalScroll,  Search} from '@vkontakte/vkui';
import React, {useContext} from 'react';
import './SearchFilters.css'
import {lang, langNumeric} from '../../utils/langs';
import {Filters} from "../../utils/types";
import {AppContext} from "../../AppContext";

interface Props {
  search: (query: string) => void;
}

export function GamesSearch(props: Props) {
  const {filters, openModal} = useContext(AppContext);
  let filtersLabel = '??';

  if (filters.gameDuration === null && filters.playersCount === null) {
    filtersLabel = lang('gamelist_search_filters_all');
  } else if (filters.gameDuration !== null && filters.playersCount !== null) {
    filtersLabel = lang('gamelist_search_filters_players_and_duration')
      .replace('{playersCount}', langNumeric(filters.playersCount, 'filters_players').replace('%s', filters.playersCount.toString()))
      .replace('{gameDuration}', langNumeric(filters.gameDuration, 'filters_minutes').replace('%s', filters.gameDuration.toString()))
  } else if (filters.gameDuration !== null) {
    filtersLabel = langNumeric(filters.gameDuration, 'filters_minutes').replace('%s', filters.gameDuration.toString())
  } else if (filters.playersCount !== null) {
    filtersLabel = langNumeric(filters.playersCount, 'filters_players').replace('%s', filters.playersCount.toString())
  }

  const filtersButtonLabel = lang('gamelist_search_filters_button')
    .replace('{filters}', filtersLabel);

  return (<div className="GamesSearch">
    <Search onChange={(e) => props.search(e.currentTarget.value.trim())} placeholder={lang('search_placeholder')} after={lang('search_cancel')}/>

    <HorizontalScroll className="SearchFilters">
      <div style={{display: 'flex'}}>
        <HorizontalCell size='l' onClick={() => openModal('games_filters')}>
          <Button mode="outline">{filtersButtonLabel}</Button>
        </HorizontalCell>
      </div>
    </HorizontalScroll>
  </div>);
}
