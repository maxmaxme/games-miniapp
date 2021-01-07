import React, {useState} from 'react';

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

const osName = platform();

export const SpyFall = (props: panelProps) => {

  const [isActiveGame, setIsActiveGame] = useState<boolean>(false);

  const collections = getCollections();

  const [playersCount, setPlayersCount] = useState(4)
  const [selectedCollections, setSelectedCollections] = useState<number[]>(collections.filter(item => item.defaultSelected).map(item => item.id));

  const startGame = () => {
    setIsActiveGame(true);
  }

  const onBackClick = isActiveGame ? () => {
    setIsActiveGame(false);
  } : props.go;

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

