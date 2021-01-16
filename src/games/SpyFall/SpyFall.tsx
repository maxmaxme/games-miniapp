import React, {useEffect, useState} from 'react';

import {
  View,
} from "@vkontakte/vkui";
import {GoFunc} from "../../utils/types";
import {getCollections} from "./collections";
import {randomInteger} from "../../utils/numbers";
import './SpyFall.css';
import {LocalStorageKeys, LocalStorage} from "../../utils/localstorage";
import {GameSettings} from "./panels/GameSettings";
import {Game} from "./panels/Game";
import {RulesModal} from "../../components/RulesModal/RulesModal";
import {lang} from "../../utils/langs";

interface Props {
  id: string;
  go: GoFunc;
}

export const SpyFall = (props: Props) => {
  enum Panels {
    SETTINGS = 'settings',
    GAME = 'game',
  }

  const [activePanel, setActivePanel] = useState<string>(Panels.SETTINGS);

  const collections = getCollections();

  const defaultPlayersCount = LocalStorage.getNumber(LocalStorageKeys.SPYFALL_PLAYERS_COUNT, 4);
  const defaultSelected = LocalStorage.getNumberArray(
    LocalStorageKeys.SPYFALL_DEFAULT_SELECTED,
    collections.filter(item => item.defaultSelected)
      .map(item => item.id)).filter(itemId => itemId >= 0);

  const [playersCount, setPlayersCount] = useState<number>(defaultPlayersCount)
  const [selectedCollections, setSelectedCollections] = useState<number[]>(defaultSelected);
  LocalStorage.setNumberArray(LocalStorageKeys.SPYFALL_DEFAULT_SELECTED, selectedCollections);
  LocalStorage.setNumber(LocalStorageKeys.SPYFALL_PLAYERS_COUNT, playersCount);


  let wordsForGame: string[] = [];
  collections.filter(item => selectedCollections.includes(item.id)).map(item => item.words).forEach(words => wordsForGame = wordsForGame.concat(words))
  wordsForGame.sort(() => Math.random() - 0.5)
  const wordForGame = wordsForGame.shift() || '';

  const [activeModal, setActiveModal] = useState<string | null>(null);
  console.log('activeModal', activeModal)
  const modals = <RulesModal activeModal={activeModal} setActiveModal={setActiveModal} text={lang('games_spyfall_rules')}/>;
  const openRules = () => {
    setActiveModal('rules');
  };

  return <View
    id={props.id}
    activePanel={activePanel}
    modal={modals}
  >
    <GameSettings
      startGame={() => setActivePanel(Panels.GAME)}
      playersCount={playersCount}
      setPlayersCount={setPlayersCount}
      collections={collections}
      selectedCollections={selectedCollections}
      setSelectedCollections={setSelectedCollections}
      openRules={openRules}
      id={Panels.SETTINGS}
    />
    <Game
      id={Panels.GAME}
      playersCount={playersCount}
      spyPlayerNum={randomInteger(1, playersCount)}
      word={wordForGame}
      backClick={() => setActivePanel(Panels.SETTINGS)}
    />
  </View>;
}

