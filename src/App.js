import "./App.css";
import Artyom from "artyom.js";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "./components/ButtonPanel"

const Friday = new Artyom();

function App() {
  const [floor, setFloor] = useState(0);
  const textRef = useRef();

  useEffect(() => {
    console.log(floor);
  }, [floor]);

  Friday.addCommands([
    {
      indexes: ["Go to floor *"],
      smart: true,
      action: (i, wildcard) => {
        console.log(wildcard);
        setFloor(wildcard);
        Friday.say("Going to floor" + wildcard);
      },
    },
    {
      indexes: ["Hello"],
      action: (i) => {
        Friday.say("Hi, how is it going");
      },
    },
  ]);

  function initialiseFriday() {
    Friday.initialize({
      lang: "en-GB",
      continuous: true,
      debug: true,
      listen: true,
      soundex: true,
      // name: "Friday",
    });
  }

  Friday.redirectRecognizedTextOutput((text, isFinal) => {
    if (isFinal) {
      console.log(text);
    }
  });

  function killFriday() {
    Friday.fatality();
  }

  const elevatorAnimation = {
    y: -20,
    transition: {
      type: "tween",
    },
  };

  return (
    <div>
      <div className="buttons">
        <div>
          <button onClick={initialiseFriday}>Start listening</button>
          <button onClick={killFriday}>Kill</button>
        </div>
        <div ref={textRef}>Go to {floor}</div>
      </div>
      <div className="elevatorWrapper">
        <div className="elevatorTracks">
          <motion.div
            // initial={{ x: 0, y: 0 }}
            animate={elevatorAnimation}
            className="elevator"
          ></motion.div>
        </div>
      </div>
        <Button levels={9}/>
    </div>
  );
}

export default App;
