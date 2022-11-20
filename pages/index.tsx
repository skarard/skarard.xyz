import { useCallback, useEffect, useState } from "react";

// @ts-ignore no typing exists
import * as Easing from "easing";

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

  const otherIndex = () => {
    const otherIndex = wallpaperIndex + 1;
    return otherIndex === wallpapers.length ? 0 : otherIndex;
  };

  useEffect(() => {
    window.scroll(0, 1e6 / 2);
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    // return (() => window.removeEventListener("scroll", onScroll))();
    console.log("%cskarard.eth", "color: #FF0022; font-size: 25px");
    console.log(
      "%cJoin me on adventures in blockchain\nSocials:\n@skarard\nu/skarard\n@cryptodon.lol/@skarard",
      "font-size: 16px"
    );
  }, []);

  return (
    <div className="w-full h-[1e6px]">
      <div className="w-full h-screen flex flex-col justify-center fixed bg-slate-900 ">
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
                backgroundImage: `url(/img/${wallpapers[otherIndex()]}.png)`,
                backgroundPosition: `50% ${scrollY}px`,
                opacity: opacity,
              }}
            />
          </div>
        </div>
        <div className="absolute right-0 top-20 text-white rounded-l-lg bg-black py-2 pl-4 pr-6 text-xl select-none on">
          F12
        </div>
        <a rel="me" href="https://cryptodon.lol/@skarard"></a>
      </div>
    </div>
  );
}
