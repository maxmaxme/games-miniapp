import React, {useState} from "react";
import {Div, Placeholder} from "@vkontakte/vkui";
import {GameButtons} from "./GameButtons";
import {defaultProps} from "../../../utils/types";
import {lang} from "../../../utils/langs";

interface Props extends defaultProps {
  phrases: string[],
  punishments: string[]
}

export const Game = (props: Props) => {
  const {phrases, punishments, go, openModal} = props;
  const [phrase, setPhrase] = useState<string | undefined>(undefined);
  const [punishment, setPunishment] = useState<string | undefined>(undefined);

  return (<>
    {(punishment !== undefined || phrase !== undefined) ? <Div>
      {punishment ?
        <div className="NeverHateIEver__punishment">{punishment}</div> :
        <div className="NeverHateIEver__phrase">{phrase}</div>
      }
    </Div> : <Placeholder stretched>{lang('games_neverihaveever_game_hint')}</Placeholder>}
    <GameButtons
      go={go}
      openModal={openModal}
      phrases={phrases}
      punishments={punishments}
      phrase={phrase}
      setPhrase={setPhrase}
      setPunishment={setPunishment}
    />
  </>);
}
