import { formatNumber } from "../utils/helpers";

type ArtistStatisticsProps = {
  artistName: string | null;
  isHigher: boolean;
  artistListeners: number;
};

export default function ArtistStatistic({
  artistName,
  isHigher,
  artistListeners,
}: ArtistStatisticsProps) {
  const formattedListeners = formatNumber(artistListeners);
  return (
    <p className="text-stone-500 text-center font-bold text-lg tracking-widest p-2 text-wrap">
      {artistName} has{" "}
      <span
        className={`font-extrabold ${
          isHigher ? "text-green-500" : "text-red-500"
        }`}
      >
        {formattedListeners}
      </span>{" "}
      Spotify monthly listeners
    </p>
  );
}
