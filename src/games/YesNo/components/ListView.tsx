import {Cell, List, Search} from "@vkontakte/vkui";
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
    <Search onChange={(e) => setSearchQuery(e.currentTarget.value)} placeholder={lang('search_placeholder')} after={lang('search_cancel')}/>
    <List>
      {filtered.map((item, num) => <Cell className="YesNo__rowItem" key={'yesno' + num} multiline onClick={() => props.openYesNo(item)}>{item.title}</Cell>)}
    </List>
  </>
}
