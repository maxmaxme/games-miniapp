import {Button, Cell, Div, FormItem, Group, Input, List, Title} from "@vkontakte/vkui";
import {lang, langNumeric} from "../../../utils/langs";
import React, {SetStateAction, useState} from "react";
import {YesNoItem} from "../../../utils/types";
import {YesNoViewTypes} from "../YesNo";

interface Props {
  yesNoBase: YesNoItem[];
  openYesNo: (yesNo: YesNoItem) => void;
}

export const ListView = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = props.yesNoBase.filter(item => !searchQuery.length || item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  return <>
    <FormItem>
      <Input placeholder={lang('gamelist_search_placeholder')} onKeyUp={(e) => setSearchQuery(e.currentTarget.value)}/>
    </FormItem>
    <Div>
      <List>
        {filtered.map((item, num) => <Cell key={'yesno' + num} multiline onClick={() => props.openYesNo(item)}>{item.title}</Cell>)}
      </List>
    </Div>
  </>
}
