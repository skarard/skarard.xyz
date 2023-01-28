import { useEffect, useRef, useState } from "react";

const Console = (props: any) => {
  const mountRef = useRef(false);

  // On Mount
  useEffect(() => {
    // Prevent useEffect running twice
    if (mountRef.current) return;
    mountRef.current = true;

    // Select colour scheme based on browser
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    const titleColor = theme === "dark" ? "#083f78" : "#24283b";

    // Title
    console.log("%cskarard.eth", `color: ${titleColor}; font-size: 40px;`);

    // Socials
    console.log(
      "%cJoin me in adventures on blockchain\n\nhttps://twitter.com/@skarard\nhttps://reddit.com/u/skarard\nhttps://cryptodon.lol/@skarard",
      "font-size: 14px"
    );
  }, [mountRef]);
  return <></>;
};

export default Console;
