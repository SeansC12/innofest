import React from "react";

function buttons({ levels }) {
  let buttonComponents = [];
  for (let i = 1; i < levels; i++) {
    buttonComponents.push(<button>{i}</button>);
  }
  return (
    <div>
      {buttonComponents.map((comp) => {
        return comp;
      })}
    </div>
  );
}

export default buttons;
