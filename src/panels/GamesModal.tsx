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

  return <ModalRoot
    activeModal={props.activeModal}
    onClose={props.closeModal}
    children={modals}/>
};
