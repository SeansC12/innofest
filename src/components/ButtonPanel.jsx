import React from 'react'


const Button = ({ levels }) => {
  let numbers = []
  for (let i = 1; i < levels + 1; i++) {
      numbers.push(<button className="elevatorBtn">
      {i}
    </button>)
  }
  return (
    <div className="elevatorGrid">
      {numbers.map((comp) => {
        return comp;
      })}
    </div>
  )

}


export default Button