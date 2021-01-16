import {Game, GameNames} from "../utils/types";
import {lang} from "../utils/langs";
import {Views} from "../utils/views";

export function getGames(): Game[] {
  return [
    {
      id: GameNames.NeverHateIEver,
      title: lang('games_neverihaveever_title'),
      duration: {min: 10},
      players: {min: 2, max: 10},
      image_url: '/img/games/never-have-i-ever.jpg',
      view: Views.NEVER_HATE_I_EVER,
    },
    {
      id: GameNames.SpyFall,
      title: lang('games_spyfall_title'),
      duration: {min: 3},
      players: {min: 3, max: 8},
      image_url: '/img/games/spy-fall.jpg',
      view: Views.SPYFALL,
    },
    {
      id: GameNames.YesNo,
      title: lang('games_yesno_title'),
      duration: {min: 5},
      players: {min: 2},
      image_url: '/img/games/yesno.jpg',
      view: Views.YES_OR_NO,
    },
    {
      id: GameNames.OpenQuestions,
      title: lang('games_openquestions_title'),
      duration: {min: 10},
      players: {min: 2},
      image_url: '/img/games/open-questions.jpeg',
      view: Views.OPEN_QUESTIONS,
    },
    {
      id: GameNames.TruthOrDare,
      title: lang('games_truthordare_title'),
      duration: {min: 10},
      players: {min: 2},
      image_url: '/img/games/truth-or-dare.jpg',
    },
    {
      id: GameNames.Twister,
      title: lang('games_twister_title'),
      duration: {min: 10},
      players: {min: 2},
      image_url: '/img/games/twister.jpg',
    },
    {
      id: GameNames.Alias,
      title: lang('games_alias_title'),
      duration: {min: 5},
      players: {min: 2},
      image_url: '/img/games/alias.jpg',
    },
  ];
}
