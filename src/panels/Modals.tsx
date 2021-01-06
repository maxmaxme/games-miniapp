import {ANDROID, Div, IOS, ModalPage, ModalPageHeader, ModalRoot, PanelHeaderButton, platform} from "@vkontakte/vkui";
import {Icon24Cancel, Icon24Done} from "@vkontakte/icons";
import React from "react";
import {lang} from "../utils/langs";

interface Props {
  activeModal: string | null;
  closeModal: () => void;
}

export const Modals = (props: Props) => (
  <ModalRoot
    activeModal={props.activeModal}
    onClose={props.closeModal}
  >
    <ModalPage
      id='NeverHateIEver_rules'
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
      <Div>
        {lang('games_neverihaveever_rules')}
        <Div />
      </Div>
    </ModalPage>
  </ModalRoot>
);
