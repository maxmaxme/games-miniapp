import {ANDROID, Div, IOS, ModalPage, ModalPageHeader, ModalRoot, PanelHeaderButton, platform} from "@vkontakte/vkui";
import {Icon24Cancel, Icon24Done} from "@vkontakte/icons";
import React from "react";

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
          right={<PanelHeaderButton onClick={props.closeModal}>{platform() === IOS ? 'Закрыть' : <Icon24Done/>}</PanelHeaderButton>}
        >
          Правила
        </ModalPageHeader>
      }
    >
      <Div>
        Правила просты и вполне укладываются в само название игры: при нажатии кнопки "Дальше" появляется текст, один из игроков зачитывает его вслух. После этого все те, кто не
        может согласиться с произнесенным (то есть, те, кто это делал или имел такой опыт), загибают палец на руке. 5 загнутых пальцев (или 10) — проигравшие выполняют наказание.<br />
        После выполнения наказания количество загнутых пальцев у всех игроков сбрасывается.
        <Div />
      </Div>
    </ModalPage>
  </ModalRoot>
);
