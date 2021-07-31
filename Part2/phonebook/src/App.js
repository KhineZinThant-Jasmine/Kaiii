import React , {useState} from 'react'

const Person = ({persons}) => {
  return persons.map((person,key) =>(
    <div key={key}>
      {person.name} {person.number}
    </div>
  ))
}

const Filter =({searchValue, handleSearchValueChange}) => {
  return <input value={searchValue} onChange={handleSearchValueChange}/>
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
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456' },
                                          { name: 'Ada Lovelace', number: '39-44-5323523' },
                                          { name: 'Dan Abramov', number: '12-43-234345' },
                                          { name: 'Mary Poppendieck', number: '39-23-6423122' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] =useState('')

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

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const existedName = persons.find( (person) => person.name === newName)

    existedName 
    ? alert(`${newName} is already added to phonebook`)
    : setPersons(persons.concat(personObject))
    setNewName("")
    setNewNumber("")
  }

  const filteredPerson = persons.filter((person) => person.name.toLowerCase().includes(searchValue))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <Filter searchValue={searchValue} handleSearchValueChange={handleSearchValueChange} />
      </div>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Person persons={filteredPerson}/>
    </div>
  )
}

export default App; 
