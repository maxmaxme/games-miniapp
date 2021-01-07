import {Button, CellButton, Div, Group, Title} from "@vkontakte/vkui";
import {lang, langNumeric} from "../../../utils/langs";
import React, {SetStateAction} from "react";
import {defaultProps, YesNoItem} from "../../../utils/types";
import {YesNoViewTypes} from "../YesNo";
import {shuffleArray} from "@vkontakte/vkjs";

interface Props extends defaultProps {
  yesNoBase: YesNoItem[];
  setViewType: SetStateAction<any>;
  openYesNo: (yesNo: YesNoItem) => void;
}

export const Intro = (props: Props) => (
  <>
    <Group separator="hide">
      <CellButton onClick={() => props.openModal('YesNo_rules')}>
        {lang('games_yesno_rules_button')}
      </CellButton>
    </Group>
    <Div>
      <Title style={{marginBottom: 20, marginTop: 20, textAlign: 'center'}} level="2" weight="regular">
        {langNumeric(props.yesNoBase.length, 'games_yesno_base_count').replace('%s', props.yesNoBase.length.toString())}
      </Title>
      <Group separator="hide">
        <Button
          onClick={() => props.setViewType(YesNoViewTypes.LIST_VIEW)}
          stretched
          mode="secondary"
          size="l"
        >
          {lang('games_yesno_list_of_yesno')}
        </Button>
      </Group>
      <Group separator="hide">
        <Button
          onClick={() => props.openYesNo(shuffleArray(props.yesNoBase)[0])}
          stretched
          mode="secondary"
          size="l"
        >
          {lang('games_yesno_rand_yesno')}
        </Button>
      </Group>
    </Div>
  </>
)
