import { TArtist } from "../types/TArtist";

export const DB_START = 10001;
export const DB_END = 14000;
export const NUM_ARTISTS_TO_FETCH = 2500;
export const getRandomId = (
  start: number = DB_START,
  end: number = DB_END,
  excludedIds?: number[]
): number => {
  let randomNumber = Math.floor(Math.random() * (end - start + 1) + start);
  if (excludedIds === undefined) return randomNumber;
  while (excludedIds.includes(randomNumber))
    randomNumber = getRandomId(DB_START, DB_END);
  return randomNumber;
};

type Data = {
  artist: string;
  country: string;
  pic: string;
  listeners: number;
  artist_id: string;
};

export const dataToArtist = (data: Data): TArtist => {
  const newArtist: TArtist = {
    name: data?.artist,
    country: data?.country,
    image: data?.pic,
    listeners: data?.listeners,
    spotifyId: data?.artist_id,
  };
  return newArtist;
};

export const formatNumber = (number: number): string => {
  return Intl.NumberFormat("en-UK").format(
    number
  );
};
