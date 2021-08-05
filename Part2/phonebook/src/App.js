import React , {useEffect, useState} from 'react'
import axios from 'axios'
import personService from './services/persons'


const Filter =({searchValue, handleSearchValueChange}) => {
  return <input value={searchValue} onChange={handleSearchValueChange}/>
}


const Person = ({persons , deleteHandler}) => {
  const del = (person) => {
    if(window.confirm("Are you sure you want to delete?")){
      deleteHandler(person)
    }
  }
  
  return persons.map((person,key) =>(
    <div key={key}>
      {person.name} {person.number}
      <button onClick={ () => del(person)}>delete</button>
    </div>
  ))
}


const PersonForm =({newName,handleNameChange,newNumber,handleNumberChange,handleSubmit}) => {
  return (
    <form>
        <div>
          name: <input value={newName} onChange = {handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick = {handleSubmit}>add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] =useState('')


  useEffect( () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])


  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleSearchValueChange =(event) => {
    event.preventDefault()
    setSearchValue(event.target.value)
  }

  const handleUpdate = (id, person) => {
    if (window.confirm(`${person.name} is already in phonebook. Do you want to replace with a new number?`)) {
      personService
      .update(id, person).then(() =>
      personService
        .getAll().then((response) => {
          setPersons(response)
          window.alert(`${newName} has been updated with a new number!!!`)
        })
      )
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const existedName = persons.find( (person) => person.name === newName)

    existedName 
    ? handleUpdate(existedName.id,personObject)
    : personService
        .create(personObject)
          .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
          setNewName("")
          setNewNumber("")
  }

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue)
  );

  const deleteHandler = (person) => {
    personService
      .deletePerson(person.id)
        .then(() => personService.getAll().then((response) => {
          setPersons(response)
          window.alert("Contact deleted!!!")
          console.log(persons)
      })
    )
      .catch(err => {
        console.log(err)
      })
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <Filter searchValue={searchValue} handleSearchValueChange={handleSearchValueChange} />
      </div>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      {persons?(<Person persons={filteredPerson} deleteHandler={deleteHandler}/>):(<div>loading...</div>)}
      
    </div>
  )
}

export default App; 
