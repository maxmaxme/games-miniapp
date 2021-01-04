import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import Group from '@vkontakte/vkui/dist/components/Group/Group'
import {GamesSearch} from '../components/GamesSeach/GamesSearch';

const GamesList = ({ id, go }) => (
  <Panel id={id}>
    <Group>
      <GamesSearch />
    </Group>
  </Panel>
);

GamesList.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default GamesList;
