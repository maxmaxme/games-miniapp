export function getLang(langKey) {
  const langs = [

  ];

  return langs[langKey] ? langs[langKey] : langKey.replaceAll('_', ' ');
}