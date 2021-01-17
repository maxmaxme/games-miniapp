import {Cell, IOS, List, Panel, PanelHeader, PanelHeaderButton, Placeholder, platform, Search} from "@vkontakte/vkui";
import React, {useContext, useState} from "react";
import {YesNoItem} from "../../../utils/types";
import {lang} from "../../../utils/langs";
import {Icon24Back, Icon24Cancel, Icon28CancelOutline, Icon28ChevronBack} from "@vkontakte/icons";
import {AppContext} from "../../../AppContext";

interface Props {
  id: string;
  yesNoBase: YesNoItem[];
  openYesNo: (yesNo: YesNoItem) => void;
}

export const ListView = (props: Props) => {
  const { goBackPanel } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = props.yesNoBase.filter(item => !searchQuery.length || item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  return <Panel id={props.id}>
    <PanelHeader
      left={<PanelHeaderButton onClick={() => window.history.back()}>{platform() === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}
    >
      {lang('games_yesno_title')}
    </PanelHeader>
    <Search onChange={(e) => setSearchQuery(e.currentTarget.value.trim())} placeholder={lang('search_placeholder')} after={lang('search_cancel')}/>
    {filtered.length > 0 ? <List>
      {filtered.map((item, num) => <Cell className="YesNo__rowItem" key={'yesno' + num} multiline onClick={() => props.openYesNo(item)}>{item.title}</Cell>)}
    </List> : <Placeholder>{lang('games_yesno_search_not_found')}</Placeholder>}
  </Panel>
}
