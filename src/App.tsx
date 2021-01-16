import React, {useEffect, useState} from 'react';
import {ConfigProvider, Root, ScreenSpinner, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import {SpyFall} from './games/SpyFall/SpyFall';
import Home from './panels/Home'
import bridge from "@vkontakte/vk-bridge";
import {AppearanceScheme} from "@vkontakte/vkui/src/components/ConfigProvider/ConfigProviderContext";
import {Views} from "./utils/views";

const App = () => {
  const defaultView = Views.HOME;

  const [scheme, SetStateScheme] = useState<AppearanceScheme>('bright_light');
  const lights = ['bright_light', 'client_light'];
  const [activeView, setActiveView] = useState<string>(defaultView);
  const [history] = useState([defaultView]);

  const goBack = () => {
    if( history.length === 1 ) {  // Если в массиве одно значение:
      bridge.send("VKWebAppClose", {"status": "success"}); // Отправляем bridge на закрытие сервиса.
    } else if( history.length > 1 ) { // Если в массиве больше одного значения:
      history.pop() // удаляем последний элемент в массиве.
      setActiveView( history[history.length - 1] ) // Изменяем массив с иторией и меняем активную панель.
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
    setActiveView(name); // Меняем активную view
    history.push(name); // Добавляем панель в историю
  };


  return (
    <ConfigProvider scheme={scheme}>
      <Root activeView={activeView}>
        <Home id={Views.HOME} go={go} />
        <SpyFall id={Views.SPYFALL} go={go} />
      </Root>
    </ConfigProvider>
  );
}

export default App;

