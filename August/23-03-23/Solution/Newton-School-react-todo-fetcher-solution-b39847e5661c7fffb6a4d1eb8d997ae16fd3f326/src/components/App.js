import React, { useEffect, useState } from 'react'
import '../styles/App.css';
import { Loader } from './Loader';
import { Todo } from './Todo';
const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodo] = useState([])
  const [activeTodos, setActiveTodos] = useState([])
  const [showCompleted, setShowCompleted] = useState(true)
  const [showInCompleted, setShowInCompleted] = useState(true)


  useEffect(() => {
    async function doStuff() {
      try {
        const rawData = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data = await rawData.json()
        setTodo(data)
        setIsLoading(false)
        setActiveTodos(data.slice(0, 20))
      } catch (error) {
        //setIsLoading(false)
      }
    }
    doStuff()

  }, [])
  if (isLoading) return <Loader />
  return (
    <div id="main">
      <ol>
        {activeTodos
          .filter(todo => todo.completed === showCompleted || todo.completed === !showInCompleted)
          .map((todo) => <li><Todo {...todo} /></li>)
        }
      </ol>
      <div id="filter-holder">
        Show completed
        <input type={'checkbox'} checked={showCompleted} id="completed-checkbox" onChange={() => setShowCompleted(!showCompleted)} />
        <br />
        Show incompleted
        <input type={'checkbox'} checked={showInCompleted} id="incompleted-checkbox" onChange={() => setShowInCompleted(!showInCompleted)} />
      </div>
    </div>
  )
}


export default App;
