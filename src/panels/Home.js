import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import Group from '@vkontakte/vkui/dist/components/Group/Group'
import {GamesSearch} from '../components/GamesSeach/GamesSearch';
import {GamesList} from '../components/GamesList/GamesList';

const Home = ({ id, go, games }) => (
  <Panel id={id}>
    <Group>
      <GamesSearch />
      <GamesList games={games}/>
    </Group>
  </Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default Home;
