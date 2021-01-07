import React, {useState} from 'react';

import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
} from "@vkontakte/vkui";
import {platform, IOS} from '@vkontakte/vkui';
import {Icon24Back, Icon28ChevronBack} from "@vkontakte/icons";
import {panelProps, WordsListItem} from "../../utils/types";
import {GameSettings} from "./components/GameSettings";
import {Game} from "./components/Game";
import {getPhrases} from "./phrases";
import {getPunishments} from "./punishments";
import './NeverHateIEver.css';
import {lang} from "../../utils/langs";
import {localStorage} from "@vkontakte/vkjs";

const osName = platform();

export const NeverHateIEver = (props: panelProps) => {
  const phrases: WordsListItem[] = getPhrases();
  const punishments: WordsListItem[] = getPunishments();

  let defaultSelectedPhrases
  let defaultSelectedPhrasesLS = localStorage.getItem('spyfall_defaultSelectedPhrases');
  if (defaultSelectedPhrasesLS !== null) {
    defaultSelectedPhrases = defaultSelectedPhrasesLS.split(',').map(itemId => parseInt(itemId));
  } else {
    defaultSelectedPhrases = phrases.filter(item => item.defaultSelected).map(item => item.id);
  }

  let defaultSelectedPunishments
  let defaultSelectedPunishmentsLS = localStorage.getItem('spyfall_defaultSelectedPunishments');
  if (defaultSelectedPunishmentsLS !== null) {
    defaultSelectedPunishments = defaultSelectedPunishmentsLS.split(',').map(itemId => parseInt(itemId));
  } else {
    defaultSelectedPunishments = punishments.filter(item => item.defaultSelected).map(item => item.id);
  }

  const [isActiveGame, setIsActiveGame] = useState<boolean>(false);
  const [selectedPhrases, setSelectedPhrases] = useState<number[]>(defaultSelectedPhrases);
  const [selectedPunishments, setSelectedPunishments] = useState<number[]>(defaultSelectedPunishments);
  localStorage.setItem('spyfall_defaultSelectedPhrases', selectedPhrases.join(','));
  localStorage.setItem('spyfall_defaultSelectedPunishments', selectedPunishments.join(','));

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
    <Panel id={props.id} className="NeverHateIEver__panel">
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

