import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import MainPage from "./MainPage";

export default function WinScreen() {
  const [params] = useSearchParams();
  const score = params.get("score");

  return (
    <main className="text-stone-800 bg-stone-100 h-[100dvh] flex justify-center items-center">
      <MainPage>
        <h1 className="text-stone-800 font-bold text-4xl text-wrap tracking-widest p-2  text-center uppercase">
          You Won!
        </h1>
        <p className="text-stone-500 w-96 text-center text-wrap font-bold text-xl tracking-widest p-2">
          We ran out of artists to show you...
          <br />
          <br /> You scored: <span>{score}</span>
        </p>
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
