import React, {SetStateAction} from "react";
import {Div, Button, FixedLayout, Separator, Footer} from "@vkontakte/vkui";
import {defaultProps} from "../../../utils/types";
import {lang, langNumeric} from "../../../utils/langs";
import bridge from "@vkontakte/vk-bridge";

interface Props extends defaultProps {
  phrases: string[],
  punishments: string[],
  setPhrase: SetStateAction<any>
  setPunishment: SetStateAction<any>
  phrase: string | undefined,
}

export const GameButtons = (props: Props) => {
  const { phrase, phrases, punishments, setPhrase, setPunishment} = props;
  const getAndShift = (from: string[]): string | undefined => {
    return from.shift();
  }

  return <FixedLayout vertical="bottom">

    <Separator wide />
    <Footer>
      {lang('games_neverihaveever_left_count')
        .replace('{phrases}', langNumeric(phrases.length, 'games_neverihaveever_left_phrases').replace('%s', String(phrases.length)))
        .replace('{punishments}', langNumeric(punishments.length, 'games_neverihaveever_left_punishments').replace('%s', String(punishments.length)))
      }
    </Footer>

    <Div style={{display: 'flex'}}>
      <Button
        size="l"
        stretched
        style={{ marginRight: 8 }}
        disabled={!phrases.length}
        onClick={() => {
          bridge.send("VKWebAppTapticSelectionChanged", {});
          setPhrase(getAndShift(phrases))
          setPunishment(undefined)
        }}
      >
        {lang(phrase ? 'games_neverihaveever_next_phrase_button' : 'games_neverihaveever_start_game_button')}
      </Button>
      <Button
        size="l"
        stretched
        mode="secondary"
        disabled={phrase === undefined || !punishments.length}
        onClick={() => {
          bridge.send("VKWebAppTapticSelectionChanged", {});
          setPunishment(getAndShift(punishments))
        }}
      >
        {lang('games_neverihaveever_next_punishment_button')}
      </Button>
    </Div>
  </FixedLayout>
}
