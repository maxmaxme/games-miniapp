import React, { useContext, useState } from 'react';

import { View } from '@vkontakte/vkui';
import { YesNoItem } from '../../utils/types';
import { getYesNoBase } from './yesnobase';
import { Intro } from './panels/Intro';
import { ListView } from './panels/ListView';
import { ViewOne } from './panels/ViewOne';
import { AppContext } from '../../AppContext';
import { Panels, transformActivePanel } from '../../utils/panels';
import { Modals } from '../../panels/Modals';
import { transformHistory } from '../../utils/history';

const yesNoBase = getYesNoBase();

interface Props {
  id: string;
}

export const YesNo = (props: Props) => {
  const [selectedYesNo, setSelectedYesNo] = useState<YesNoItem|null>(null);

  let { activePanel, history, goBack, go, activeView } = useContext(AppContext);
  activePanel = transformActivePanel(activePanel, Panels.YES_OR_NO_INTRO, Panels);

  const openYesNo = (yesNo: YesNoItem) => {
    setSelectedYesNo(yesNo);
    go(activeView, Panels.YES_OR_NO_ONE_VIEW, null);
  };

  return <View
    id={props.id}
    activePanel={activePanel}
    modal={<Modals />}
    history={transformHistory(activeView, history)}
    onSwipeBack={goBack}
  >
    <Intro
      id={Panels.YES_OR_NO_INTRO}
      yesNoBase={yesNoBase}
      openYesNo={openYesNo}
    />

    <ListView
      id={Panels.YES_OR_NO_LIST_VIEW}
      yesNoBase={yesNoBase}
      openYesNo={openYesNo}
    />
    <ViewOne
      id={Panels.YES_OR_NO_ONE_VIEW}
      yesNoItem={selectedYesNo as YesNoItem}
    />
  </View>;
};

