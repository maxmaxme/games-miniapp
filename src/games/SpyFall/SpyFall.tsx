import React, {useContext, useState} from 'react';

import {
  View,
} from "@vkontakte/vkui";
import {getCollections} from "./collections";
import {randomInteger} from "../../utils/numbers";
import './SpyFall.css';
import {LocalStorageKeys, LocalStorage} from "../../utils/localstorage";
import {GameSettings} from "./panels/GameSettings";
import {Game} from "./panels/Game";
import {AppContext} from "../../AppContext";
import {Panels, transformActivePanel} from "../../utils/panels";
import {Modals} from "../../panels/Modals";

interface Props {
  id: string;
}

export const SpyFall = (props: Props) => {
  let {activePanel, panelsHistory, goBackPanel} = useContext(AppContext);
  activePanel = transformActivePanel(activePanel, Panels.SPYFALL_SETTINGS, Panels);

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

  return <View
    id={props.id}
    activePanel={activePanel}
    modal={<Modals />}
    history={panelsHistory}
    onSwipeBack={goBackPanel}
  >
    <GameSettings
      playersCount={playersCount}
      setPlayersCount={setPlayersCount}
      collections={collections}
      selectedCollections={selectedCollections}
      setSelectedCollections={setSelectedCollections}
      id={Panels.SPYFALL_SETTINGS}
    />
    <Game
      id={Panels.SPYFALL_GAME}
      playersCount={playersCount}
      spyPlayerNum={randomInteger(1, playersCount)}
      word={wordForGame}
    />
  </View>;
}

