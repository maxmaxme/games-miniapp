import {Button, CellButton, Div, Group, Tabs, TabsItem} from "@vkontakte/vkui";
import React, {SetStateAction, useState} from "react";
import {defaultProps, WordsListItem} from "../../../utils/types";
import {lang} from "../../../utils/langs";
import {ListItemComponent} from "../../../components/ListItemComponent/ListItemComponent";

interface Props extends defaultProps {
  startGame: () => void;
  selectedPhrases: number[];
  setSelectedPhrases: SetStateAction<any>;
  selectedPunishments: number[];
  setSelectedPunishments: SetStateAction<any>;
  phrases: WordsListItem[];
  punishments: WordsListItem[];
}

export const GameSettings = (props: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const {phrases, punishments, selectedPhrases, selectedPunishments, setSelectedPhrases, setSelectedPunishments} = props;

  return (
    <Group>
      <CellButton onClick={() => props.openModal('NeverHateIEver_rules')}>
        {lang('games_neverihaveever_rules_button')}
      </CellButton>
      <Tabs>
        <TabsItem
          selected={activeTab === 0}
          onClick={() => setActiveTab(0)}
        >{lang('games_neverihaveever_phrases_tab')}</TabsItem>
        <TabsItem
          selected={activeTab === 1}
          onClick={() => setActiveTab(1)}
        >{lang('games_neverihaveever_punishments_tab')}</TabsItem>
      </Tabs>
      {activeTab === 0 && <Group>{phrases.map(item => <ListItemComponent key={'phrases' + item.id} item={item} selected={selectedPhrases} setSelected={setSelectedPhrases} />)}</Group>}
      {activeTab === 1 && <Group>{punishments.map(item => <ListItemComponent key={'punishments' + item.id} item={item} selected={selectedPunishments} setSelected={setSelectedPunishments} />)}</Group>}

      <Div style={{display: 'flex'}}>
        <Button
          size="l"
          disabled={selectedPhrases.length === 0 || selectedPunishments.length === 0} stretched mode="secondary" onClick={() => props.startGame()}
        >{lang('games_neverihaveever_start_game_full_button')}</Button>
      </Div>
    </Group>);
}
