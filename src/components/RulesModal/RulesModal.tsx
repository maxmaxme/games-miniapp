import {ANDROID, CellButton, Div, FormItem, IOS, ModalPage, ModalPageHeader, ModalRoot, PanelHeaderButton, platform, Slider} from "@vkontakte/vkui";
import {Icon24Cancel, Icon24Done} from "@vkontakte/icons";
import React, {SetStateAction, useState} from "react";
import {lang} from "../../utils/langs";

interface Props {
  activeModal: string | null;
  setActiveModal: SetStateAction<any>;
  text: string;
}

export const RulesModal = (props: Props) => {
  const closeModal = () => props.setActiveModal(null);

  return <ModalRoot
    activeModal={props.activeModal}
    onClose={closeModal}
  >
    <ModalPage
      id="rules"
      onClose={closeModal}
      header={
        <ModalPageHeader
          left={platform() === ANDROID && <PanelHeaderButton onClick={closeModal}><Icon24Cancel/></PanelHeaderButton>}
          right={<PanelHeaderButton onClick={closeModal}>{platform() === IOS ? lang('modal_close_button') : <Icon24Done/>}</PanelHeaderButton>}
        >
          {lang('rules_header')}
        </ModalPageHeader>
      }
    >
      <Div className="RulesModal__text" dangerouslySetInnerHTML={{__html: props.text}}/>
      <Div/>
    </ModalPage>
  </ModalRoot>
};
