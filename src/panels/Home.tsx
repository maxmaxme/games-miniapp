import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import Group from '@vkontakte/vkui/dist/components/Group/Group'
import {GamesSearch} from '../components/GamesSeach/GamesSearch';
import {GamesList} from '../components/GamesList/GamesList';
import {Filters, Game, panelProps} from "../utils/types";
import {PanelHeader} from "@vkontakte/vkui";
import {lang} from "../utils/langs";

interface Props extends panelProps {
  games: Game[] | null;
  filters: Filters;
}

const Home = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onSearch = (query: string) => {
    setSearchQuery(query);
  }

  return <Panel id={props.id}>
    <PanelHeader>
      {lang('app_name')}
    </PanelHeader>
    <Group>
      <GamesSearch search={onSearch} openModal={props.openModal} filters={props.filters}/>
      <GamesList searchQuery={searchQuery} filters={props.filters} go={props.go} games={props.games} openModal={props.openModal}/>
    </Group>
  </Panel>
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default Home;
