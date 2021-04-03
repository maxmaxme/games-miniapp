import React, { useEffect, useState } from 'react';
import { ConfigProvider, Root } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import 'popstate-direction';
import { SpyFall } from './games/SpyFall/SpyFall';
import Home from './panels/Home';
import { AppContext } from './AppContext';
import bridge from '@vkontakte/vk-bridge';
import { AppearanceScheme } from '@vkontakte/vkui/src/components/ConfigProvider/ConfigProviderContext';
import { Views } from './utils/views';
import { NeverHateIEver } from './games/NeverHateIEver/NeverHateIEver';
import { YesNo } from './games/YesNo/YesNo';
import { OpenQuestions } from './games/OpenQuestions/OpenQuestions';
import { Filters } from './utils/types';
import { ModalNames } from './panels/Modals';
import { Panels } from './utils/panels';
import { getView, routes } from './utils/router';

const App = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [scheme, setStateScheme] = useState<AppearanceScheme>('bright_light');
  const lights = ['bright_light', 'client_light'];
  const [activePanel, setActivePanel] = useState<Panels>(Panels.GAMES_LIST);
  const [activeModal, setActiveModal] = useState<string|null>(null);
  const [panelsHistory] = useState<Panels[]>([]);
  const [modalsHistory] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({ playersCount: null, gameDuration: null });
  const [isFavoriteApp, setIsFavoriteApp] = useState(urlParams.get('vk_is_favorite') === '1');

  useEffect(() => {
    // eslint-disable-next-line require-jsdoc
    function changeScheme( scheme: string, needChange = false ) {
      let isLight = lights.includes( scheme );

      if ( needChange ) {
        isLight = !isLight;
      }
      setStateScheme( isLight ? 'bright_light' : 'space_gray' );

      if (bridge.supports('VKWebAppSetViewSettings')) {
        bridge.send('VKWebAppSetViewSettings', {
          'status_bar_style': isLight ? 'dark' : 'light',
          'action_bar_color': isLight ? '#ffffff' : '#191919',
        });
      }
    }

    // @ts-ignore
    window.addEventListener('back', () => {
      goBack();
    });

    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        // @ts-ignore
        changeScheme( data.scheme );
      } else if (type === 'VKWebAppAddToFavoritesResult') {
        // @ts-ignore
        setIsFavoriteApp(data.result);
      }
    });
    bridge.send('VKWebAppInit');
  }, []);

  const goBack = () => {
    if (modalsHistory.length > 0) {
      modalsHistory.pop();
      setActiveModal(modalsHistory[modalsHistory.length - 1] || null);
    } else if (panelsHistory.length > 0) {
      panelsHistory.pop();
      setActivePanel(panelsHistory[panelsHistory.length - 1]);
    }
  };

  const changePanel = (to: Panels) => {
    window.history.pushState({ panel: to }, to);
    setActivePanel(to);
    panelsHistory.push(to);
  };
  const openModal = (to: ModalNames) => {
    window.history.pushState({ panel: to }, to);
    setActiveModal(to);
    modalsHistory.push(to);
  };

  const appContextProvider = {
    activeModal: activeModal,
    activePanel: activePanel,
    openModal: openModal,
    changePanel: changePanel,
    goBack: goBack,
    panelsHistory: panelsHistory,
    filters: filters,
    setFilters: setFilters,
    isFavoriteApp: isFavoriteApp,
  };


  return (
    <AppContext.Provider value={appContextProvider}>
      <ConfigProvider scheme={scheme}>
        <Root activeView={getView(routes, activePanel)}>
          <Home id={Views.HOME}/>
          <SpyFall id={Views.SPYFALL} />
          <NeverHateIEver id={Views.NEVER_HATE_I_EVER} />
          <YesNo id={Views.YES_OR_NO} />
          <OpenQuestions id={Views.OPEN_QUESTIONS} />
        </Root>
      </ConfigProvider>
    </AppContext.Provider>
  );
};

export default App;

