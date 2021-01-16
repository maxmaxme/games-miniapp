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

interface Props {
  id: string;
  changeView: GoFunc;
}

const Home = (props: Props) => {
  const urlParams = new URLSearchParams(window.location.search);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({playersCount: null, gameDuration: null});
  // @ts-ignore
  const [popout, setPopout] = useState<Element | null>(<ScreenSpinner/>);
  const [games, setGames] = useState<Game[] | null>(null);
  const [isFavorite, setIsFavorite] = useState(urlParams.get('vk_is_favorite') === '1');

  const openModal = (name: string) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);

  const onSearch = (query: string) => {
    setSearchQuery(query);
  }

  useEffect(() => {
    async function fetchData() {
      setGames(getGames())
    }

    fetchData().then(() => setPopout(null));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const modals = <ModalRoot
    activeModal={activeModal}
    onClose={closeModal}
  >
    <ModalPage
      id="games_filters"
      onClose={closeModal}
      header={
        <ModalPageHeader
          left={platform() === ANDROID && <PanelHeaderButton onClick={closeModal}><Icon24Cancel/></PanelHeaderButton>}
          right={<PanelHeaderButton onClick={closeModal}>{platform() === IOS ? lang('modal_close_button') : <Icon24Done/>}</PanelHeaderButton>}
        >
          {lang('modal_filters_header')}
        </ModalPageHeader>
      }
    >
      <FormItem
        top={filters.playersCount !== null ? langNumeric(filters.playersCount, 'filters_players').replace('%s', filters.playersCount.toString()) : lang('modal_filters_players_count')}>
        <Slider
          min={0}
          max={15}
          step={1}
          value={filters.playersCount !== null ? filters.playersCount : 0}
          onChange={(value) => {
            if ((filters.playersCount || 0) !== Math.round(value)) {
              doHaptic();
              setFilters({...filters, playersCount: value > 0 ? value : null})
            }
          }}
        />
      </FormItem>
      <FormItem
        top={filters.gameDuration !== null ? langNumeric(filters.gameDuration, 'filters_minutes').replace('%s', filters.gameDuration.toString()) : lang('modal_filters_game_duration')}>
        <Slider
          min={0}
          max={150}
          step={5}
          value={filters.gameDuration !== null ? filters.gameDuration : 0}
          onChange={(value) => {
            if ((filters.gameDuration || 0) !== Math.round(value)) {
              doHaptic();
              setFilters({...filters, gameDuration: value > 0 ? value : null})
            }
          }}
        />
      </FormItem>
      <CellButton
        disabled={filters.playersCount === null && filters.gameDuration === null}
        onClick={() => setFilters({playersCount: null, gameDuration: null})}
      >Сбросить фильтры</CellButton>
      <Div/>
    </ModalPage>
  </ModalRoot>;

  return <View
    id={props.id}
    activePanel="home"
    popout={popout}
    modal={modals}
  >
    <Panel id='home'>
      <PanelHeader>
        {lang('app_name')}
      </PanelHeader>
      <Group>
        <GamesSearch search={onSearch} openModal={openModal} filters={filters}/>
        <GamesList searchQuery={searchQuery} filters={filters} changeView={props.changeView} games={games} isFavoriteApp={isFavorite}/>
      </Group>
    </Panel>
  </View>
};

export default Home;
