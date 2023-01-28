import { useCallback, useEffect, useState } from "react";

// @ts-ignore no typing exists
import * as Easing from "easing";
import Console from "../src/Console";

const wallpapers = [
  "7cbbcdc6-4972-423e-9197-24ca6b2d3047",
  "8d7af881-0238-474f-9261-b5571e8f41fe",
  "9acd3b49-f562-4eac-82dd-b5f3e838655f",
  "34c5b31a-da43-4ee4-8525-855953d6f59d",
];

const easingValues = Easing(100, "quintic");

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [wallpaperIndex, setWallpaperIndex] = useState(0);

  useEffect(() => {
    // Scroll halfway down a massive page, to enable scrolling up or down
    window.scroll(0, 1e6 / 2);
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    // return (() => window.removeEventListener("scroll", onScroll))();
  }, []);

  const onScroll = useCallback(() => {
    const { scrollY } = window;
    const smoothed = scrollY / 3;

    setScrollY(smoothed % 1664);
    setWallpaperIndex(Math.floor(smoothed / 1664) % wallpapers.length);

    const opacityIndex = Math.round(
      easingValues.length * ((smoothed % 1664) / 1664)
    );
    const opacityValue = easingValues[opacityIndex];
    setOpacity(opacityValue);
  }, []);

  const nextIndex = () => {
    const nextIndex = wallpaperIndex + 1;
    return nextIndex === wallpapers.length ? 0 : nextIndex;
  };

  return (
    <>
      <div className="w-full h-[1e6px]">
        <div className="w-full h-screen flex flex-col justify-center fixed bg-slate-800 ">
          <div className="px-[10%] h-full w-full">
            <div className="w-full h-full relative">
              <div
                className="h-full w-full absolute top-0 left-0"
                style={{
                  WebkitMaskImage: "url(/img/sig.png)",
                  WebkitMaskRepeat: "repeat-y",
                  WebkitMaskSize: "contain",
                  WebkitMaskPosition: "50% 50%",
                  backgroundImage: `url(/img/${wallpapers[wallpaperIndex]}.png)`,
                  backgroundPosition: `50% ${scrollY}px`,
                }}
              />
              <div
                className="h-full w-full absolute top-0 left-0"
                style={{
                  WebkitMaskImage: "url(/img/sig.png)",
                  WebkitMaskRepeat: "repeat-y",
                  WebkitMaskSize: "contain",
                  WebkitMaskPosition: "50% 50%",
                  backgroundImage: `url(/img/${wallpapers[nextIndex()]}.png)`,
                  backgroundPosition: `50% ${scrollY}px`,
                  opacity: opacity,
                }}
              />
            </div>
          </div>
          <div className="group absolute top-20 right-0 h-12 text-slate-400 rounded-l-lg bg-slate-700 bg-opacity-75 text-xl select-none py-2 pl-4 pr-6 w-16 hover:w-[330px] duration-300 delay-500 hover:delay-75 overflow-hidden">
            <div className="relative h-12 w-8 group-hover:w-[330px] transition-size duration-300 delay-500 group-hover:delay-75 overflow-hidden">
              <div className="absolute top-0 left-[-50px] h-12 whitespace-nowrap group-hover:left-[0px] transition-size duration-300 delay-500 group-hover:delay-75 ">
                Press F12 to open the console log
              </div>
            </div>
          </div>
        </div>
      </div>
      <Console />
      <a rel="me" href="https://cryptodon.lol/@skarard" />
    </>
  );
}
