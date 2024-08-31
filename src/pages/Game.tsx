import { useEffect, useMemo, useRef, useState } from "react";
import Artist from "../components/Artist";
import { TArtist } from "../types/TArtist";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hseaihljqoilgnsuanse.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzZWFpaGxqcW9pbGduc3VhbnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwOTc5MzcsImV4cCI6MjA0MDY3MzkzN30.yBz9_o35KNbm0xblNeFI_q_w4uthsBom4UHMfA8d8Pc";
const supabase = createClient(supabaseUrl, supabaseKey);
if (!supabase) throw new Error("Couldn't retrieve supabase client");
// const artistBaseUrl = "";

const DB_START = 10001;
const DB_END = 14000;
function shuffleArray(array: TArtist[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
export default function Game() {
  const [topArtist, setTopArtist] = useState<TArtist>();
  const [bottomArtist, setBottomArtist] = useState<TArtist>();
  const [isLoading, setIsLoading] = useState(false);
  const excludedArtists = useRef<string[]>([]);
  const getOneArtist = async (exclusions: string[]) => {
    const randomNumber = Math.floor(
      Math.random() * (DB_END - DB_START + 1) + DB_START
    );
    setIsLoading(true);
    const { data, error } = await supabase
      .from("monthly_listeners")
      .select("*")
      .eq("id", randomNumber);

    if (error !== null) throw new Error("Couldn't fetch an artist.");

    const found = exclusions.includes(data[0].artist);
    if (found) getOneArtist(exclusions);

    const newArtist: TArtist = {
      name: data[0].artist,
      country: data[0].country,
      image: data[0].pic,
      listeners: data[0].listeners,
      spotifyId: data[0].artist_id,
    };
    setIsLoading(false);
    return newArtist;
  };
  const getTwoArtists = (): Promise<TArtist>[] => {
    const first = getOneArtist(excludedArtists.current);
    const second = getOneArtist(excludedArtists.current);
    return [first, second];
  };

  function findWinner(): 1 | 2 | -1 {
    if (topArtist === undefined || bottomArtist === undefined) return -1;
    const winner = topArtist.listeners > bottomArtist.listeners ? 1 : 2;
    return winner;
  }
  // const winner = findWinner();
  // if (winner === -1) throw new Error("Top or Bottom artist undefined.");
  // const loser = winner === 1 ? 2 : 1;
  // const memoizedCorrect = useMemo(() => (
  //   <Artist
  //     artist={winner === 1 ? topArtist : bottomArtist}
  //     onClick={() => {}}
  //   />
  // ));

  useEffect(function () {
    async function getArtist() {
      try {
        setIsLoading(true);
        const artists = getTwoArtists();
        setTopArtist(await artists[0]);
        setBottomArtist(await artists[1]);
        console.log("s");
      } catch {
        throw new Error("Couldn't get one artist @ Artist");
      } finally {
        setIsLoading(false);
      }
    }
    getArtist();
  }, []);
  const loaded = topArtist && bottomArtist;
  const arr = [topArtist, bottomArtist];
  shuffleArray(arr);

  return (
    <div className="text-stone-800 bg-stone-100 h-screen flex justify-center items-center flex-col">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Artist artist={arr[0]} top={true} onClick={() => {}} />
          <Artist artist={arr[1]} onClick={() => {}} />
        </>
      )}
    </div>
  );
}
