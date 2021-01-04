export function getLang(langKey: string): string {
  const langs: { [name: string]: string } = {
    'gamelist_search_placeholder': 'Поиск',
    'gamelist_search_filters_button': 'Фильтры',
    'gameslist_search_sort_popularity': 'Сортировка: по популярности',
  };

  return langs[langKey] ? langs[langKey] : langKey.replace('_', ' ');
}
