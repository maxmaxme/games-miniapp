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
      unavailable: true,
      id: GameNames.TruthOrDare,
      title: lang('games_truthordare_title'),
      duration: {min: 10},
      players: {min: 2, max: 10},
      image_url: '/img/games/truth-or-dare.jpg',
    },
    {
      unavailable: true,
      id: GameNames.OpenQuestions,
      title: lang('games_openquestions_title'),
      duration: {min: 10},
      players: {min: 2, max: 10},
      image_url: '/img/games/open-questions.jpeg',
    },
    {
      unavailable: true,
      id: GameNames.Danetka,
      title: lang('games_danetka_title'),
      duration: {min: 5},
      players: {min: 2, max: 10},
      image_url: '/img/games/danetka.jpg',
    },
  ];
}
