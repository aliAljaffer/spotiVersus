// 1 - Top, 2 - Bottom, 0 - No choice yet
export type TGameState = {
  score: number;
  previousScore?: number;
  started: boolean;
  excludedArtists: string[];
};
