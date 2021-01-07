import React, {useEffect, useState} from 'react';
import {ConfigProvider, ScreenSpinner, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import {NeverHateIEver} from './games/NeverHateIEver/NeverHateIEver';
import {SpyFall} from './games/SpyFall/SpyFall';
import Home from './panels/Home'
import {Game, GameNames} from "./utils/types";
import {getGames} from "./games/gameslist";
import {Modals} from "./panels/Modals";
import {OpenQuestions} from "./games/OpenQuestions/OpenQuestions";
import {YesNo} from "./games/YesNo/YesNo";

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  // @ts-ignore
  const [popout, setPopout] = useState<Element | null>(<ScreenSpinner size='large'/>);
  const [games, setGames] = useState<Game[] | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const openModal = (name: string) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    async function fetchData() {
      setGames(getGames())
    }

    fetchData().then(() => setPopout(null));
  }, []);

  const go = (event: React.SyntheticEvent<EventTarget>) => {
    // @ts-ignore
    setActivePanel(event.currentTarget.dataset.to);
  };

  const modals = <Modals
    activeModal={activeModal}
    closeModal={closeModal}
  />

  return (
    <ConfigProvider>
      <View activePanel={activePanel} popout={popout} modal={modals}>
        <Home id='home' go={go} games={games} openModal={openModal}/>
        <NeverHateIEver id={GameNames.NeverHateIEver} go={go} openModal={openModal}/>
        <SpyFall id={GameNames.SpyFall} go={go} openModal={openModal}/>
        <OpenQuestions id={GameNames.OpenQuestions} go={go} openModal={openModal}/>
        <YesNo id={GameNames.YesNo} go={go} openModal={openModal}/>
      </View>
    </ConfigProvider>
  );
}

export default App;

