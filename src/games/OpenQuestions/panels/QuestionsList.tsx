import {Cell, CellButton, Div, Group, IOS, List, Panel, PanelHeader, PanelHeaderButton, platform} from "@vkontakte/vkui";
import {Icon20Check, Icon24Back, Icon24Cancel, Icon28CancelOutline, Icon28ChevronBack} from "@vkontakte/icons";
import {lang} from "../../../utils/langs";
import React from "react";

interface Props {
  id: string;
  openRules: () => void;
  questions: string[];
  viewedQuestions: number[]
  clickQuestion: (num: number) => void;
  resetViewed: () => void;
}

export const QuestionsList = (props: Props) => {
  return <Panel id={props.id}>
    <PanelHeader
      left={<PanelHeaderButton onClick={() => window.history.back()}>{(platform() === IOS ? <Icon28CancelOutline/> : <Icon24Cancel/>)}</PanelHeaderButton>}

    >
      {lang('games_openquestions_title')}
    </PanelHeader>
    <Group separator="hide">
      <CellButton onClick={() => props.openRules()}>
        {lang('games_openquestions_rules_button')}
      </CellButton>
    </Group>
    <Div style={{paddingTop: 0}} className="OpenQuestions__header">{lang('games_openquestions_questions')}</Div>
    <List>
      {props.questions.map((question, num) => <Cell
        key={'question' + num} onClick={() => props.clickQuestion(num)}
        after={props.viewedQuestions.includes(num) ? <Icon20Check/> : null}
        multiline
      >
        <div className="OpenQuestions__question"><b>{num + 1}</b>. {question}</div>
      </Cell>)}
    </List>

    {props.viewedQuestions.length > 0 && <Group>
      <CellButton onClick={() => props.resetViewed()}>
        {lang('games_openquestions_reset_viewed')}
      </CellButton>
    </Group>}
  </Panel>;
}
