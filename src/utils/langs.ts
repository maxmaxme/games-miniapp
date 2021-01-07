export function lang(langKey: string): string {
  const langs: { [name: string]: string } = {
    gamelist_search_placeholder: 'Поиск',
    gamelist_search_filters_button: 'Фильтры: все игры',
    gameslist_search_sort_popularity: 'Сортировка: сначала доступные',
    gamelist_search_not_found: 'Не найдено',
    gamelist_item_unavailable: 'Скоро',

    modal_close_button: 'Закрыть',
    rules_header: 'Правила',
    card_add_to_favorite: 'В закладки',
    card_added_to_favorite: 'В закладках',
    card_share_app: 'Поделиться',
    card_share_app_text: 'Мини–приложение с настольными играми для компании. «Я никогда не..», «Данетка», «Общие вопросы» и другие',

    games_truthordare_title: 'Правда или действие',
    games_openquestions_title: 'Открытые вопросы',
    games_danetka_title: 'Данетка',

    games_spyfall_title: 'Шпион',
    games_spyfall_start_game_full_button: 'Начать игру',
    games_spyfall_rules_button: 'Правила игры',
    games_spyfall_players_count: 'Количество игроков: %s',
    games_spyfall_next_player_button: 'Далее',
    games_spyfall_end_game_button: 'Закончить игру',
    games_spyfall_timer_label: 'Прошло ',
    games_spyfall_next_player: 'Передайте телефон игроку %s',
    games_spyfall_you_spy_text: 'Вы — Шпион',
    games_spyfall_spy_text: 'Шпион — игрок %s',
    games_spyfall_rules: `В игре участвуют местные и шпионы. Передавайте друг другу телефон, чтобы узнать свою роль. 
                      Всем местным будет сообщена локация, Шпиону — нет.<br>
                      Задавайте друг другу вопросы, связанные с данной локацией. Например, «Когда ты последний раз был в этом месте?». 
                      Право задать следующий вопрос переходит отвечающему.<br>
                      Прислушивайтесь к ответам других игроков, Шпион не знает слово и может отвечать неточно.<br>
                      Если подозреваешь кого-то в Шпионаже, скажи «Я знаю, кто Шпион». На счёт «три» каждый игрок должен 
                      указать на того человека, который, на их взгляд, Шпион.<br>
                      – Выбрали одно и того же человека? Он должен раскрыть свою роль. Если это действительно Шпион, местные победили.<br>
                      – Если же этот игрок оказывается местным, игра заканчивается в пользу Шпиона.<br>
                      – Указали на разных людей? Продолжайте играть<br><br>

                      Если шпион догадался, о какой локации говорят местные, он может её назвать. Если он угадывает, победа его. Если же нет — побеждают местные<br>
                      Игра будет динамичнее, если играть на время. Договоритесь сами о времени, за которое нужно найти Шпиона (обычно 5–10 минут). Если время кончилось, 
                      у местных есть последний шанс угадать, кто Шпион, иначе он победит`,

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
