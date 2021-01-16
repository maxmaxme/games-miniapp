import React, {useEffect, useState} from 'react';

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

const osName = platform();

interface Props {
  id: string;
}

export const NeverHateIEver = (props: Props) => {
  enum Panels {
    SETTINGS = 'settings',
    GAME = 'game',
  }

  const [activePanel, setActivePanel] = useState<string>(Panels.SETTINGS);
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

  const [isActiveGame, setIsActiveGame] = useState<boolean>(false);
  const [selectedPhrases, setSelectedPhrases] = useState<number[]>(defaultSelectedPhrases);
  const [selectedPunishments, setSelectedPunishments] = useState<number[]>(defaultSelectedPunishments);
  LocalStorage.setNumberArray(LocalStorageKeys.NEVERHATEIEVER_DEFAULT_SELECTED_PHRASES, selectedPhrases);
  LocalStorage.setNumberArray(LocalStorageKeys.NEVERHATEIEVER_DEFAULT_SELECTED_PUNISHMENTS, selectedPunishments);

  useEffect(() => {
    // props.setDisableSwipeBack(isActiveGame);
  });
  const onBackClick = isActiveGame ? () => {
    setIsActiveGame(false);
  } : () => window.history.back();
  const backIcon = isActiveGame ?
    (osName === IOS ? <Icon28CancelOutline/> : <Icon24Cancel/>) :
    (osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>);

  let phrasesForGame: string[] = [];
  phrases.filter(item => selectedPhrases.includes(item.id)).map(item => item.words).forEach(ph => phrasesForGame = phrasesForGame.concat(ph))
  let punishmentsForGame: string[] = [];
  punishments.filter(item => selectedPunishments.includes(item.id)).map(item => item.words).forEach(ph => punishmentsForGame = punishmentsForGame.concat(ph))
  phrasesForGame.sort(() => Math.random() - 0.5)
  punishmentsForGame.sort(() => Math.random() - 0.5)

  const [activeModal, setActiveModal] = useState<string | null>(null);
  console.log('activeModal', activeModal)
  const modals = <RulesModal activeModal={activeModal} setActiveModal={setActiveModal} text={lang('games_neverihaveever_rules')}/>;

  const goBack = () => {
    history.pop()
    setActivePanel(history[history.length - 1])
  }
  const go = (to: string) => {
    window.history.pushState( {panel: to}, to ); // Создаём новую запись в истории браузера
    setActivePanel(to); // Меняем активную view
    // @ts-ignore
    history.push(to); // Добавляем панель в историю
  };

  const [history] = useState([Panels.SETTINGS]);

  return <View
    id={props.id}
    activePanel={activePanel}
    modal={modals}
    history={history}
    onSwipeBack={goBack}
  >
      <GameSettings
        id={Panels.SETTINGS}
        openRules={() => setActiveModal('rules')}
        startGame={() => go(Panels.GAME)}
        selectedPhrases={selectedPhrases}
        selectedPunishments={selectedPunishments}
        setSelectedPhrases={setSelectedPhrases}
        setSelectedPunishments={setSelectedPunishments}
        punishments={punishments}
        phrases={phrases}
      />

      <Game
        backClick={() => go(Panels.SETTINGS)}
        id={Panels.GAME}
        phrases={phrasesForGame}
        punishments={punishmentsForGame}
      />
  </View>;
}

