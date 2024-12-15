import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);

  // Add Todo
  const addTodo = async () => {
    if (!todo.trim()) {
      alert("Please enter a todo!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/add", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: todo }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Todo added:", result);

      // Refresh todos after adding
      getTodo();
      setTodo(""); // Clear input
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Fetch Todos
  const getTodo = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/get");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const todos = await response.json();
      console.log("Fetched Todos:", todos);

      // Update state with fetched todos
      setData(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/delete", {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Todo deleted:", result);

      // Refresh todos after deleting
      getTodo();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="bg-slate-700 h-screen w-screen flex flex-col gap-5 items-center justify-center">
      <p className="text-white text-lg font-bold">Dhanraj Pimple Todo App</p>
      <div className="flex gap-2">
        <input
          className="rounded-lg h-10 w-72 pl-3"
          placeholder="Enter Todos"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="bg-red-300 h-10 rounded-lg px-5 flex text-center items-center justify-center font-bold"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <div className="mt-5 w-96">
        {data.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-white rounded-lg p-3 mb-2 shadow-md"
          >
            <p>{item.title}</p>
            <button
              className="text-red-500 font-bold"
              onClick={() => deleteTodo(item._id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
