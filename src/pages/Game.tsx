import { useRef, useState } from "react";
import Artist from "../components/Artist";
import { TArtist } from "../types/TArtist";
import useArtist from "../hooks/useArtist";
import {
  getRandomId,
  dataToArtist,
  NUM_ARTISTS_TO_FETCH,
} from "../utils/helpers";
import { Navigate } from "react-router-dom";
import Error from "../components/Error";
import { Loading } from "../components/Loading";

export default function Game() {
  const [isPlayerWinning, setIsPlayerWinning] = useState<boolean>(true);
  const choseFirst = useRef<boolean>(false);
  const score = useRef<number>(0);
  const exclusions = useRef<number[]>([]);
  const midPoint = Math.floor(NUM_ARTISTS_TO_FETCH / 2);
  const [firstId, setFirstId] = useState<number>(
    getRandomId(0, midPoint - 1, exclusions.current)
  );
  const [secondId, setSecondId] = useState<number>(
    getRandomId(midPoint, midPoint * 2, exclusions.current)
  );
  const { artists, isError, isLoading } = useArtist(exclusions.current);
  const arrLength = artists !== undefined ? artists.length : midPoint;
  const firstArtist =
    firstId === -1 ? undefined : dataToArtist(artists?.at(firstId % arrLength));
  const secondArtist =
    secondId === -1
      ? undefined
      : dataToArtist(artists?.at(secondId % arrLength));

  if (
    (secondArtist?.name === firstArtist?.name ||
      secondArtist?.listeners === firstArtist?.listeners) &&
    score.current > 0
  )
    return <Navigate to={`/winscreen?score=${score.current}`} />;

  const getWinner = (): TArtist => {
    if (!firstArtist || !secondArtist)
      return {
        name: "Invalid",
        image: "",
        spotifyId: "",
        country: "SA",
        listeners: 0,
      };
    return firstArtist.listeners > secondArtist.listeners
      ? firstArtist
      : secondArtist;
  };

  const handleUserChoice = (chosenArtist: TArtist, isTop: boolean): void => {
    const winner = getWinner();
    const setterToUse = isTop ? setFirstId : setSecondId;
    choseFirst.current = chosenArtist.spotifyId === firstArtist?.spotifyId;
    // Winning choice, switch artist that was chosen
    if (winner.spotifyId === chosenArtist.spotifyId) {
      console.log("Win");
      score.current = score.current + 1;
      setterToUse(getRandomId(0, midPoint - 1, exclusions.current));
      return;
    }
    console.log("Loss");
    // Losing choice. Need to show end game screen and display score and artists listeners
    setIsPlayerWinning(false);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error reason="Data loading. Try again." />;
  if (!artists) return;

  exclusions.current.push(firstId);
  exclusions.current.push(secondId);

  if (!isPlayerWinning)
    return (
      <Navigate
        to={`/endscreen?firstArtist=${firstArtist?.name}&firstListeners=${firstArtist?.listeners}&secondArtist=${secondArtist?.name}&secondListeners=${secondArtist?.listeners}&score=${score.current}&choseFirst=${choseFirst.current}&firstId=${firstArtist?.spotifyId}&secondId=${secondArtist?.spotifyId}`}
      />
    );

  return (
    <div className="text-stone-800 bg-stone-100 h-screen flex justify-center items-center flex-col duration-300 transition-all">
      {firstArtist === undefined ? (
        <p>Loading artist...</p>
      ) : (
        <Artist
          artist={firstArtist}
          top={true}
          onClick={() => handleUserChoice(firstArtist, true)}
        />
      )}
      {secondArtist === undefined ? (
        <p>Loading artist...</p>
      ) : (
        <Artist
          artist={secondArtist}
          onClick={() => handleUserChoice(secondArtist, false)}
        />
      )}
    </div>
  );
}
