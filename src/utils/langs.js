export function getLang(langKey) {
  const langs = {
    gamelist_search_placeholder: 'Поиск',
  };

  return langs[langKey] ? langs[langKey] : langKey.replaceAll('_', ' ');
}
