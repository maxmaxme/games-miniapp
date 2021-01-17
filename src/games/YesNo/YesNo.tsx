import React, {useContext, useEffect, useState} from 'react';

import {View} from "@vkontakte/vkui";
import {YesNoItem} from "../../utils/types";
import {lang} from "../../utils/langs";
import {getYesNoBase} from "./yesnobase";
import {Intro} from "./panels/Intro";
import {ListView} from "./panels/ListView";
import {ViewOne} from "./panels/ViewOne";
import {RulesModal} from "../../components/RulesModal/RulesModal";
import {AppContext} from "../../AppContext";
import {transformActivePanel} from "../../utils/panels";

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

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const modals = <RulesModal activeModal={activeModal} setActiveModal={setActiveModal} text={lang('games_yesno_rules')}/>;

  return <View
    id={props.id}
    activePanel={activePanel}
    modal={modals}
    history={panelsHistory}
    onSwipeBack={goBackPanel}
  >
    <Intro
      id={Panels.INTRO}
      yesNoBase={yesNoBase}
      openYesNo={openYesNo}
      openRules={() => setActiveModal('rules')}
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

