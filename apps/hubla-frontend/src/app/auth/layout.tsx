import { ReactNode } from "react";
import { ThemeButton } from "../../components/theme-button";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-auto min-h-screen w-full items-center justify-center overflow-auto bg-primary">
      <video
        src="https://framerusercontent.com/assets/S2WlYxoEYDzgvrReuw6DhNpJAmI.mp4"
        loop
        preload="auto"
        muted
        autoPlay
        className="absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex h-auto min-h-screen flex-1 flex-col items-center justify-center overflow-y-auto p-0 lg:p-8 xl:p-16">
        <div className="relative flex w-full flex-1 flex-col items-center justify-center overflow-x-hidden bg-white/70 p-8 backdrop-blur-sm dark:bg-neutral-800/70 lg:rounded-3xl">
          <div className=" min-h-full w-full overflow-auto p-2 lg:p-4">
            {children}
          </div>
          <div className="absolute right-3 top-3">
            <ThemeButton />
          </div>
        </div>
      </div>

      <div className="z-20 hidden h-auto min-h-screen flex-1 items-center justify-center transition-all lg:flex" />
    </div>
  );
};

export default AuthLayout;
