import {Button, CellButton, Div, FormItem, Group, Slider} from "@vkontakte/vkui";
import React, {SetStateAction} from "react";
import {defaultProps, WordsListItem} from "../../../utils/types";
import {lang} from "../../../utils/langs";
import {ListItemComponent} from "./ListItemComponent";

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
        <FormItem top={lang('games_spyfall_players_count').replace('%s', playersCount.toString())}>
          <Slider
            step={1}
            min={3}
            max={8}
            value={playersCount}
            onChange={value => setPlayersCount(value)}
          />
        </FormItem>
        {collections.map(item => <ListItemComponent key={'collection' + item.id} item={item} selected={selectedCollections} setSelected={setSelectedCollections}/>)}

      </Group>

      <Div style={{display: 'flex'}}>
        <Button
          disabled={!selectedCollections.length}
          size="l"
          stretched mode="secondary"
          onClick={() => props.startGame()}
        >{lang('games_spyfall_start_game_full_button')}</Button>
      </Div>
    </Group>);
}
