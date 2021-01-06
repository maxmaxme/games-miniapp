export function lang(langKey: string): string {
  const langs: { [name: string]: string } = {
    gamelist_search_placeholder: 'Поиск',
    gamelist_search_filters_button: 'Фильтры',
    gameslist_search_sort_popularity: 'Сортировка: по популярности',
    gamelist_search_not_found: 'Не найдено',
    gamelist_item_unavailable: 'Скоро',

    modal_close_button: 'Закрыть',
    rules_header: 'Правила',

    games_truthordare_title: 'Правда или действие',
    games_openquestions_title: 'Открытые вопросы',
    games_danetka_title: 'Данетка',

    games_neverihaveever_title: 'Я никогда не..',
    games_neverihaveever_left_count: 'Осталось {phrases} и {punishments}',
    games_neverihaveever_next_phrase_button: 'Высказывание',
    games_neverihaveever_next_punishment_button: 'Наказание',
    games_neverihaveever_start_game_button: 'Начать',
    games_neverihaveever_start_game_full_button: 'Начать игру',
    games_neverihaveever_phrases_tab: 'Высказывания',
    games_neverihaveever_punishments_tab: 'Наказания',
    games_neverihaveever_rules_button: 'Правила игры',
    games_neverihaveever_listitem_disabled: 'Скоро',
    games_neverihaveever_rules: `Правила просты и вполне укладываются в само название игры: при нажатии кнопки "Высказывание" появляется текст, 
                                 один из игроков зачитывает его вслух. После этого все те, кто не может согласиться с произнесенным (то есть, те, 
                                 кто это делал или имел такой опыт), загибают палец на руке. 5 загнутых пальцев (или 10) — проигравшие выполняют 
                                 наказание.<br /> После выполнения наказания, количество загнутых пальцев у всех игроков сбрасывается.`,
  };

  return langs[langKey] ? langs[langKey] : langKey.replace('_', ' ');
}

export function langNumeric(value: number, langKey: string): string {
  // 1; 3; 10
  const langs: { [name: string]: string[] } = {
    gamelist_search_count: ['%s игра', '%s игры', '%s игр'],
    gamelist_item_tag_minutes: ['%s минута', '%s минуты', '%s минут'],
    gamelist_item_tag_players: ['%s игрок', '%s игрока', '%s игроков'],
    games_neverihaveever_left_phrases: ['%s высказывание', '%s высказывания', '%s высказываний'],
    games_neverihaveever_left_punishments: ['%s наказание', '%s наказания', '%s наказаний'],
  };

  const fallback = langKey.replace('_', ' ');

  const words = langs[langKey] ? langs[langKey] : [fallback, fallback, fallback];
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];

}
