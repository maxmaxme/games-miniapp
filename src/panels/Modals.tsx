import {ANDROID, Div, IOS, ModalPage, ModalPageHeader, ModalRoot, PanelHeaderButton, platform} from "@vkontakte/vkui";
import {Icon24Cancel, Icon24Done} from "@vkontakte/icons";
import React from "react";
import {lang} from "../utils/langs";
import './Modals.css';

interface Props {
  activeModal: string | null;
  closeModal: () => void;
}

export const Modals = (props: Props) => {
  const rules: { [name: string]: string } = {
    NeverHateIEver_rules: lang('games_neverihaveever_rules'),
    SpyFall_rules: lang('games_spyfall_rules'),
    OpenQuestions_rules: lang('games_openquestions_rules'),
    YesNo_rules: lang('games_yesno_rules'),
  }

  return <ModalRoot
    activeModal={props.activeModal}
    onClose={props.closeModal}
  >
    {Object.keys(rules).map(gameId => <ModalPage
      key={gameId}
      id={gameId}
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
      <Div className="Modals__rulesText" dangerouslySetInnerHTML={{__html: rules[gameId]}}/>
      <Div />
    </ModalPage>)}

  </ModalRoot>
};
