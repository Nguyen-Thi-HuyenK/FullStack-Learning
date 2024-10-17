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


const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Leo' age={3+4}/>
      <Hello name='Lilian' age ='4'/>
      <Hello name={name} age={age}/>
    </div>
  )
}

export default App