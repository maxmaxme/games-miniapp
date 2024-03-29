import React, { useContext, useState } from 'react';

import { View } from '@vkontakte/vkui';
import { getQuestions } from './questions';
import './OpenQuestions.css';
import { doHaptic } from '../../utils/device';
import { LocalStorage, LocalStorageKeys } from '../../utils/localstorage';
import { QuestionsList } from './panels/QuestionsList';
import { AppContext } from '../../AppContext';
import { Panels, transformActivePanel } from '../../utils/panels';
import { Modals } from '../../panels/Modals';

interface Props {
  id: string;
}

export const OpenQuestions = (props: Props) => {
  const questions = getQuestions();
  const viewedFromLS = LocalStorage.getNumberArray(LocalStorageKeys.OPENQUESTIONS_VIEWED_QUESTIONS, []);

  let { activePanel } = useContext(AppContext);
  activePanel = transformActivePanel(activePanel, Panels.OPEN_QUESTIONS_LIST, Panels);

  const [viewedQuestions, setViewedQuestions] = useState<number[]>(viewedFromLS);

  const clickQuestion = (num: number) => {
    doHaptic(true);
    if (viewedQuestions.includes(num)) {
      const index = viewedQuestions.indexOf(num);
      if (index !== -1) {
        viewedQuestions.splice(index, 1);
      }
    } else {
      viewedQuestions.push(num);
    }
    setViewedQuestions([...viewedQuestions]);
    LocalStorage.setNumberArray(LocalStorageKeys.OPENQUESTIONS_VIEWED_QUESTIONS, viewedQuestions);
  };

  const resetViewed = () => {
    setViewedQuestions([]);
    LocalStorage.setNumberArray(LocalStorageKeys.OPENQUESTIONS_VIEWED_QUESTIONS, []);
  };

  return <View
    id={props.id}
    activePanel={activePanel}
    modal={<Modals />}
  >
    <QuestionsList
      id={Panels.OPEN_QUESTIONS_LIST}
      clickQuestion={clickQuestion}
      questions={questions}
      resetViewed={resetViewed}
      viewedQuestions={viewedQuestions}
    />
  </View>;
};

