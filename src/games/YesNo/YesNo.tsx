import React, {useState} from 'react';

import {Button, Div, FormItem, Group, Panel, PanelHeader, PanelHeaderButton, Title, View} from "@vkontakte/vkui";
import {platform, IOS} from '@vkontakte/vkui';
import {Icon24Back, Icon28ChevronBack} from "@vkontakte/icons";
import {panelProps, YesNoItem} from "../../utils/types";
import {lang, langNumeric} from "../../utils/langs";
import {getYesNoBase} from "./yesnobase";
import {shuffleArray} from "@vkontakte/vkjs";
import {Intro} from "./components/Intro";
import {ListView} from "./components/ListView";
import {ViewOne} from "./components/ViewOne";

const osName = platform();
const yesNoBase = getYesNoBase();

export enum YesNoViewTypes {
  INTRO,
  LIST_VIEW,
  VIEW_ONE,
}

export const YesNo = (props: panelProps) => {

  const [selectedYesNo, setSelectedYesNo] = useState<YesNoItem|null>(null)
  const [viewType, setViewType] = useState<YesNoViewTypes>(YesNoViewTypes.INTRO);

  const openYesNo = (yesNo: YesNoItem) => {
    setSelectedYesNo(yesNo);
    setViewType(YesNoViewTypes.VIEW_ONE);
  }

  const onBackClick = viewType !== YesNoViewTypes.INTRO ? () => {
    setViewType(YesNoViewTypes.INTRO)
  } : props.go;

  return (
    <Panel id={props.id}>
      <PanelHeader
        left={<PanelHeaderButton onClick={onBackClick} data-to="home">
          {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </PanelHeaderButton>}
      >
        {lang('games_yesno_title')}
      </PanelHeader>
      {viewType === YesNoViewTypes.INTRO && <Intro yesNoBase={yesNoBase} setViewType={setViewType} openYesNo={openYesNo} go={props.go} openModal={props.openModal} />}
      {viewType === YesNoViewTypes.LIST_VIEW && <ListView yesNoBase={yesNoBase} openYesNo={openYesNo} />}
      {(viewType === YesNoViewTypes.VIEW_ONE && selectedYesNo) && <ViewOne yesNoItem={selectedYesNo} />}
    </Panel>
  );
}

