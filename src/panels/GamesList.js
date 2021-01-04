import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS, Cell } from '@vkontakte/vkui'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import persik from '../img/persik.png';
import './Persik.css';
import Group from '@vkontakte/vkui/dist/components/Group/Group'
import { Icon28MusicOutline, Icon28UserOutline, Icon28UsersOutline } from '@vkontakte/icons'
import { getLang } from '../utils/langs'
const osName = platform();


const GamesList = ({ id, go }) => (
  <Panel id={id}>
    <PanelHeader>{getLang('gameslist_app_header')}</PanelHeader>
    <Group>
      <Cell expandable before={<Icon28UserOutline/>} onClick={() => this.setState({ activePanel: 'panel2' })}>
        Friends
      </Cell>
      <Cell expandable before={<Icon28UsersOutline/>} onClick={() => this.setState({ activePanel: 'panel2' })}>
        Communities
      </Cell>
      <Cell expandable before={<Icon28MusicOutline/>} onClick={() => this.setState({ activePanel: 'panel2' })}>
        Music
      </Cell>
    </Group>
  </Panel>
);

GamesList.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default GamesList;
