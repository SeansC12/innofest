import "./App.css";
import Artyom from "artyom.js";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

var x = 0;

const Friday = new Artyom();

const numbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function App() {
  const initialFloor = 1;
  const [floor, setFloor] = useState(initialFloor);
  const elevatorControls = useAnimationControls();

  useEffect(() => {
    console.log(floor);
    elevatorControls.start({
      translateY: floor * -100,
      transition: {
        type: "tween",
        duration: 2,
      },
    });
  }, [floor]);

  useEffect(() => {
    Friday.addCommands([
      {
        indexes: ["Go to level *"],
        smart: true,
        action: function (i, wildcard) {
          if (!(wildcard in numbers)) {
            Friday.say("I do not understand" + wildcard + ", please repeat");
          } else {
            setFloor(numbers[wildcard]);
            Friday.say("Going to level " + wildcard);
          }
        },
      },
    ]);
  }, []);

  function initialiseFriday() {
    Friday.initialize({
      lang: "en-GB",
      continuous: true,
      debug: false,
      listen: true,
      soundex: true,
      // name: "Friday",
    });
  }

  function initialiseFridayWithVoice() {
    Friday.initialize({
      lang: "en-GB",
      continuous: true,
      debug: false,
      listen: true,
      soundex: true,
      name: "Friday",
    });
  }

  function killFriday() {
    Friday.fatality();
  }

  return (
    <div>
      <div className="buttons">
        <div>
          <button onClick={initialiseFriday}>
            Start listening (without name)
          </button>
          <button onClick={initialiseFridayWithVoice}>
            Start listening (with name)
          </button>
          <button onClick={killFriday}>Kill</button>
        </div>
        {/* <div>Go to {floor}</div> */}
        {/* <button onClick={() => setFloor((curr) => curr + 1)}>+</button>
        <button onClick={() => setFloor((curr) => curr - 1)}>-</button>
        <button onClick={() => setFloor(numbers["three"])}> level 3</button> */}
      </div>
      <div className="elevatorWrapper">
        <div className="floorContainer">
          <div>
            Level <strong> 6</strong>
          </div>
          <div>
            Level <strong>5</strong>
          </div>
          <div>
            Level <strong>4</strong>
          </div>
          <div>
            Level <strong>3</strong>
          </div>
          <div>
            Level <strong>2</strong>
          </div>
          <div className="bottomCell">
            Level <strong>1</strong>
          </div>
        </div>

        <div className="elevatorTracks">
          <motion.div
            initial={{ x: -80 }}
            animate={elevatorControls}
            className="elevator"
          ></motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;
