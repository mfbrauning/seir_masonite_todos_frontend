// import components
import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost"
import Form from "./pages/Form"

// import hooks from react
import { useState, useEffect } from "react"

// import router component
import { Route, Routes, Link, useNavigate } from "react-router-dom"

function App() {
  const navigate = useNavigate()

  ////////////////////
  // Style Objects
  ////////////////////

  const h1 = {
    textAlign: "center",
    margin: "10px"
  }

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto"
  }
  ///////////////////////////
  // State & Other Variables
  ///////////////////////////

  // Our API URL
  const url = "https://fb-seir-masonite-todos-backend.herokuapp.com/todos/"

  // State to Hold The List of Posts
  const [posts, setPosts] = useState([])

  // object representing null to do
  const nullTodo = {
    subject: "",
    details: ""
  }

  // state to hold to do to edit
  const [targetTodo, setTargetTodo] = useState(nullTodo)

  //////////////
  // Functions
  //////////////

  // Function to get list of Todos from API
  const getTodos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  // add to do from form data
  const addTodos = async (newTodo) => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
    getTodos()
  }

  // function to select to do to edit
  const getTargetTodo = (todo) => {
    setTargetTodo(todo)
    navigate("/edit")
  }

  // function to edit to do on form submission
  const updateTodo = async (todo) => {
    await fetch(url + todo.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
    getTodos()
  }

  // delete function
  const deleteTodo = async (todo) => {
    await fetch(url + todo.id + "/", {
      method: "delete"
    })
    getTodos()
    navigate("/")
  }
  //////////////
  // useEffects
  //////////////

  useEffect(() => {
    getTodos()
  }, [])
  /////////////////////
  // returned JSX
  /////////////////////

  return (
    <div className="App">
      <h1 style={h1}>My Todo List</h1>
      <Link to="/new">
        <button style={button}>Create New To-Do</button>
      </Link>
      <Routes>
        <Route path="/" element={<AllPosts posts={posts}/>}/>
        <Route path="/post/:id" element={<SinglePost posts={posts} edit={getTargetTodo} deleteTodo={deleteTodo}/>}/>
        <Route path="/new" element={<Form initialTodo={nullTodo} handleSubmit={addTodos} buttonLabel="Create To-Do"/>}/>
        <Route path="/edit" element={<Form initialTodo={targetTodo} handleSubmit={updateTodo} buttonLabel="Update To-Do"/>}/>
      </Routes>
    </div>
  );
}

export default App
