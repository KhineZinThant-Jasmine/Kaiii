import React from 'react' 

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.title}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p> 
        {props.p1} {props.p1Exer}
      </p>
      <p>
        {props.p2} {props.p2Exer}
      </p>
      <p>
        {props.p3} {props.p3Exer}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
      Total Exercise : {props.p1Exer + props.p2Exer + props.p3Exer}
      </p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course} />
      <Content 
        p1={part1} p1Exer={exercises1}
        p2={part2} p2Exer={exercises2}
        p3={part3} p3Exer={exercises3}
      />
      <Total 
        p1Exer={exercises1} p2Exer={exercises2} p3Exer={exercises3}
      />
    </div>
  )
}

export default App