import Button from "./Button";
import MainPage from "../pages/MainPage";
type ErrorProps = {
  reason: string;
};
export default function Error({ reason }: ErrorProps) {
  return (
    <main className="text-stone-800 bg-stone-100 h-[100dvh] flex justify-center items-center">
      <MainPage>
        <div className="gap-6 flex items-center justify-center flex-col w-64">
          <p className="w-full text-center text-xl text-stone-600 font-semibold">
            An Error Occured: {reason}
          </p>
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
