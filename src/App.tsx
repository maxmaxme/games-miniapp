import React, {useEffect, useState} from 'react';
import {ConfigProvider, Root, ScreenSpinner, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import {SpyFall} from './games/SpyFall/SpyFall';
import Home from './panels/Home'
import {AppContext} from './AppContext';
import bridge from "@vkontakte/vk-bridge";
import {AppearanceScheme} from "@vkontakte/vkui/src/components/ConfigProvider/ConfigProviderContext";
import {Views} from "./utils/views";
import {NeverHateIEver} from "./games/NeverHateIEver/NeverHateIEver";
import {YesNo} from "./games/YesNo/YesNo";
import {OpenQuestions} from "./games/OpenQuestions/OpenQuestions";

const App = () => {
  const defaultView = Views.HOME;

  const [scheme, SetStateScheme] = useState<AppearanceScheme>('bright_light');
  const lights = ['bright_light', 'client_light'];
  const [activeView, setActiveView] = useState<string>(defaultView);
  const [activePanel, setActivePanel] = useState<string>('');
  const [panelsHistory] = useState<string[]>([]);

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

    window.addEventListener('popstate', () => {
      if (panelsHistory.length > 0) {
        goBackPanel();
      } else {
        goBackView();
      }
    });

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


  const changeView = (to: string) => {
    setActiveView(to);
  };
  const goBackView = () => {
    setActiveView(defaultView);
  };

  const goBackPanel = () => {
    panelsHistory.pop()
    setActivePanel(panelsHistory[panelsHistory.length - 1])
  }
  const changePanel = (to: string) => {
    window.history.pushState({panel: to}, to);
    setActivePanel(to);
    panelsHistory.push(to);
  };

  const appContextProvider = {
    activeView: activeView,
    activePanel: activePanel,
    changeView: changeView,
    changePanel: changePanel,
    goBackPanel: goBackPanel,
    panelsHistory: panelsHistory,
  };

  return (
    <AppContext.Provider value={appContextProvider}>
      <ConfigProvider scheme={scheme}>
        <Root activeView={activeView}>
          <Home id={Views.HOME}/>
          <SpyFall id={Views.SPYFALL} />
          <NeverHateIEver id={Views.NEVER_HATE_I_EVER} />
          <YesNo id={Views.YES_OR_NO} />
          <OpenQuestions id={Views.OPEN_QUESTIONS} />
        </Root>
      </ConfigProvider>
    </AppContext.Provider>
  );
}

export default App;

