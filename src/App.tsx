// import React, { useState, useEffect, useCallback } from "react";
import Button from "./components/Button";
import "./index.css";
import MainPage from "./pages/MainPage";

// const artistBaseUrl = "";

function App() {
  return (
    <main className="text-stone-800 bg-stone-100 h-[100dvh] flex justify-center items-center">
      <MainPage>
        <h1 className="text-stone-800 font-bold text-4xl tracking-widest p-2">
          spotiVersus
        </h1>
        <p className="text-stone-500 w-64 text-center text-wrap font-bold text-xl tracking-widest p-2">
          Which artist has more monthly listeners on Spotify?
        </p>
        <Button
          className="flex items-center justify-center space-x-2 border-b-2 border-r-2 border-transparent transition-all duration-300 hover:border-stone-300 py-3 px-4"
          to="/start"
        >
          Start Game
        </Button>
      </MainPage>
    </main>
  );
}

export default App;
