import { PropsWithChildren } from "react";

export default function MainPage({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full flex-col gap-4 justify-center items-center h-screen">
      {children}
    </div>
  );
}
