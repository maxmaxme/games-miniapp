import React, {SetStateAction} from "react";
import {Caption, Card, Title} from "@vkontakte/vkui";
import './ListItemComponent.css';
import {WordsListItem} from "../../utils/types";
import {langNumeric} from "../../utils/langs";
import {doHaptic} from "../../utils/device";
import {Icon24CheckCircleOn} from "@vkontakte/icons";
import {classNames} from "@vkontakte/vkjs";

interface Props {
  item: WordsListItem;
  selected: number[];
  setSelected: SetStateAction<any>;
}

export const ListItemComponent = (props: Props) => {
  const item = props.item;
  const selected = props.selected;
  const setSelected = props.setSelected;


  const onClick = (id: number, selected: number[], setSelected: SetStateAction<any>, event: any) => {
    doHaptic(true);
    if (selected.includes(id)) {
      setSelected(selected.filter(selectedId => selectedId !== id));
    } else {
      setSelected(selected.concat(id))
    }
  }

  const onClickFunc = () => onClick(item.id, selected, setSelected, window.event);
  const checked = selected.includes(item.id);
  return <Card
    className={classNames("ListItem", {"ListItem--checked": checked})}
    onClick={onClickFunc}
  >
    {checked && <div className="ListItem__checkbox"><Icon24CheckCircleOn/></div>}
    {item.image_url !== undefined && <>
      <div className="ListItem__photo" style={{backgroundImage: `url('${item.image_url}')`}}/>
    </>}
    <div className="ListItem__photoBlur"/>
    <div className="ListItem__container">
      <div className="ListItem__in">
        <Title className="ListItem__title" level="3" weight="medium">{item.title}</Title>
        <Caption className="ListItem__count" level="2" weight="regular">
          {langNumeric(item.words.length, 'listitem_words_count').replace('%s', item.words.length.toString())}
        </Caption>
      </div>
    </div>
  </Card>
}
