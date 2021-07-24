import React, { useState } from 'react'

const Statistics = ({text , value}) => {
  return(
    <div>
      {text} {value}
    </div>
  )
}

const Button = ({handleClick , text}) => <button onClick = {handleClick}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  const total = (good + neutral + bad)

  if (total){

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button handleClick = {handleGoodClick} text = 'good'/>
        <Button handleClick = {handleNeutralClick} text = 'neutral'/>
        <Button handleClick = {handleBadClick} text = 'bad'/>
      </div>
      <h1>statistics</h1>
      <table>
        <tr>
          <td>
            <Statistics text = 'good' value = {good}/>
          </td>
        </tr>
        <tr>
          <td>
            <Statistics text = 'neutral' value = {neutral}/>
          </td>
        </tr>
        <tr>
          <td>
            <Statistics text = 'bad' value = {bad}/>
          </td>
        </tr>
        <tr>
          <td>
            <Statistics text = 'all' value = {total}/>
          </td>
        </tr>
        <tr>
          <td>
            <Statistics text = 'average' value = {(good - bad)/total}/>
          </td>
        </tr>
        <tr>
          <td>
            <Statistics text = 'positive' value = {(good / total) + '%'}/>
          </td>
        </tr>
      </table>
    </>
  )
  }
  else {
    return(
      <>
      <h1>give feedback</h1>
      <div>
        <Button handleClick = {handleGoodClick} text = 'good'/>
        <Button handleClick = {handleNeutralClick} text = 'neutral'/>
        <Button handleClick = {handleBadClick} text = 'bad'/>
      </div>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
}

export default App