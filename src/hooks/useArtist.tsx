import { supabase } from "./supabase";
import { useQuery } from "react-query";
import {
  getRandomId,
  NUM_ARTISTS_TO_FETCH,
  DB_START,
  DB_END,
} from "../utils/helpers";
import "../types/supabase";
export default function useArtist(excludedIds: number[]) {
  const randomId = getRandomId(DB_START, DB_START + NUM_ARTISTS_TO_FETCH);
  const midPoint = Math.floor(NUM_ARTISTS_TO_FETCH / 2);
  console.log(
    `ID ${randomId}, MIDPOINT ${midPoint}, VALID ID? ${
      randomId <= DB_END && randomId >= DB_START
    }`
  );
  const getArtists = async () => {
    const exclude =
      excludedIds.length === 0 ? "(-1)" : convertToPostgREST(excludedIds);
    const { data, error } = await supabase
      .from("monthly_listeners")
      .select("*")
      .lte("id", randomId + midPoint)
      .gte("id", randomId - midPoint)
      .not("id", "in", exclude)
      .limit(NUM_ARTISTS_TO_FETCH);
    if (error) throw new Error("Couldn't load artists");
    return data;
  };

  const {
    data: artists,
    isLoading,
    isError,
  } = useQuery(["artists"], getArtists, {
    staleTime: 2,
  });

  return { artists, isError, isLoading };
}

const convertToPostgREST = (arr: Array<number>) => {
  return "(" + arr.toString() + ")";
};
