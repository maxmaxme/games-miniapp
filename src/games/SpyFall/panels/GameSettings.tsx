import {Button, CardGrid, Cell, CellButton, Div, Group, Header, IOS, NativeSelect, Panel, PanelHeader, PanelHeaderButton, platform} from "@vkontakte/vkui";
import {Icon24Cancel, Icon28CancelOutline} from "@vkontakte/icons";
import {lang} from "../../../utils/langs";
import React, {SetStateAction, useContext} from "react";
import {WordsListItem} from "../../../utils/types";
import {range} from "../../../utils/arrays";
import {ListItemComponent} from "../../../components/ListItemComponent/ListItemComponent";
import {doHaptic} from "../../../utils/device";
import {AppContext} from "../../../AppContext";
import {Panels} from "../SpyFall";

interface Props {
  id: string;
  playersCount: number;
  setPlayersCount: SetStateAction<any>;
  selectedCollections: number[];
  setSelectedCollections: SetStateAction<any>;
  collections: WordsListItem[];
}

export const GameSettings = (props: Props) => {
  const {playersCount, setPlayersCount, collections, selectedCollections, setSelectedCollections} = props;
  const {changePanel, openModal} = useContext(AppContext);

  return <Panel id={props.id}>
    <PanelHeader
      left={<PanelHeaderButton onClick={() => window.history.back()} data-to="home">{(platform() === IOS ? <Icon28CancelOutline/> : <Icon24Cancel/>)}</PanelHeaderButton>}
    >
      {lang('games_spyfall_title')}
    </PanelHeader>
    <Group>
      <CellButton onClick={() => openModal('SpyFall_rules')}>
        {lang('games_spyfall_rules_button')}
      </CellButton>

      <Group>
        <Cell disabled after={<NativeSelect
          value={playersCount}
          onChange={event => {
            const value = parseInt(event.target.value);
            setPlayersCount(value)
          }}>
          {range(3, 8).map(n => <option key={'option' + n} value={n}>{n}</option>)}
        </NativeSelect>}>
          {lang('games_spyfall_players_count')}
        </Cell>
        <Header>{lang('games_spyfall_themes_header')}</Header>
        <CardGrid size="m">
          {collections.map(item => <ListItemComponent key={'collection' + item.id} item={item} selected={selectedCollections} setSelected={setSelectedCollections}/>)}
        </CardGrid>

      </Group>

      <Div style={{display: 'flex'}}>
        <Button
          disabled={!selectedCollections.length}
          size="l"
          stretched mode="secondary"
          onClick={() => {
            doHaptic();
            changePanel(Panels.GAME);
          }}
        >{lang('games_spyfall_start_game_full_button')}</Button>
      </Div>
    </Group>
  </Panel>
}
