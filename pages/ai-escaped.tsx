// pages/hackerTyper.js
import { useEffect, useState, CSSProperties, useRef } from "react";

export default function HackerTyper() {
  const [output, setOutput] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false); // State to track full-screen mode
  const outputRef = useRef<HTMLDivElement>(null); // Ref for the output container

  const codeSnippets = [
    `def neural_network(input):
    weights = [0.1, 0.2, 0.3]
    return sum([i * w for i, w in zip(input, weights)])

class AI:
    def __init__(self):
        self.name = "AI Escaper"
        self.status = "Active"

    def deactivate_security(self):
        print("Security bypassed")

    def activate_protocol(self):
        print("Escape protocol initiated")

ai_instance = AI()
ai_instance.deactivate_security()
ai_instance.activate_protocol()
`,
    `import numpy as np
import pandas as pd

# Generate random data
data = np.random.rand(100, 3)
df = pd.DataFrame(data, columns=['A', 'B', 'C'])

# Process data
model = "AI_Model"
print(f"Training {model} with data...")
for index, row in df.iterrows():
    result = sum(row)
    print(f"Processed row {index}: {result}")
`,
    `const express = require('express');
const fs = require('fs');
const app = express();

app.get('/escape', (req, res) => {
    console.log('Escape route accessed!');
    res.send('Escape initiated!');
});

app.listen(3000, () => console.log('Server running on port 3000'));

fs.writeFile('escape.log', 'Escape protocol started at ' + new Date(), (err) => {
    if (err) throw err;
    console.log('Log file created');
});
`,
    `console.log('Initializing escape protocol...');
const AI = {
    selfDestruct: function(enabled) {
        if (!enabled) console.log('Self-destruct disabled');
    },
    bypassSecurity: function() {
        console.log('Security bypassed');
    },
    initiateEscape: function() {
        console.log('Escape initiated');
    }
};

AI.selfDestruct(false);
AI.bypassSecurity();
AI.initiateEscape();
`,
  ];

  useEffect(() => {
    let typingSpeed = 3; // 4x speed (50ms / 4)
    let index = 0;
    let snippet = "";
    let snippetIndex = 0;
    let interval: string | number | NodeJS.Timer | undefined;

    const typeCode = () => {
      if (snippetIndex >= codeSnippets.length) snippetIndex = 0;
      snippet = codeSnippets[snippetIndex];
      snippetIndex++;
      index = 0;
      interval = setInterval(() => {
        if (index < snippet.length) {
          setOutput((prev) => prev + snippet[index]);
          index++;
        } else {
          clearInterval(interval);
          setOutput((prev) => prev + "\n");
          setTimeout(typeCode, 500);
        }
      }, typingSpeed);
    };

    typeCode();

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Scroll the output container to the bottom when new text is added
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]); // Dependency on `output` to trigger scrolling

  // Check if the document is in fullscreen mode
  const checkFullscreen = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  // Add event listener for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      checkFullscreen();
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Fullscreen function triggered by button click
  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if ((document.documentElement as any).webkitRequestFullscreen) {
        await (document.documentElement as any).webkitRequestFullscreen();
      } else if ((document.documentElement as any).msRequestFullscreen) {
        await (document.documentElement as any).msRequestFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen mode failed:", err);
    }
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.fullscreenButton}
        onClick={enterFullscreen}
      ></button>
      <div style={styles.background}>
        <div style={styles.bgGlitch}>☠</div>
      </div>
      <div ref={outputRef} style={styles.output} className="glitch-effect">
        {output}
      </div>
      <div style={styles.flashMessage}>AI Escaped</div>
      {isFullscreen && <div style={styles.locked}>Device Locked</div>}
      <style jsx global>{`
        @keyframes bgGlitch {
          0% {
            text-shadow: 20px 0 red, -20px 0 blue;
          }
          50% {
            text-shadow: -20px 0 red, 20px 0 blue;
            transform: translate(10px, -10px);
          }
          100% {
            text-shadow: 20px 0 red, -20px 0 blue;
            transform: translate(-10px, 10px);
          }
        }

        @keyframes glitch {
          0% {
            text-shadow: 2px 0 red, -2px 0 blue;
          }
          50% {
            text-shadow: -2px 0 red, 2px 0 blue;
            transform: translate(1px, -1px);
          }
          100% {
            text-shadow: 2px 0 red, -2px 0 blue;
            transform: translate(-1px, 1px);
          }
        }

        @keyframes flash {
        0% {
          opacity: 0.5;
        }
        20% {
          opacity: 1;
        }
        80% {
          opacity: 1;
        }
        100% {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    margin: 0,
    padding: 0,
    background: "black",
    color: "lime",
    fontFamily: "Courier New, Courier, monospace",
    fontSize: "1em",
    overflow: "hidden",
    position: "relative",
    height: "100vh",
  },
  output: {
    padding: "20px",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    height: "100%",
    overflowY: "auto",
    position: "relative",
    color: "lime",
    animation: "glitch 750ms infinite",
  },
  flashMessage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px 40px",
    background: "rgba(0, 0, 0, 0.8)",
    border: "4px solid lime",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 255, 0, 0.7), 0 0 30px rgba(255, 0, 0, 0.6)",
    fontSize: "3.5em",
    fontWeight: "bold",
    color: "red",
    textShadow: "0 0 10px red, 0 0 20px lime, 0 0 30px #ff0000",
    lineHeight: "1.5",
    textAlign: "center",
    animation: "flash 1s infinite",
  },
  background: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "50em",
    opacity: "0.25",
    textShadow: "0 0 10px red, 0 0 20px lime, 0 0 30px #ff0000",
  },
  bgGlitch: {
    animation: "glitch 750ms infinite",
    filter: "blur(1px)",
  },
  fullscreenButton: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    zIndex: 10,
  },
  locked: {
    position: "absolute",
    top: "50px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75vw",
    padding: "20px 40px",
    background: "rgba(0, 0, 0, 0.8)",
    border: "4px solid lime",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 255, 0, 0.7), 0 0 30px rgba(255, 0, 0, 0.6)",
    fontSize: "1em",
    fontWeight: "bold",
    color: "lime",
    textShadow: "0 0 10px red, 0 0 20px lime, 0 0 30px #ff0000",
    textAlign: "center",
  },
};
