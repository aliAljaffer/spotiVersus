import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Game from "./pages/Game.tsx";
import EndScreen from "./pages/EndScreen.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    index: true,
  },
  {
    path: "start",
    element: <Game />,
  },
  {
    path: "endscreen",
    element: <EndScreen />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
