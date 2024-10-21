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

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
} 

const Histoty =(props) => {
  console.log('props values are', props)
  if (props.allClicks.length === 0) {
    return (
      <div>
        The app is used by clicking the buttons
      </div>
    )
  }
  return (
    <div>
      <p>Button press history: {props.allClicks.join(' ')}</p>
      <p>Total clicks {props.total}</p>
    </div>
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
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <Histoty allClicks={allClicks} total={total}/>
    </div>
  )
  
}

export default App