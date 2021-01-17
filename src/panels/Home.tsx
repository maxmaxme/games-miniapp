import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import Group from '@vkontakte/vkui/dist/components/Group/Group'
import {GamesSearch} from '../components/GamesSeach/GamesSearch';
import {GamesList} from '../components/GamesList/GamesList';
import {Filters, Game, GoFunc} from "../utils/types";
import {
  ANDROID,
  CellButton,
  Div,
  FormItem,
  IOS,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeader,
  PanelHeaderButton,
  platform,
  ScreenSpinner,
  Slider,
  View
} from "@vkontakte/vkui";
import {lang, langNumeric} from "../utils/langs";
import {Icon24Cancel, Icon24Done} from "@vkontakte/icons";
import {doHaptic} from "../utils/device";
import {getGames} from "../games/gameslist";
import {Modals} from "./Modals";

interface Props {
  id: string;
}

const Home = (props: Props) => {
  const urlParams = new URLSearchParams(window.location.search);

  const [searchQuery, setSearchQuery] = useState('');
  // @ts-ignore
  const [popout, setPopout] = useState<Element | null>(<ScreenSpinner/>);
  const [games, setGames] = useState<Game[] | null>(null);
  const [isFavorite, setIsFavorite] = useState(urlParams.get('vk_is_favorite') === '1');

  const onSearch = (query: string) => {
    setSearchQuery(query);
  }

  useEffect(() => {
    async function fetchData() {
      setGames(getGames())
    }

    fetchData().then(() => setPopout(null));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <View
    id={props.id}
    activePanel="home"
    popout={popout}
    modal={<Modals />}
  >
    <Panel id='home'>
      <PanelHeader>
        {lang('app_name')}
      </PanelHeader>
      <Group>
        <GamesSearch search={onSearch}/>
        <GamesList searchQuery={searchQuery} games={games} isFavoriteApp={isFavorite}/>
      </Group>
    </Panel>
  </View>
};

export default Home;
