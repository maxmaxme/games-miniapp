import React, { useContext, useState } from 'react';

import { View } from '@vkontakte/vkui';
import { WordsListItem } from '../../utils/types';
import { GameSettings } from './panels/GameSettings';
import { Game } from './panels/Game';
import { getPhrases } from './phrases';
import { getPunishments } from './punishments';
import './NeverHateIEver.css';
import { LocalStorage, LocalStorageKeys } from '../../utils/localstorage';
import { AppContext } from '../../AppContext';
import { Panels, transformActivePanel } from '../../utils/panels';
import { Modals } from '../../panels/Modals';

interface Props {
  id: string;
}

export const NeverHateIEver = (props: Props) => {
  let { activePanel, goBackPanel, panelsHistory } = useContext(AppContext);
  activePanel = transformActivePanel(activePanel, Panels.NEVER_HATE_I_EVER_SETTINGS, Panels);

  const phrases: WordsListItem[] = getPhrases();
  const punishments: WordsListItem[] = getPunishments();

  const defaultSelectedPhrases = LocalStorage.getNumberArray(
      LocalStorageKeys.NEVERHATEIEVER_DEFAULT_SELECTED_PHRASES,
      phrases.filter((item) => item.defaultSelected).map((item) => item.id))
      .filter((itemId) => itemId >= 0);


  const defaultSelectedPunishments = LocalStorage.getNumberArray(
      LocalStorageKeys.NEVERHATEIEVER_DEFAULT_SELECTED_PUNISHMENTS,
      punishments.filter((item) => item.defaultSelected).map((item) => item.id))
      .filter((itemId) => itemId >= 0);

  const [selectedPhrases, setSelectedPhrases] = useState<number[]>(defaultSelectedPhrases);
  const [selectedPunishments, setSelectedPunishments] = useState<number[]>(defaultSelectedPunishments);
  LocalStorage.setNumberArray(LocalStorageKeys.NEVERHATEIEVER_DEFAULT_SELECTED_PHRASES, selectedPhrases);
  LocalStorage.setNumberArray(LocalStorageKeys.NEVERHATEIEVER_DEFAULT_SELECTED_PUNISHMENTS, selectedPunishments);

  let phrasesForGame: string[] = [];
  phrases.filter((item) => selectedPhrases.includes(item.id)).map((item) => item.words)
      .forEach((ph) => phrasesForGame = phrasesForGame.concat(ph));
  let punishmentsForGame: string[] = [];
  punishments.filter((item) => selectedPunishments.includes(item.id)).map((item) => item.words)
      .forEach((ph) => punishmentsForGame = punishmentsForGame.concat(ph));
  phrasesForGame.sort(() => Math.random() - 0.5);
  punishmentsForGame.sort(() => Math.random() - 0.5);

  return <View
    id={props.id}
    activePanel={activePanel}
    modal={<Modals />}
    history={panelsHistory}
    onSwipeBack={goBackPanel}
  >
    <GameSettings
      id={Panels.NEVER_HATE_I_EVER_SETTINGS}
      selectedPhrases={selectedPhrases}
      selectedPunishments={selectedPunishments}
      setSelectedPhrases={setSelectedPhrases}
      setSelectedPunishments={setSelectedPunishments}
      punishments={punishments}
      phrases={phrases}
    />

    <Game
      id={Panels.NEVER_HATE_I_EVER_GAME}
      phrases={phrasesForGame}
      punishments={punishmentsForGame}
    />
  </View>;
};
