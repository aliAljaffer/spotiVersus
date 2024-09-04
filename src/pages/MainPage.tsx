import { ReactElement } from "react";

export default function MainPage({ children, className = "" }) {
  return (
    <div
      className={`${className} flex w-full flex-col gap-4 justify-center items-center h-screen`}
    >
      {children}
    </div>
  );
}
