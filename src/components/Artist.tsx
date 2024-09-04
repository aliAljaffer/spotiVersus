import { TArtist } from "../types/TArtist";
import { flag } from "country-emoji";
import Button from "./Button";

// TODO: Move state UP! Game gets re-drawn with new artist(s)
type ArtistProps = {
  artist: TArtist;
  top?: boolean;
  onClick: () => void;
};

export default function Artist({ artist, top = false, onClick }: ArtistProps) {
  const topStyles = top
    ? "border-b-2 border-stone-500 justify-center pb-12"
    : "justify-center pt-12";

  if (artist === undefined) return <p>Loading artist...</p>;

  return (
    <div
      className={` flex-col  h-[50dvh] w-full flex  ${topStyles} items-center gap-3`}
    >
      <img
        src={artist?.image}
        className={` rounded-lg h-full w-auto max-w-[800px] p-12 ${
          !top && "order-1"
        } `}
        alt={`Artist ${artist?.name}`}
      />
      <Button
        onClick={onClick}
        className="text-stone-200 bg-stone-600 rounded-sm flex items-center justify-center space-x-2 border-b-2 border-r-2 border-transparent transition-all duration-300 hover:border-stone-300 py-3 px-4"
      >
        <h2 className="text-xl">{artist?.name}</h2>{" "}
        {artist?.country && (
          <span className="text-xl">{flag(artist?.country)}</span>
        )}
      </Button>
    </div>
  );
}
