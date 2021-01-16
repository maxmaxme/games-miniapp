import React, {useEffect, useState} from 'react';

import {View} from "@vkontakte/vkui";
import {YesNoItem} from "../../utils/types";
import {lang} from "../../utils/langs";
import {getYesNoBase} from "./yesnobase";
import {Intro} from "./panels/Intro";
import {ListView} from "./panels/ListView";
import {ViewOne} from "./panels/ViewOne";
import {RulesModal} from "../../components/RulesModal/RulesModal";

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
  const [activePanel, setActivePanel] = useState<string>(Panels.INTRO);
  const [selectedYesNo, setSelectedYesNo] = useState<YesNoItem|null>(null)
  const [history] = useState([Panels.INTRO]);

  const openYesNo = (yesNo: YesNoItem) => {
    setSelectedYesNo(yesNo);
    go(Panels.ONE_VIEW);
  }

  useEffect(() => {
    // props.setDisableSwipeBack(isActiveGame);
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const modals = <RulesModal activeModal={activeModal} setActiveModal={setActiveModal} text={lang('games_yesno_rules')}/>;

  const goBack = () => {
    history.pop()
    setActivePanel(history[history.length - 1])
  }
  const go = (to: string) => {
    window.history.pushState( {panel: to}, to ); // Создаём новую запись в истории браузера
    setActivePanel(to); // Меняем активную view
    // @ts-ignore
    history.push(to); // Добавляем панель в историю
  };

  return <View
    id={props.id}
    activePanel={activePanel}
    modal={modals}
    history={history}
    onSwipeBack={goBack}
  >
    <Intro
      id={Panels.INTRO}
      yesNoBase={yesNoBase}
      openYesNo={openYesNo}
      go={go}
      openRules={() => setActiveModal('rules')}
    />

    <ListView
      id={Panels.LIST_VIEW}
      yesNoBase={yesNoBase}
      goBack={goBack}
      openYesNo={openYesNo}
    />
    <ViewOne
      id={Panels.ONE_VIEW}
      goBack={goBack}
      yesNoItem={selectedYesNo as YesNoItem}
    />
  </View>
}

