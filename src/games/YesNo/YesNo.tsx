import React, {useContext, useState} from 'react';

import {View} from "@vkontakte/vkui";
import {YesNoItem} from "../../utils/types";
import {getYesNoBase} from "./yesnobase";
import {Intro} from "./panels/Intro";
import {ListView} from "./panels/ListView";
import {ViewOne} from "./panels/ViewOne";
import {AppContext} from "../../AppContext";
import {transformActivePanel} from "../../utils/panels";
import {Modals} from "../../panels/Modals";

const yesNoBase = getYesNoBase();

export enum Panels {
  INTRO = 'intro',
  LIST_VIEW = 'list_view',
  ONE_VIEW = 'one_view',
}

interface Props {
  id: string;
}

export const YesNo = (props: Props) => {
  const [selectedYesNo, setSelectedYesNo] = useState<YesNoItem|null>(null)

  let {activePanel, panelsHistory, goBackPanel, changePanel} = useContext(AppContext);
  activePanel = transformActivePanel(activePanel, Panels.INTRO, Panels);

  const openYesNo = (yesNo: YesNoItem) => {
    setSelectedYesNo(yesNo);
    changePanel(Panels.ONE_VIEW);
  }

  return <View
    id={props.id}
    activePanel={activePanel}
    modal={<Modals />}
    history={panelsHistory}
    onSwipeBack={goBackPanel}
  >
    <Intro
      id={Panels.INTRO}
      yesNoBase={yesNoBase}
      openYesNo={openYesNo}
    />

    <ListView
      id={Panels.LIST_VIEW}
      yesNoBase={yesNoBase}
      openYesNo={openYesNo}
    />
    <ViewOne
      id={Panels.ONE_VIEW}
      yesNoItem={selectedYesNo as YesNoItem}
    />
  </View>
}

