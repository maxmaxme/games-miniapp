import {Button, Card, Div, FixedLayout, IOS, Panel, PanelHeader, PanelHeaderButton, platform, Separator, Title} from "@vkontakte/vkui";
import React, {useContext, useState} from "react";
import {YesNoItem} from "../../../utils/types";
import './ViewOne.css';
import {classNames} from "@vkontakte/vkjs";
import {lang} from "../../../utils/langs";
import {doHaptic} from "../../../utils/device";
import {Icon24Back, Icon28ChevronBack} from "@vkontakte/icons";
import {AppContext} from "../../../AppContext";

interface Props {
  id: string;
  yesNoItem: YesNoItem;
}

export const ViewOne = (props: Props) => {
  const [flipped, setFlipped] = useState(false);
  return <Panel id={props.id}>
    <PanelHeader
      left={<PanelHeaderButton onClick={() => window.history.back()}>{platform() === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}
    >
      {lang('games_yesno_title')}
    </PanelHeader>
    <Div>
      <div className="YesNo__cards">
        <Card className={classNames('YesNo__card', 'YesNo__card--front', {'YesNo__card--flipped': flipped})}>
          <Title className="YesNo__cardHeader" level="2" weight="regular">{props.yesNoItem.title}</Title>
          <Div className="YesNo__cardText">{props.yesNoItem.question}</Div>
        </Card>
        <Card className={classNames('YesNo__card', 'YesNo__card--back', {'YesNo__card--flipped': flipped})}>
          <Title className="YesNo__cardHeader" level="2" weight="regular">{lang('games_yesno_answer')}</Title>
          <Div className="YesNo__cardText">{props.yesNoItem.answer}</Div>
        </Card>
      </div>
    </Div>
    <FixedLayout vertical="bottom">
      <Separator wide/>
      <Div>
        <Button stretched mode="secondary" size="l" onClick={() => {
          doHaptic();
          setFlipped(!flipped)
        }}>
          {flipped ? lang('games_yesno_hide_answer') : lang('games_yesno_show_answer')}
        </Button>
      </Div>
    </FixedLayout>
  </Panel>
}
