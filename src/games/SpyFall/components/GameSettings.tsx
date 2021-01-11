import {Button, CardGrid, Cell, CellButton, Div, Group, Header, NativeSelect} from "@vkontakte/vkui";
import React, {SetStateAction} from "react";
import {defaultProps, WordsListItem} from "../../../utils/types";
import {lang} from "../../../utils/langs";
import {ListItemComponent} from "../../../components/ListItemComponent/ListItemComponent";
import {doHaptic} from "../../../utils/device";
import {range} from "../../../utils/arrays";

interface Props extends defaultProps {
  startGame: () => void;
  playersCount: number;
  setPlayersCount: SetStateAction<any>;
  collections: WordsListItem[];
  selectedCollections: number[];
  setSelectedCollections: SetStateAction<any>;
}

export const GameSettings = (props: Props) => {
  const {playersCount, setPlayersCount, collections, selectedCollections, setSelectedCollections} = props;
  return (
    <Group>
      <CellButton onClick={() => props.openModal('SpyFall_rules')}>
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
            props.startGame()
          }}
        >{lang('games_spyfall_start_game_full_button')}</Button>
      </Div>
    </Group>);
}
