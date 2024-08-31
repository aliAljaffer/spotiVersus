import Button from "../components/Button";
import { useGameState } from "../contexts/useGameState";
import MainPage from "./MainPage";

export default function EndScreen() {
  const { gameState } = useGameState();
  const { score, previousScore } = gameState;
  return (
    <main className="text-stone-800 bg-stone-100 h-[100dvh] flex justify-center items-center">
      <MainPage>
        <h1 className="text-stone-800 font-bold text-4xl tracking-widest p-2">
          You lost!
        </h1>
        <p className="text-stone-500 w-64 text-center text-wrap font-bold text-xl tracking-widest p-2">
          You scored {score.toString()}
          {previousScore !== 0 && (
            <>
              <br />
              `Your previous score was: ${previousScore}`
            </>
          )}
        </p>
        <Button
          className="flex bg-stone-600 text-stone-200 uppercase tracking-widest items-center justify-center space-x-2 border-b-2 border-r-2 border-transparent transition-all duration-300 hover:border-stone-300 py-3 px-4"
          to="/start"
        >
          Restart?
        </Button>
      </MainPage>
    </main>
  );
}
