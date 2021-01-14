import React, {useEffect, useState} from 'react';
import {ConfigProvider, ScreenSpinner, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import {NeverHateIEver} from './games/NeverHateIEver/NeverHateIEver';
import {SpyFall} from './games/SpyFall/SpyFall';
import Home from './panels/Home'
import {Filters, Game, GameNames} from "./utils/types";
import {getGames} from "./games/gameslist";
import {Modals} from "./panels/Modals";
import {OpenQuestions} from "./games/OpenQuestions/OpenQuestions";
import {YesNo} from "./games/YesNo/YesNo";
import bridge from "@vkontakte/vk-bridge";
import {AppearanceScheme} from "@vkontakte/vkui/src/components/ConfigProvider/ConfigProviderContext";

const App = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [scheme, SetStateScheme] = useState<AppearanceScheme>('bright_light');
  const lights = ['bright_light', 'client_light'];
  const [activePanel, setActivePanel] = useState('home');
  // @ts-ignore
  const [popout, setPopout] = useState<Element | null>(<ScreenSpinner />);
  const [games, setGames] = useState<Game[] | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(urlParams.get('vk_is_favorite') === '1');
  const [history] = useState(['home']);
  const [disableSwipeBack, setDisableSwipeBack] = useState(false);
  const openModal = (name: string) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);

  const [filters, setFilters] = useState<Filters>({playersCount: null, gameDuration: null});

  const goBack = () => {
    if( history.length === 1 ) {  // Если в массиве одно значение:
      bridge.send("VKWebAppClose", {"status": "success"}); // Отправляем bridge на закрытие сервиса.
    } else if( history.length > 1 ) { // Если в массиве больше одного значения:
      history.pop() // удаляем последний элемент в массиве.
      setActivePanel( history[history.length - 1] ) // Изменяем массив с иторией и меняем активную панель.
    }
  }

  useEffect(() => {
    function changeScheme( scheme: string, needChange = false ) {
      let isLight = lights.includes( scheme );

      if( needChange ) {
        isLight = !isLight;
      }
      SetStateScheme( isLight ? 'bright_light' : 'space_gray' );

      if (bridge.supports('VKWebAppSetViewSettings')) {
        bridge.send('VKWebAppSetViewSettings', {
          'status_bar_style': isLight ? 'dark' : 'light',
          'action_bar_color': isLight ? '#ffffff' : '#191919'
        });
      }
    }

    window.addEventListener('popstate', () => goBack());

    async function fetchData() {
      setGames(getGames())
    }
    fetchData().then(() => setPopout(null));

    bridge.subscribe(({detail: {type, data}}) => {
      if (type === 'VKWebAppUpdateConfig') {
        // @ts-ignore
        changeScheme( data.scheme )
      } else if (type === 'VKWebAppAddToFavoritesResult') {
        // @ts-ignore
        setIsFavorite(data.result);
      }
    });
    bridge.send("VKWebAppInit");

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (event: React.SyntheticEvent<EventTarget>) => {
    // @ts-ignore
    const name = event.currentTarget.dataset.to;
    window.history.pushState( {panel: name}, name ); // Создаём новую запись в истории браузера
    setActivePanel(name); // Меняем активную панель
    history.push(name); // Добавляем панель в историю
  };

  const modals = <Modals
    activeModal={activeModal}
    closeModal={closeModal}
    filters={filters}
    setFilters={setFilters}
  />

  return (
    <ConfigProvider scheme={scheme}>
      <View
        activePanel={activePanel}
        popout={popout}
        modal={modals}
        history={history} // Ставим историю из массива панелей.
        onSwipeBack={disableSwipeBack ? undefined : goBack} // При свайпе выполняется данная функция.
      >
        <Home id='home' go={go} games={games} openModal={openModal} setDisableSwipeBack={setDisableSwipeBack} filters={filters} isFavorite={isFavorite}/>
        <NeverHateIEver id={GameNames.NeverHateIEver} go={go} openModal={openModal} setDisableSwipeBack={setDisableSwipeBack}/>
        <SpyFall id={GameNames.SpyFall} go={go} openModal={openModal} setDisableSwipeBack={setDisableSwipeBack}/>
        <OpenQuestions id={GameNames.OpenQuestions} go={go} openModal={openModal} setDisableSwipeBack={setDisableSwipeBack}/>
        <YesNo id={GameNames.YesNo} go={go} openModal={openModal} setDisableSwipeBack={setDisableSwipeBack}/>
      </View>
    </ConfigProvider>
  );
}

export default App;

