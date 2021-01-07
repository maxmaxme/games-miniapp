import React, {SetStateAction} from "react";
import {Cell, Switch} from "@vkontakte/vkui";
import './ListItemComponent.css';
import {WordsListItem} from "../../utils/types";
import {lang} from "../../utils/langs";

interface Props {
  key: string;
  item: WordsListItem;
  selected: number[];
  setSelected: SetStateAction<any>;
}

export const ListItemComponent = (props: Props) => {
  const item = props.item;
  const selected = props.selected;
  const setSelected = props.setSelected;


  const onClick = (id: number, selected: number[], setSelected: SetStateAction<any>, event: any) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(selectedId => selectedId !== id));
    } else {
      setSelected(selected.concat(id))
    }
  }

  const onClickFunc = () => onClick(item.id, selected, setSelected, window.event);
  const checked = selected.includes(item.id);
  const switchElement = <Switch
    checked={checked}
    onClick={onClickFunc}
  />
  return <Cell
    className="ListItem__cell"
    disabled
    key={props.key}
    // onClick={onClickFunc}
    after={item.disabled ? <div className="NeverHateIEver__ListItemDisabledLabel">{lang('listitem_disabled_label')}</div> : switchElement}
  >
    {item.title} ({item.words.length})
  </Cell>

  // eslint-disable-next-line
  return <Cell
    onClick={onClickFunc}
    key={props.key}
    selectable
    checked={checked}
    data-id={item.id}
  >
    {item.title}
  </Cell>
}
