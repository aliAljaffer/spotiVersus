import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Game from "./pages/Game.tsx";
import EndScreen from "./pages/EndScreen.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Error from "./components/Error.tsx";
import WinScreen from "./pages/WinScreen.tsx";

const minToMs = (number: number) => number * 1000 * 60;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: minToMs(15),
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    index: true,
    errorElement: <Error reason="idk" />,
  },
  {
    path: "start",
    element: <Game />,
    errorElement: <Error reason="Game" />,
  },
  {
    path: "endscreen",
    element: <EndScreen />,
    errorElement: <Error reason="End" />,
  },
  {
    path: "winscreen",
    element: <WinScreen />,
    errorElement: <Error reason="Win" />,
  },
  {
    path: "*",
    element: <Error reason="404" />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
