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
import { Filters, HistoryItem } from './utils/types';
import { ModalNames } from './panels/Modals';
import { Panels } from './utils/panels';

const App = () => {
  const defaultView = Views.HOME;
  const defaultPanel = Panels.HOME_HOME;
  const urlParams = new URLSearchParams(window.location.search);

  const [scheme, setStateScheme] = useState<AppearanceScheme>('bright_light');
  const lights = ['bright_light', 'client_light'];
  const [activeView, setActiveView] = useState<Views>(defaultView);
  const [activePanel, setActivePanel] = useState<Panels>(defaultPanel);
  const [activeModal, setActiveModal] = useState<ModalNames|null>(null);
  const [filters, setFilters] = useState<Filters>({ playersCount: null, gameDuration: null });
  const [isFavoriteApp, setIsFavoriteApp] = useState(urlParams.get('vk_is_favorite') === '1');
  const [history] = useState<HistoryItem[]>([{
    view: activeView,
    panel: activePanel,
    modal: null,
  }]);

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
      if (history.length > 1) {
        goBack();
      } else {
        // closeApp(); // todo
      }
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

  const go = (view: Views | null, panel: Panels | null, modal: ModalNames | null) => {
    const historyItem: HistoryItem = {
      view: view ?? activeView,
      panel: panel ?? activePanel,
      modal: modal ?? activeModal,
    };
    window.history.pushState(historyItem, '');
    if (view && activeView != view) {
      setActiveView(view);
    }
    if (panel && activePanel != panel) {
      setActivePanel(panel);
    }
    if (modal && activeModal != modal) {
      setActiveModal(modal);
    }
    history.push(historyItem);
  };
  const goBack = () => {
    history.pop();
    setActiveView(history[history.length - 1].view);
    setActivePanel(history[history.length - 1].panel);
    setActiveModal(history[history.length - 1].modal);
  };

  const appContextProvider = {
    activeModal,
    activeView,
    activePanel,
    go,
    goBack,
    history,
    filters,
    setFilters,
    isFavoriteApp,
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
};

export default App;

