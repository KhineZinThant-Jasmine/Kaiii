import React from 'react'

const Course = ({course}) => {
    return (
      <div key = {course.id}>
        <Header header={course.name} />
        <Content content={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
const Header = ({ header }) => {
    return (
      <h1>{header}</h1>
    )
}
  
const Total = ({ parts }) => {
    const exer = parts.map((part) => part.exercises)
    let sum = exer.reduce(function(a , b) {return a + b},0)
    return(
      <p>Total of {sum} exercises</p>
    ) 
}
  
const Part = ({name , exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>    
    )
}
  
const Content = ({ content }) => {
    return (
      <div>
        {content.map((part) => ( <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>))}
      </div>
    )
}
  

export default Course