import {ANDROID, CellButton, Div, FormItem, IOS, ModalPage, ModalPageHeader, ModalRoot, PanelHeaderButton, platform, Slider} from "@vkontakte/vkui";
import {Icon24Cancel, Icon24Done} from "@vkontakte/icons";
import React, {useContext} from "react";
import {lang, langNumeric} from "../utils/langs";
import './Modals.css';
import {doHaptic} from "../utils/device";
import {AppContext} from "../AppContext";


export const Modals = () => {
  const rules: { [name: string]: string } = {
    NeverHateIEver_rules: lang('games_neverihaveever_rules'),
    SpyFall_rules: lang('games_spyfall_rules'),
    OpenQuestions_rules: lang('games_openquestions_rules'),
    YesNo_rules: lang('games_yesno_rules'),
  }

  const { activeModal, filters, setFilters } = useContext(AppContext);
  const closeModal = () => window.history.back();

  const rulesModal = (id: string, rules: string) =>
    <ModalPage
      key={id}
      id={id}
      onClose={closeModal}
      header={
        <ModalPageHeader
          left={platform() === ANDROID && <PanelHeaderButton onClick={closeModal}><Icon24Cancel/></PanelHeaderButton>}
          right={platform() === IOS && <PanelHeaderButton onClick={closeModal}>{lang('modal_close_button')}</PanelHeaderButton>}
        >
          {lang('rules_header')}
        </ModalPageHeader>
      }
    >
      <Div className="Modals__rulesText" dangerouslySetInnerHTML={{__html: rules}}/>
      <Div/>
    </ModalPage>

  let modals = Object.keys(rules).map(gameId => rulesModal(gameId, rules[gameId]));

  modals.push(<ModalPage
    id="games_filters"
    onClose={closeModal}
    header={
      <ModalPageHeader
        left={platform() === ANDROID && <PanelHeaderButton onClick={closeModal}><Icon24Cancel/></PanelHeaderButton>}
        right={platform() === IOS && <PanelHeaderButton onClick={closeModal}>{lang('modal_close_button')}</PanelHeaderButton>}
      >
        {lang('modal_filters_header')}
      </ModalPageHeader>
    }
  >
    <FormItem top={filters.playersCount !== null ? langNumeric(filters.playersCount, 'filters_players').replace('%s', filters.playersCount.toString()) : lang('modal_filters_players_count')}>
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
    <FormItem top={filters.gameDuration !== null ? langNumeric(filters.gameDuration, 'filters_minutes').replace('%s', filters.gameDuration.toString()) : lang('modal_filters_game_duration')}>
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
  </ModalPage>)

  return <ModalRoot
    activeModal={activeModal}
    onClose={closeModal}
    children={modals}/>
};
