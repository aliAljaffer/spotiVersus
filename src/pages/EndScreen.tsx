import Button from "../components/Button";
import MainPage from "./MainPage";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import ArtistStatistic from "../components/ArtistStatistic";

const baseSpotifyUrl = "https://open.spotify.com/artist/";

export default function EndScreen() {
  const previousScore = useRef<number>(0);
  const [params] = useSearchParams();
  const firstArtist = params.get("firstArtist");
  const secondArtist = params.get("secondArtist");
  const firstId = params.get("firstId");
  const secondId = params.get("secondId");
  const firstListeners = Number(params.get("firstListeners"));
  const secondListeners = Number(params.get("secondListeners"));
  const score = Number(params.get("score"));
  const choseFirst = params.get("choseFirst") === "true";
  const highScore = previousScore.current;
  previousScore.current = Math.max(previousScore.current, score);

  return (
    <main className="text-stone-800 bg-stone-100 h-[100dvh] flex justify-center items-center">
      <MainPage>
        <h1 className="text-stone-800 font-bold text-4xl text-wrap tracking-widest p-2  text-center uppercase">
          You lost!
        </h1>
        <p className="text-stone-500 w-96 text-center text-wrap font-bold text-xl tracking-widest p-2">
          You chose{" "}
          <span className="text-yellow-600 font-bold">
            {choseFirst ? firstArtist : secondArtist}
          </span>
        </p>
        <div className="p-4 gap-4 w-full flex text-wrap flex-col items-center justify-center text-center">
          <ArtistStatistic
            artistName={firstArtist}
            artistListeners={firstListeners}
            isHigher={secondListeners < firstListeners}
          />
          <ArtistStatistic
            artistName={secondArtist}
            artistListeners={secondListeners}
            isHigher={secondListeners > firstListeners}
          />
          <p className="text-lg">Support the artists:</p>
          <div className="transition-all duration-300 flex gap-8 justify-center text-stone-600 tracking-wide items-center font-extrabold  ">
            <a
              className="cursor-pointer hover:text-yellow-600 transition-all duration-300 "
              href={baseSpotifyUrl + firstId}
              target="_blank"
            >
              {firstArtist}
            </a>
            <a
              target="_blank"
              className="transition-all duration-300  cursor-pointer hover:text-yellow-600"
              href={baseSpotifyUrl + secondId}
            >
              {secondArtist}
            </a>
          </div>
          <p className="text-stone-500 w-96 text-center text-wrap font-bold text-xl tracking-widest p-2 ">
            You scored: <span>{score}</span>
            {highScore !== 0 && (
              <>
                <br />
                <p className="font-semibold text-stone-500 text-lg">
                  Your highest score was: <span>{highScore}</span>
                </p>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-3 w-64">
          <Button
            className="text-lg flex bg-stone-600 text-stone-200 uppercase tracking-widest items-center justify-center space-x-2 border-b-2 border-r-2 border-transparent transition-all duration-300 hover:border-stone-300 py-3 px-4 w-full"
            to="/start"
          >
            Restart?
          </Button>
          <Button
            className=" text-lg flex text-stone-600 bg-stone-200 uppercase tracking-widest items-center justify-center space-x-2 border-b-2 border-r-2 border-transparent transition-all duration-300 hover:border-stone-300 py-3 px-4 w-full"
            to="/"
          >
            Home
          </Button>
        </div>
      </MainPage>
    </main>
  );
}
