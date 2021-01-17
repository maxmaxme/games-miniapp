import React, {useContext, useEffect, useState} from 'react';

import {
  Panel,
  PanelHeader,
  PanelHeaderButton, View,
} from "@vkontakte/vkui";
import {platform, IOS} from '@vkontakte/vkui';
import {Icon24Back, Icon24Cancel, Icon28CancelOutline, Icon28ChevronBack} from "@vkontakte/icons";
import {GoFunc, WordsListItem} from "../../utils/types";
import {GameSettings} from "./panels/GameSettings";
import {Game} from "./panels/Game";
import {getPhrases} from "./phrases";
import {getPunishments} from "./punishments";
import './NeverHateIEver.css';
import {lang} from "../../utils/langs";
import {LocalStorage, LocalStorageKeys} from "../../utils/localstorage";
import {RulesModal} from "../../components/RulesModal/RulesModal";
import {AppContext} from "../../AppContext";
import {transformActivePanel} from "../../utils/panels";

interface Props {
  id: string;
}

export const NeverHateIEver = (props: Props) => {
  enum Panels {
    SETTINGS = 'settings',
    GAME = 'game',
  }

  let {activePanel, changePanel, goBackPanel, panelsHistory} = useContext(AppContext);
  activePanel = transformActivePanel(activePanel, Panels.SETTINGS, Panels);

  const phrases: WordsListItem[] = getPhrases();
  const punishments: WordsListItem[] = getPunishments();

  const defaultSelectedPhrases = LocalStorage.getNumberArray(
    LocalStorageKeys.NEVERHATEIEVER_DEFAULT_SELECTED_PHRASES,
    phrases.filter(item => item.defaultSelected).map(item => item.id))
      .filter(itemId => itemId >= 0);


  const defaultSelectedPunishments = LocalStorage.getNumberArray(
    LocalStorageKeys.NEVERHATEIEVER_DEFAULT_SELECTED_PUNISHMENTS,
    punishments.filter(item => item.defaultSelected).map(item => item.id))
      .filter(itemId => itemId >= 0);

  const [selectedPhrases, setSelectedPhrases] = useState<number[]>(defaultSelectedPhrases);
  const [selectedPunishments, setSelectedPunishments] = useState<number[]>(defaultSelectedPunishments);
  LocalStorage.setNumberArray(LocalStorageKeys.NEVERHATEIEVER_DEFAULT_SELECTED_PHRASES, selectedPhrases);
  LocalStorage.setNumberArray(LocalStorageKeys.NEVERHATEIEVER_DEFAULT_SELECTED_PUNISHMENTS, selectedPunishments);

  let phrasesForGame: string[] = [];
  phrases.filter(item => selectedPhrases.includes(item.id)).map(item => item.words).forEach(ph => phrasesForGame = phrasesForGame.concat(ph))
  let punishmentsForGame: string[] = [];
  punishments.filter(item => selectedPunishments.includes(item.id)).map(item => item.words).forEach(ph => punishmentsForGame = punishmentsForGame.concat(ph))
  phrasesForGame.sort(() => Math.random() - 0.5)
  punishmentsForGame.sort(() => Math.random() - 0.5)

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const modals = <RulesModal activeModal={activeModal} setActiveModal={setActiveModal} text={lang('games_neverihaveever_rules')}/>;

  return <View
    id={props.id}
    activePanel={activePanel}
    modal={modals}
    history={panelsHistory}
    onSwipeBack={goBackPanel}
  >
      <GameSettings
        id={Panels.SETTINGS}
        openRules={() => setActiveModal('rules')}
        startGame={() => changePanel(Panels.GAME)}
        selectedPhrases={selectedPhrases}
        selectedPunishments={selectedPunishments}
        setSelectedPhrases={setSelectedPhrases}
        setSelectedPunishments={setSelectedPunishments}
        punishments={punishments}
        phrases={phrases}
      />

      <Game
        id={Panels.GAME}
        phrases={phrasesForGame}
        punishments={punishmentsForGame}
      />
  </View>;
}

