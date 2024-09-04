// import { createContext, PropsWithChildren, useState } from "react";
// import { TGameStateContextType } from "../types/TGameStateContextType";
// import { TGameState } from "../types/TGameState";
// import { TArtist } from "../types/TArtist";
// import useSupabase from "../hooks/supabase";

// const initialState: TGameState = {
//   score: 0,
//   previousScore: 0,
//   started: false,
//   excludedArtists: ["50 Cent"],
// };

// export const GameStateContext = createContext<
//   TGameStateContextType | undefined
// >(undefined);

// export function GameStateProvider({ children }: PropsWithChildren) {
//   const [gameState, setGameState] = useState<TGameState>(initialState);

//   const supabase = useSupabase();

//   const addScore = () =>
//     setGameState((oldState) => ({ ...oldState, score: oldState.score + 1 }));

//   const startGame = () =>
//     setGameState((oldState) => ({ ...oldState, started: true }));
//   const endGame = () =>
//     setGameState((oldState) => ({
//       ...oldState,
//       score: 0,
//       started: false,
//       excludedArtists: ["50 Cent"],
//     }));

//   const getOneArtist = async (exclusions: string[]) => {
//     const randomNumber = Math.floor(
//       Math.random() * (DB_END - DB_START + 1) + DB_START
//     );
//     const { data, error } = await supabase
//       .from("monthly_listeners")
//       .select("*")
//       .eq("id", randomNumber);

//     if (error !== null) throw new Error("Couldn't fetch an artist.");

//     const found = exclusions.includes(data[0].artist);
//     if (found) getOneArtist(exclusions);

//     return newArtist;
//   };
//   const getTwoArtists = (): Promise<TArtist>[] => {
//     const first = getOneArtist(gameState.excludedArtists);
//     const second = getOneArtist(gameState.excludedArtists);
//     return [first, second];
//   };
//   const value: TGameStateContextType = {
//     addScore,
//     gameState,
//     startGame,
//     endGame,
//     getTwoArtists,
//     getOneArtist,
//   };
//   return (
//     <GameStateContext.Provider value={value}>
//       {children}
//     </GameStateContext.Provider>
//   );
// }
