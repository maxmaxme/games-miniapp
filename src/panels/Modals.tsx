import {ANDROID, CellButton, Div, FormItem, IOS, ModalPage, ModalPageHeader, ModalRoot, PanelHeaderButton, platform, Slider} from "@vkontakte/vkui";
import {Icon24Cancel, Icon24Done} from "@vkontakte/icons";
import React, {SetStateAction} from "react";
import {lang, langNumeric} from "../utils/langs";
import './Modals.css';
import {Filters} from "../utils/types";
import {doHaptic} from "../utils/device";

interface Props {
  activeModal: string | null;
  closeModal: () => void;

  filters: Filters;
  setFilters: SetStateAction<any>;

}

export const Modals = (props: Props) => {
  const rules: { [name: string]: string } = {
    NeverHateIEver_rules: lang('games_neverihaveever_rules'),
    SpyFall_rules: lang('games_spyfall_rules'),
    OpenQuestions_rules: lang('games_openquestions_rules'),
    YesNo_rules: lang('games_yesno_rules'),
  }

  const rulesModal = (id: string, rules: string) =>
    <ModalPage
      key={id}
      id={id}
      onClose={props.closeModal}
      header={
        <ModalPageHeader
          left={platform() === ANDROID && <PanelHeaderButton onClick={props.closeModal}><Icon24Cancel/></PanelHeaderButton>}
          right={<PanelHeaderButton onClick={props.closeModal}>{platform() === IOS ? lang('modal_close_button') : <Icon24Done/>}</PanelHeaderButton>}
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
    onClose={props.closeModal}
    header={
      <ModalPageHeader
        left={platform() === ANDROID && <PanelHeaderButton onClick={props.closeModal}><Icon24Cancel/></PanelHeaderButton>}
        right={<PanelHeaderButton onClick={props.closeModal}>{platform() === IOS ? lang('modal_close_button') : <Icon24Done/>}</PanelHeaderButton>}
      >
        {lang('modal_filters_header')}
      </ModalPageHeader>
    }
  >
    <FormItem top={props.filters.playersCount !== null ? langNumeric(props.filters.playersCount, 'filters_players').replace('%s', props.filters.playersCount.toString()) : lang('modal_filters_players_count')}>
      <Slider
        min={0}
        max={15}
        step={1}
        value={props.filters.playersCount !== null ? props.filters.playersCount : 0}
        onChange={(value) => {
          if ((props.filters.playersCount || 0) !== Math.round(value)) {
            doHaptic();
            props.setFilters({...props.filters, playersCount: value > 0 ? value : null})
          }
        }}
      />
    </FormItem>
    <FormItem top={props.filters.gameDuration !== null ? langNumeric(props.filters.gameDuration, 'filters_minutes').replace('%s', props.filters.gameDuration.toString()) : lang('modal_filters_game_duration')}>
      <Slider
        min={0}
        max={150}
        step={5}
        value={props.filters.gameDuration !== null ? props.filters.gameDuration : 0}
        onChange={(value) => {
          if ((props.filters.gameDuration || 0) !== Math.round(value)) {
            doHaptic();
            props.setFilters({...props.filters, gameDuration: value > 0 ? value : null})
          }
        }}
      />
    </FormItem>
    <CellButton
      disabled={props.filters.playersCount === null && props.filters.gameDuration === null}
      onClick={() => props.setFilters({playersCount: null, gameDuration: null})}
    >Сбросить фильтры</CellButton>
    <Div/>
  </ModalPage>)

  return <ModalRoot
    activeModal={props.activeModal}
    onClose={props.closeModal}
    children={modals}/>
};
