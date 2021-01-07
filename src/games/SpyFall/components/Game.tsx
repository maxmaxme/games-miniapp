import React, {useState} from "react";
import {Button, Div, FixedLayout, Placeholder, Separator} from "@vkontakte/vkui";
import {defaultProps} from "../../../utils/types";
import Timer from "react-compound-timer";
import {lang} from "../../../utils/langs";
import bridge from "@vkontakte/vk-bridge";

interface Props extends defaultProps {
  spyPlayerNum: number;
  playersCount: number;
  word: string;
}

export const Game = (props: Props) => {
  const {word, playersCount, spyPlayerNum} = props;

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
      bridge.send("VKWebAppTapticSelectionChanged", {});
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
    }}>{lang('games_spyfall_next_player_button')}</Button>;
  } else if (viewStatus === ViewStatus.GAME) {
    button = <Button size="l" disabled={disabledEndGameButton} stretched onClick={() => {
      bridge.send("VKWebAppTapticSelectionChanged", {});
      setViewStatus(ViewStatus.RESULTS);
    }}>{lang('games_spyfall_end_game_button')}</Button>;
  }

  const timerCheckpoints = [
    {
      time: 3000,
      callback: () => setDisabledEndGameButton(false)
    }
  ]

  return (<>
    <Placeholder stretched>
      {viewStatus === ViewStatus.RULES && lang('games_spyfall_next_player').replace('%s', playerNum.toString())}
      {viewStatus === ViewStatus.WORD && (playerNum === spyPlayerNum ? lang('games_spyfall_you_spy_text') : word)}
      {viewStatus === ViewStatus.RESULTS && lang('games_spyfall_spy_text').replace('%s', spyPlayerNum.toString())}
      {viewStatus === ViewStatus.GAME && <Timer checkpoints={timerCheckpoints} formatValue={(n) => String(n < 10 ? '0' + n : n)}>{lang('games_spyfall_timer_label')} <Timer.Minutes/>:<Timer.Seconds/></Timer>}
    </Placeholder>
    {button && <FixedLayout vertical="bottom">
      <Separator wide/>
      <Div>{button}</Div>
    </FixedLayout>}
  </>);
}
