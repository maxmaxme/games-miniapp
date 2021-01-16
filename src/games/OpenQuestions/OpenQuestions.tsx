import React, {useState} from 'react';

import {View} from "@vkontakte/vkui";
import {lang} from "../../utils/langs";
import {getQuestions} from "./questions";
import './OpenQuestions.css';
import {doHaptic} from "../../utils/device";
import {LocalStorage, LocalStorageKeys} from "../../utils/localstorage";
import {QuestionsList} from "./panels/QuestionsList";
import {RulesModal} from "../../components/RulesModal/RulesModal";

interface Props {
  id: string;
}

export const OpenQuestions = (props: Props) => {
  enum Panels {
    LIST = 'list',
  }
  const questions = getQuestions();
  const viewedFromLS = LocalStorage.getNumberArray(LocalStorageKeys.OPENQUESTIONS_VIEWED_QUESTIONS, []);

  const [viewedQuestions, setViewedQuestions] = useState<number[]>(viewedFromLS);

  const clickQuestion = (num: number) => {
    doHaptic(true);
    if (viewedQuestions.includes(num)) {
      const index = viewedQuestions.indexOf(num);
      if (index !== -1) {
        viewedQuestions.splice(index, 1);
      }
    } else {
      viewedQuestions.push(num)
    }
    setViewedQuestions([...viewedQuestions]);
    LocalStorage.setNumberArray(LocalStorageKeys.OPENQUESTIONS_VIEWED_QUESTIONS, viewedQuestions);
  }

  const resetViewed = () => {
    setViewedQuestions([]);
    LocalStorage.setNumberArray(LocalStorageKeys.OPENQUESTIONS_VIEWED_QUESTIONS, []);
  }

  const [activePanel, setActivePanel] = useState<string>(Panels.LIST);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const modals = <RulesModal activeModal={activeModal} setActiveModal={setActiveModal} text={lang('games_openquestions_rules')}/>;

  return <View
    id={props.id}
    activePanel={activePanel}
    modal={modals}
  >
    <QuestionsList
      id={Panels.LIST}
      openRules={() => setActiveModal('rules')}
      clickQuestion={clickQuestion}
      questions={questions}
      resetViewed={resetViewed}
      viewedQuestions={viewedQuestions}
    />
  </View>;
}

