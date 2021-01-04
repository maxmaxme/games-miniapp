import {Button, FormItem, HorizontalCell, HorizontalScroll, Input} from '@vkontakte/vkui';
import React from 'react';
import './SearchFilters.css'
import {getLang} from '../../utils/langs';

export function GamesSearch() {
  return (<div className="GamesSearch">
    <FormItem>
      <Input placeholder={getLang('gamelist_search_placeholder')}/>
    </FormItem>

    <HorizontalScroll className="SearchFilters">
      <div style={{display: 'flex'}}>
        <HorizontalCell size='l'>
          <Button mode="outline">{getLang('gamelist_search_filters_button')}</Button>
        </HorizontalCell>
        <HorizontalCell size='l'>
          <Button mode="outline">{getLang('gameslist_search_sort_popularity')}</Button>
        </HorizontalCell>
      </div>
    </HorizontalScroll>
  </div>);
}
