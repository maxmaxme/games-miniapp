import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {ScreenSpinner, View} from '@vkontakte/vkui';
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
    bridge.subscribe(({detail: {type, data}}) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        // @ts-ignore
        schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });

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
    <View activePanel={activePanel} popout={popout} modal={modals}>
      <Home id='home' go={go} games={games} openModal={openModal}/>
      <NeverHateIEver id={GameNames.NeverHateIEver} go={go} openModal={openModal}/>
      <SpyFall id={GameNames.SpyFall} go={go} openModal={openModal}/>
      <OpenQuestions id={GameNames.OpenQuestions} go={go} openModal={openModal}/>
      <YesNo id={GameNames.YesNo} go={go} openModal={openModal}/>
    </View>
  );
}

export default App;

