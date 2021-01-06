import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import Group from '@vkontakte/vkui/dist/components/Group/Group'
import {GamesSearch} from '../components/GamesSeach/GamesSearch';
import {GamesList} from '../components/GamesList/GamesList';
import {Game, panelProps} from "../types";

interface Props extends panelProps {
  games: Game[] | null;
}

const Home = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onSearch = (query: string) => {
    setSearchQuery(query);
  }

  return <Panel id={props.id}>
    <Group>
      <GamesSearch search={onSearch}/>
      <GamesList searchQuery={searchQuery} go={props.go} games={props.games} openModal={props.openModal}/>
    </Group>
  </Panel>
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default Home;
