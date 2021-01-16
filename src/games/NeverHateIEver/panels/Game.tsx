import React, {useState} from "react";
import {Div, IOS, Panel, PanelHeader, PanelHeaderButton, Placeholder, platform, Subhead, Title} from "@vkontakte/vkui";
import {GameButtons} from "../components/GameButtons";
import {lang} from "../../../utils/langs";
import {ReactSVG} from "react-svg";
import {Icon24Back, Icon28ChevronBack} from "@vkontakte/icons";

interface Props {
  id: string;
  phrases: string[];
  punishments: string[];
  backClick: () => void;
}

export const Game = (props: Props) => {
  const {phrases, punishments} = props;
  const [phrase, setPhrase] = useState<string | undefined>(undefined);
  const [punishment, setPunishment] = useState<string | undefined>(undefined);

  return (<Panel id={props.id} className="NeverHateIEver__panel">
    <PanelHeader
      left={<PanelHeaderButton onClick={props.backClick}>{platform() === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}
    >
      {lang('games_neverihaveever_title')}
    </PanelHeader>
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
      // go={go}
      // openModal={openModal}
      phrases={phrases}
      punishments={punishments}
      phrase={phrase}
      setPhrase={setPhrase}
      setPunishment={setPunishment}
    />
  </Panel>);
}
