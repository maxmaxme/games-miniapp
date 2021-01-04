import React, {SetStateAction} from "react";
import {Div, Button, FixedLayout, Separator, Footer} from "@vkontakte/vkui";
import {defaultProps} from "../../../types";

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
    <Footer>Осталось {phrases.length} высказываний и {punishments.length} наказаний</Footer>

    <Div style={{display: 'flex'}}>
      <Button
        size="l"
        stretched
        style={{ marginRight: 8 }}
        disabled={!phrases.length}
        onClick={() => {
          setPhrase(getAndShift(phrases))
          setPunishment(undefined)
        }}
      >
        {phrase ? 'Высказывание' : 'Начать'}
      </Button>
      <Button
        size="l"
        stretched
        mode="secondary"
        disabled={phrase === undefined || !punishments.length}
        onClick={() => setPunishment(getAndShift(punishments))}
      >
        Наказание
      </Button>
    </Div>
  </FixedLayout>
}
