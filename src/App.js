import "./App.css";
import Artyom from "artyom.js";
import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

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
  const [floor, setFloor] = useState(0);
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

  function updateState() {
    setFloor(2);
    Friday.say("Going to level");
  }

  // Friday.addCommands([
  //   {
  //     indexes: ["Go to level *"],
  //     smart: true,
  //     action: (i, wildcard) => {
  //       console.log("why state no updating");
  //       updateState();
  //       Friday.say("Going to level" + wildcard);
  //     },
  //   },
  // ]);

  Friday.on(["Go to level *"], true).then((i, wildcard) => {
    Friday.say("Going to level" + wildcard);
    setFloor(numbers[wildcard]);
  });

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

  // Friday.redirectRecognizedTextOutput((text, isFinal) => {
  //   if (isFinal) {
  //     console.log(text);
  //   }
  // });

  function killFriday() {
    Friday.fatality();
  }

  return (
    <div>
      <div className="buttons">
        <div>
          <button onClick={initialiseFriday}>Start listening</button>
          <button onClick={killFriday}>Kill</button>
        </div>
        <div>Go to {floor}</div>
        <button onClick={() => setFloor(4)}>+</button>
        <button onClick={() => setFloor((curr) => curr - 1)}>-</button>
      </div>
      <div className="elevatorWrapper">
        <div className="floorContainer">
          <div>7</div>
          <div>6</div>
          <div>5</div>
          <div>4</div>
          <div>3</div>
          <div>2</div>
          <div>1</div>
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
