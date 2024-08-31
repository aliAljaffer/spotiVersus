import { TArtist } from "./TArtist";
import { TGameState } from "./TGameState";

export type TGameStateContextType = {
  gameState: TGameState;
  addScore: () => void;
  startGame: () => void;
  endGame: () => void;
  getTwoArtists: () => Promise<TArtist>[];
  getOneArtist: (exclusions: string[]) => Promise<TArtist>;
};
