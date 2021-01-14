import {Cell, List, Placeholder, Search} from "@vkontakte/vkui";
import React, {useState} from "react";
import {YesNoItem} from "../../../utils/types";
import {lang} from "../../../utils/langs";

interface Props {
  yesNoBase: YesNoItem[];
  openYesNo: (yesNo: YesNoItem) => void;
}

export const ListView = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = props.yesNoBase.filter(item => !searchQuery.length || item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  return <>
    <Search onChange={(e) => setSearchQuery(e.currentTarget.value.trim())} placeholder={lang('search_placeholder')} after={lang('search_cancel')}/>
    {filtered.length > 0 ? <List>
      {filtered.map((item, num) => <Cell className="YesNo__rowItem" key={'yesno' + num} multiline onClick={() => props.openYesNo(item)}>{item.title}</Cell>)}
    </List> : <Placeholder>{lang('games_yesno_search_not_found')}</Placeholder>}
  </>
}
