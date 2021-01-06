import React, {useState} from 'react';

import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
} from "@vkontakte/vkui";
import {platform, IOS} from '@vkontakte/vkui';
import {Icon24Back, Icon28ChevronBack} from "@vkontakte/icons";
import {panelProps, WordsListItem} from "../../types";
import {GameSettings} from "./components/GameSettings";
import {Game} from "./components/Game";
import {getPhrases} from "./phrases";
import {getPunishments} from "./punishments";
import './NeverHateIEver.css';
import {lang} from "../../utils/langs";

const osName = platform();

export const NeverHateIEver = (props: panelProps) => {

  const phrases: WordsListItem[] = getPhrases();
  const punishments: WordsListItem[] = getPunishments();
  const [isActiveGame, setIsActiveGame] = useState<boolean>(false);
  const [selectedPhrases, setSelectedPhrases] = useState<number[]>(phrases.filter(item => item.defaultSelected).map(item => item.id));
  const [selectedPunishments, setSelectedPunishments] = useState<number[]>(punishments.filter(item => item.defaultSelected).map(item => item.id));

  const startGame = () => {
    setIsActiveGame(true);
  }

  const onBackClick = isActiveGame ? () => {
    setIsActiveGame(false);
  } : props.go;

  let phrasesForGame: string[] = [];
  phrases.filter(item => selectedPhrases.includes(item.id)).map(item => item.words).forEach(ph => phrasesForGame = phrasesForGame.concat(ph))
  let punishmentsForGame: string[] = [];
  punishments.filter(item => selectedPunishments.includes(item.id)).map(item => item.words).forEach(ph => punishmentsForGame = punishmentsForGame.concat(ph))
  phrasesForGame.sort(() => Math.random() - 0.5)
  punishmentsForGame.sort(() => Math.random() - 0.5)

  return (
    <Panel id={props.id}>
      <PanelHeader
        left={<PanelHeaderButton onClick={onBackClick} data-to="home">
          {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </PanelHeaderButton>}
      >
        {lang('games_neverihaveever_title')}
      </PanelHeader>
      {isActiveGame ?
        <Game
          phrases={phrasesForGame}
          punishments={punishmentsForGame}
          go={props.go}
          openModal={props.openModal}
        /> :
        <GameSettings
          go={props.go}
          openModal={props.openModal}
          startGame={startGame}
          selectedPhrases={selectedPhrases}
          selectedPunishments={selectedPunishments}
          setSelectedPhrases={setSelectedPhrases}
          setSelectedPunishments={setSelectedPunishments}
          punishments={punishments}
          phrases={phrases}
        />}

    </Panel>
  );
}

