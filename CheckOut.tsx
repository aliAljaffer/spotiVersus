import React, { useState, useEffect, useMemo } from "react";
import { useGameState } from "./GameStateContext";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://your-project-id.supabase.co";
const supabaseKey = "your-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

const Artist = ({ onClick, artist }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-4 bg-white rounded shadow-md mb-4 w-64 text-center"
    >
      <h2 className="text-xl font-semibold">{artist.name}</h2>
      <p className="text-gray-500">
        {artist.monthlyListeners} Monthly Listeners
      </p>
    </div>
  );
};

const Game = () => {
  const { addScore } = useGameState();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial artists when the component mounts
    fetchArtists()
      .then((initialArtists) => {
        setArtists(initialArtists);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch artists");
        setLoading(false);
      });
  }, []);

  const fetchArtists = async () => {
    // Replace this with your actual Supabase query
    const { data, error } = await supabase
      .from("artists")
      .select("id, name, monthlyListeners")
      .limit(2);

    if (error) throw new Error(error.message);
    return data;
  };

  const fetchNewArtist = async () => {
    const { data, error } = await supabase
      .from("artists")
      .select("id, name, monthlyListeners")
      .limit(1)
      .single();

    if (error) throw new Error(error.message);
    return data;
  };

  const handleClick = async (chosenArtist) => {
    const correctArtist = artists.reduce((prev, current) =>
      prev.monthlyListeners > current.monthlyListeners ? prev : current
    );

    if (chosenArtist.id === correctArtist.id) {
      addScore();
      try {
        const newArtist = await fetchNewArtist();
        setArtists((prevArtists) =>
          prevArtists.map((artist) =>
            artist.id === correctArtist.id ? artist : newArtist
          )
        );
      } catch (err) {
        setError("Failed to fetch new artist");
      }
    } else {
      // Handle incorrect choice, reset game, etc.
      console.log("Incorrect choice");
    }
  };

  const memoizedArtists = useMemo(() => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }
    return artists.map((artist, index) => (
      <Artist
        key={artist.id}
        artist={artist}
        onClick={() => handleClick(artist)}
        top={index === 0}
      />
    ));
  }, [artists, loading, error]);

  return (
    <div className="text-stone-800 bg-stone-100 h-screen flex justify-center items-center flex-col">
      {memoizedArtists}
    </div>
  );
};

export default Game;
