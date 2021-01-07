import React, {useState} from 'react';

import {Div, CellButton, Group, Panel, PanelHeader, PanelHeaderButton, Cell, List} from "@vkontakte/vkui";
import {platform, IOS} from '@vkontakte/vkui';
import {Icon24Back, Icon28ChevronBack, Icon20Check} from "@vkontakte/icons";
import {panelProps} from "../../utils/types";
import {lang} from "../../utils/langs";
import {getQuestions} from "./questions";
import './OpenQuestions.css';
import {localStorage} from "@vkontakte/vkjs";

const osName = platform();

export const OpenQuestions = (props: panelProps) => {
  const questions = getQuestions();
  const LSKey = 'games_openquestions_viewedQuestions';
  const viewedFromLS = localStorage.getItem(LSKey) ?
    String(localStorage.getItem(LSKey)).split(',').map(num => parseInt(num)) : [];

  const [viewedQuestions, setViewedQuestions] = useState<number[]>(viewedFromLS);

  const clickQuestion = (num: number) => {
    if (viewedQuestions.includes(num)) {
      const index = viewedQuestions.indexOf(num);
      if (index !== -1) {
        viewedQuestions.splice(index, 1);
      }
    } else {
      viewedQuestions.push(num)
    }
    setViewedQuestions([...viewedQuestions]);
    localStorage.setItem(LSKey, viewedQuestions.join(','))
  }

  const resetViewed = () => {
    setViewedQuestions([]);
    localStorage.setItem(LSKey, '')
  }

  return (
    <Panel id={props.id}>
      <PanelHeader
        left={<PanelHeaderButton onClick={() => window.history.back()} data-to="home">
          {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </PanelHeaderButton>}
      >
        {lang('games_openquestions_title')}
      </PanelHeader>
      <Group separator="hide">
        <CellButton onClick={() => props.openModal('OpenQuestions_rules')}>
          {lang('games_openquestions_rules_button')}
        </CellButton>
      </Group>
      <Div style={{paddingTop: 0}} className="OpenQuestions__header">{lang('games_openquestions_questions')}</Div>
      <List>
        {questions.map((question, num) => <Cell
          key={'question' + num} onClick={() => clickQuestion(num)}
          after={viewedQuestions.includes(num) ? <Icon20Check/> : null}
          multiline
        >
          <div className="OpenQuestions__question"><b>{num + 1}</b>. {question}</div>
        </Cell>)}
      </List>

      {viewedQuestions.length > 0 && <Group>
        <CellButton onClick={() => resetViewed()}>
          {lang('games_openquestions_reset_viewed')}
        </CellButton>
      </Group>}
    </Panel>
  );
}

