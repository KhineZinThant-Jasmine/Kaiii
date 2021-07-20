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
      <Part part={props.p1} exercise={props.p1Exer}/>
      <Part part={props.p2} exercise={props.p2Exer}/>
      <Part part={props.p3} exercise={props.p3Exer}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
      Total Exercise  {props.p1Exer + props.p2Exer + props.p3Exer}
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