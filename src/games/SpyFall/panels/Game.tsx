/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Div, FixedLayout, IOS, Panel, PanelHeader,
  PanelHeaderButton, Placeholder, platform, Separator } from '@vkontakte/vkui';
import Timer from 'react-compound-timer';
import { lang } from '../../../utils/langs';
import { doHaptic } from '../../../utils/device';
import { ReactSVG } from 'react-svg';
import { isWeb } from '../../../utils/platform';
import { Icon24Back, Icon28ChevronBack } from '@vkontakte/icons';

interface Props {
  id: string;
  spyPlayerNum: number;
  playersCount: number;
  word: string;
}

export const Game = (props: Props) => {
  const { word, playersCount, spyPlayerNum } = props;

  enum ViewStatus {
    RULES,
    WORD,
    GAME,
    RESULTS,
  }

  const [disabledEndGameButton, setDisabledEndGameButton] = useState(true);
  const [viewStatus, setViewStatus] = useState<ViewStatus>(ViewStatus.RULES);
  const [playerNum, setPlayerNum] = useState(1);

  let button = null;

  if ((viewStatus === ViewStatus.RULES || viewStatus === ViewStatus.WORD)) {
    button = <Button size="l" stretched onClick={() => {
      doHaptic(true);
      if (viewStatus === ViewStatus.RULES) {
        setViewStatus(ViewStatus.WORD);
      }
      if (viewStatus === ViewStatus.WORD) {
        if (playerNum + 1 <= playersCount) {
          setPlayerNum(playerNum + 1);
          setViewStatus(ViewStatus.RULES);
        } else {
          setViewStatus(ViewStatus.GAME);
        }
      }
    }}>{viewStatus === ViewStatus.RULES ?
      lang('games_spyfall_next_player_button').replace('%s', playerNum.toString()) :
      lang('games_spyfall_next_button')}</Button>;
  } else if (viewStatus === ViewStatus.GAME) {
    button = <Button size="l" disabled={disabledEndGameButton} stretched onClick={() => {
      doHaptic();
      setViewStatus(ViewStatus.RESULTS);
    }}>{lang('games_spyfall_end_game_button')}</Button>;
  }

  const timerCheckpoints = [
    {
      time: 3000,
      callback: () => setDisabledEndGameButton(false),
    },
  ];

  let icon = null;

  if (viewStatus === ViewStatus.RULES) {
    icon = 'right';
  } else if (viewStatus === ViewStatus.GAME) {
    icon = 'clock';
  } else if (viewStatus === ViewStatus.WORD) {
    icon = playerNum === spyPlayerNum ? 'spy' : 'speech-bubble';
  } else if (viewStatus === ViewStatus.RESULTS) {
    icon = 'spy';
  }

  const nextPlayerLang = isWeb() ? 'games_spyfall_next_player_web' : 'games_spyfall_next_player';

  return (<Panel id={props.id}>
    <PanelHeader
      left={<PanelHeaderButton onClick={() => window.history.back()}>
        {platform() === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}
    >
      {lang('games_spyfall_title')}
    </PanelHeader>
    <Placeholder stretched icon={icon ? <div className="SpyFall__spyIcon">
      <ReactSVG src={`/icons/${icon}.svg`}/></div> : undefined}>
      <div className="SpyFall__placeholderIn">
        {viewStatus === ViewStatus.RULES && lang(nextPlayerLang).replace('%s', playerNum.toString())}
        {viewStatus === ViewStatus.WORD && (playerNum === spyPlayerNum ? lang('games_spyfall_you_spy_text') : word)}
        {viewStatus === ViewStatus.RESULTS && lang('games_spyfall_spy_text').replace('%s', spyPlayerNum.toString())}
        {viewStatus === ViewStatus.GAME &&
        <Timer checkpoints={timerCheckpoints} formatValue={(n) => String(n < 10 ? '0' + n : n)}>
          {lang('games_spyfall_timer_label')} <Timer.Minutes/>:<Timer.Seconds/></Timer>}
      </div>
    </Placeholder>
    {button && <FixedLayout vertical="bottom">
      <Separator wide/>
      <Div>{button}</Div>
    </FixedLayout>}
  </Panel>);
};
