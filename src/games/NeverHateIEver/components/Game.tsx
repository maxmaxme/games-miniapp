import React, {useState} from "react";
import {Div, Placeholder, Subhead, Title} from "@vkontakte/vkui";
import {GameButtons} from "./GameButtons";
import {defaultProps} from "../../../utils/types";
import {lang} from "../../../utils/langs";
import {ReactSVG} from "react-svg";

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
        <>
          <Title level="1" className="NeverHateIEver__phrase" weight="medium">{phrase}</Title>
          <Subhead className="NeverHateIEver__phraseHint" weight="regular" dangerouslySetInnerHTML={{__html: lang('games_neverihaveever_phrase_hint')}}/>
        </>
      }
    </Div> : <Placeholder stretched>
      {lang('games_neverihaveever_game_hint')}
      <div className="NeverHateIEver__placeholderIcon"><ReactSVG src="/icons/down-chevron.svg" /></div>
    </Placeholder>}
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
