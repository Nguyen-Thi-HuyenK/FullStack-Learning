import React, { useState } from 'react'

const Hello = (props) => {
  console.log(props)

  const bornYear = () => {
    const yearNow = newDate().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
      <p>You were probably born in {bornYear} </p>
    </div>
  )
}

const Display =(props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
} 


const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left+1)
    setTotal(total+1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right+1)
    setTotal(total+1)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join('')}</p>
      <p>Total clicks: {total}</p>
    </div>
  )
  
}

export default App