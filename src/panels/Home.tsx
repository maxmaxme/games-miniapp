import React, { useEffect, useState } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import { GamesSearch } from '../components/GamesSeach/GamesSearch';
import { GamesList } from '../components/GamesList/GamesList';
import { Game } from '../utils/types';
import {
  PanelHeader,
  ScreenSpinner,
  View,
} from '@vkontakte/vkui';
import { lang } from '../utils/langs';
import { getGames } from '../games/gameslist';
import { Modals } from './Modals';
import { Panels } from '../utils/panels';

interface Props {
  id: string;
}

const Home = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  // @ts-ignore
  const [popout, setPopout] = useState<Element | null>(<ScreenSpinner/>);
  const [games, setGames] = useState<Game[] | null>(getGames());

  const onSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    async function fetchData() {
      setGames(getGames());
    }

    fetchData().then(() => setPopout(null));
  }, []);

  return <View
    id={props.id}
    activePanel={Panels.GAMES_LIST}
    popout={popout}
    modal={<Modals />}
  >
    <Panel id={Panels.GAMES_LIST}>
      <PanelHeader>
        {lang('app_name')}
      </PanelHeader>
      <Group>
        <GamesSearch search={onSearch}/>
        <GamesList searchQuery={searchQuery} games={games} />
      </Group>
    </Panel>
  </View>;
};

export default Home;
