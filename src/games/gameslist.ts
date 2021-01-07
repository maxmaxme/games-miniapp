import {Game, GameNames} from "../utils/types";
import {lang} from "../utils/langs";

export function getGames(): Game[] {
  return [
    {
      id: GameNames.NeverHateIEver,
      title: lang('games_neverihaveever_title'),
      duration: {min: 10},
      players: {min: 2, max: 10},
      image_url: '/img/games/never-have-i-ever.jpg',
    },
    {
      id: GameNames.SpyFall,
      title: lang('games_spyfall_title'),
      duration: {min: 3},
      players: {min: 3, max: 8},
      image_url: '/img/games/spy-fall.jpg',
    },
    {
      unavailable: true,
      id: GameNames.TruthOrDare,
      title: lang('games_truthordare_title'),
      duration: {min: 10},
      players: {min: 2},
      image_url: '/img/games/truth-or-dare.jpg',
    },
    {
      unavailable: true,
      id: GameNames.OpenQuestions,
      title: lang('games_openquestions_title'),
      duration: {min: 5},
      players: {min: 2},
      image_url: '/img/games/open-questions.jpeg',
    },
    {
      unavailable: true,
      id: GameNames.Danetka,
      title: lang('games_danetka_title'),
      duration: {min: 5},
      players: {min: 2},
      image_url: '/img/games/danetka.jpg',
    },
    {
      unavailable: true,
      id: GameNames.Twister,
      title: lang('games_twister_title'),
      duration: {min: 10},
      players: {min: 2},
      image_url: '/img/games/twister.jpg',
    },
    {
      unavailable: true,
      id: GameNames.Alias,
      title: lang('games_alias_title'),
      duration: {min: 5},
      players: {min: 2},
      image_url: '/img/games/alias.jpg',
    },
  ];
}
