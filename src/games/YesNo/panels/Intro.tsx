import {Button, CellButton, Div, Group, IOS, Panel, PanelHeader, PanelHeaderButton, platform, Title} from "@vkontakte/vkui";
import {lang, langNumeric} from "../../../utils/langs";
import React from "react";
import {GoFunc, YesNoItem} from "../../../utils/types";
import {Panels} from "../YesNo";
import {shuffleArray} from "@vkontakte/vkjs";
import {Icon24Cancel, Icon28CancelOutline} from "@vkontakte/icons";

interface Props {
  id: string;
  go: GoFunc;
  openRules: () => void;
  yesNoBase: YesNoItem[];
  openYesNo: (yesNo: YesNoItem) => void;
}

export const Intro = (props: Props) => (
  <Panel id={props.id}>
    <PanelHeader
      left={<PanelHeaderButton onClick={() => window.history.back()} data-to="home">{(platform() === IOS ? <Icon28CancelOutline/> : <Icon24Cancel/>)}</PanelHeaderButton>}
    >
      {lang('games_spyfall_title')}
    </PanelHeader>
    <Group separator="hide">
      <CellButton onClick={() => props.openRules()}>
        {lang('games_yesno_rules_button')}
      </CellButton>
    </Group>
    <Div>
      <Title style={{marginBottom: 20, marginTop: 20, textAlign: 'center'}} level="2" weight="regular">
        {langNumeric(props.yesNoBase.length, 'games_yesno_base_count').replace('%s', props.yesNoBase.length.toString())}
      </Title>
      <Group separator="hide">
        <Button
          onClick={() => props.go(Panels.LIST_VIEW)}
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
  </Panel>
)
