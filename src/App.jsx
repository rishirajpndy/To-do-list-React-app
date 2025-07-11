import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  const togglefinish = (e) => {
    setshowfinished(!showfinished)
  }
  


  useEffect(() => {
    const todostring = localStorage.getItem("todos")
    if (todostring) {
      const todos = JSON.parse(todostring)
      setTodos(todos)
    }
  }, [])


  const saveToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    const t = todos.find(i => i.id === id)
    setTodo(t.todo)

    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLocalStorage(newTodos)
  }


  const handleDelete = (e, id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this TO-DO?")
    if (!confirmDelete) return

    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLocalStorage(newTodos)
  }


  const handleAdd = () => {
    if (!todo.trim()) return

    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    setTodo("")
    saveToLocalStorage(newTodos)
  }


  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  const handleCheckbox = (e) => {
    const id = e.target.name
    const newTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodos(newTodos)
    saveToLocalStorage(newTodos)
  }

  return (
    <>
      <Navbar />

      <div className="mx-2  md:container md:mx-auto my-5 bg-purple-200 rounded-xl p-5  min-h-[80vh] md:w-[800px]">
        <div className="addtodo my-5 mx-1">
          <h2 className="text-3xl font-bold flex justify-center ">Taskready - Manage your all tasks at one place! </h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-white border-none w-full my-5 py-2 rounded-2xl "
            placeholder='Enter Your To-Do Work!'
          />
          <button
            onClick={handleAdd} disabled={todo.lenght<3}
            className="bg-purple-500 hover:bg-purple-950 disabled:bg-white disabled:text-black transition-all duration-400 ease-in-out text-white px-6 py-3 text-sm font-bold rounded-lg  w-full flex justify-center "
          >
            Save
          </button>
        </div>
        <div className='gap-5 my-5' >
        <input onChange={togglefinish} type="checkbox" checked={showfinished}  />Show Finished
        </div>
        <h2 className="text-lg font-bold">Your To-dos list</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No to-dos to display!</div>}

          {todos.map(item => (showfinished || !item.isCompleted) && (
            <div key={item.id} className="todo flex flex-col sm:flex-row my-5 w-full max-w-3xl justify-between items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
              <div className="flex gap-3 items-start flex-1 break-words">
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  className="mt-1"
                />
                <div className={`${item.isCompleted ? "line-through text-gray-600" : ""} break-all`}>
                  {item.todo}
                </div>
              </div>

              <div className="buttons flex gap-2">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="bg-purple-500 hover:bg-purple-950 transition-all duration-300 ease-in-out text-white px-4 py-1 text-sm font-bold rounded-lg"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="bg-purple-500 hover:bg-purple-950 transition-all duration-300 ease-in-out text-white px-5 py-2 text-sm font-bold rounded-lg "
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
