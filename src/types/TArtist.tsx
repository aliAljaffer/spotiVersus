export type TArtist = {
  name: string;
  listeners: number;
  image: string;
  spotifyId: string;
  country: string;
};

export type TableRow = {
  id: number;
  created_at: string;
  rank: number;
  pic: string;
  artist: string;
  artist_id: string;
  country: string;
  listeners: number;
};
