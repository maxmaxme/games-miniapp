import {Button, FormItem, HorizontalCell, HorizontalScroll, Input} from '@vkontakte/vkui';
import React from 'react';
import './SearchFilters.css'
import {lang} from '../../utils/langs';

interface Props {
  search: (query: string) => void;
}

export function GamesSearch(props: Props) {
  return (<div className="GamesSearch">
    <FormItem>
      <Input placeholder={lang('gamelist_search_placeholder')} onKeyUp={(e) => props.search(e.currentTarget.value)}/>
    </FormItem>

    <HorizontalScroll className="SearchFilters">
      <div style={{display: 'flex'}}>
        <HorizontalCell size='l'>
          <Button disabled mode="outline">{lang('gamelist_search_filters_button')}</Button>
        </HorizontalCell>
        <HorizontalCell size='l'>
          <Button disabled mode="outline">{lang('gameslist_search_sort_popularity')}</Button>
        </HorizontalCell>
      </div>
    </HorizontalScroll>
  </div>);
}
