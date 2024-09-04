// import React, { useState, useEffect, useCallback } from "react";
import "./index.css";
import MainPage from "./pages/MainPage";
import Button from "./components/Button";
// const artistBaseUrl = "";

function App() {
  return (
    <main className="text-stone-800 bg-stone-100 h-[100dvh] relative flex justify-center items-center">
      <MainPage className="w-60">
        <h1 className="text-stone-800 font-bold text-4xl tracking-widest p-2">
          spotiVersus
        </h1>
        <p className="text-stone-500 w-96 text-center text-wrap font-bold text-xl tracking-widest p-2">
          Which artist has more monthly listeners on Spotify?
        </p>
        <Button
          className="text-lg flex bg-stone-600 text-stone-200 uppercase tracking-widest items-center justify-center space-x-2 border-b-2 border-r-2 border-transparent transition-all duration-300 hover:border-stone-300 py-3 px-4 w-64"
          to="/start"
        >
          Start Game
        </Button>
      </MainPage>
      <footer className="text-stone-800 font-normal tracking-widest absolute right-5 bottom-2 mt-auto">
        Ali Aljaffer &copy; {new Date().getFullYear()}
      </footer>
    </main>
  );
}

export default App;
