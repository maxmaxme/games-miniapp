import React, {useEffect, useState} from 'react';

import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
} from "@vkontakte/vkui";
import {platform, IOS} from '@vkontakte/vkui';
import {Icon24Back, Icon28ChevronBack} from "@vkontakte/icons";
import {panelProps} from "../../utils/types";
import {GameSettings} from "./components/GameSettings";
import {Game} from "./components/Game";
import {lang} from "../../utils/langs";
import {getCollections} from "./collections";
import {randomInteger} from "../../utils/numbers";
import './SpyFall.css';
import {getNumberArrayFromLocalStorage, getNumberFromLocalStorage, LocalStorageKeys, setNumberArrayToLocalStorage, setNumberToLocalStorage} from "../../utils/localstorage";

const osName = platform();

export const SpyFall = (props: panelProps) => {

  const [isActiveGame, setIsActiveGame] = useState<boolean>(false);

  const collections = getCollections();

  const defaultPlayersCount = getNumberFromLocalStorage(LocalStorageKeys.SPYFALL_PLAYERS_COUNT, 4);
  const defaultSelected = getNumberArrayFromLocalStorage(
    LocalStorageKeys.SPYFALL_DEFAULT_SELECTED,
    collections.filter(item => item.defaultSelected)
      .map(item => item.id)).filter(itemId => itemId >= 0);

  const [playersCount, setPlayersCount] = useState<number>(defaultPlayersCount)
  const [selectedCollections, setSelectedCollections] = useState<number[]>(defaultSelected);
  setNumberArrayToLocalStorage(LocalStorageKeys.SPYFALL_DEFAULT_SELECTED, selectedCollections);
  setNumberToLocalStorage(LocalStorageKeys.SPYFALL_PLAYERS_COUNT, playersCount);

  const startGame = () => {
    setIsActiveGame(true);
  }

  useEffect(() => {
    props.setDisableSwipeBack(isActiveGame);
  });
  const onBackClick = isActiveGame ? () => {
    setIsActiveGame(false);
  } : () => window.history.back();

  let wordsForGame: string[] = [];
  collections.filter(item => selectedCollections.includes(item.id)).map(item => item.words).forEach(words => wordsForGame = wordsForGame.concat(words))
  wordsForGame.sort(() => Math.random() - 0.5)
  const wordForGame = wordsForGame.shift() || '';

  return (
    <Panel id={props.id}>
      <PanelHeader
        left={<PanelHeaderButton onClick={onBackClick} data-to="home">
          {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </PanelHeaderButton>}
      >
        {lang('games_spyfall_title')}
      </PanelHeader>
      {isActiveGame ?
        <Game
          go={props.go}
          openModal={props.openModal}
          playersCount={playersCount}
          spyPlayerNum={randomInteger(1, playersCount)}
          word={wordForGame}
        /> :
        <GameSettings
          go={props.go}
          openModal={props.openModal}
          startGame={startGame}
          playersCount={playersCount}
          setPlayersCount={setPlayersCount}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
          collections={collections}
        />}

    </Panel>
  );
}

