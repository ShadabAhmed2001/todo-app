import React, { useState } from "react";
import "./App.css";
import { GoDotFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

const App = () => {
  let [todo, setTodo] = useState("");
  let [todosArr, setTodosArr] = useState([]);
  let [searchTodo, setSearchTodo] = useState("");
  let [completedTodos, setCompletedTodos] = useState([]);

  function updateTodo({ target: { value } }) {
    setTodo(value);
  }

  function updateTodos() {
    if (todo) {
      setTodosArr([...todosArr, todo]);
      setTodo("");
    }
  }

  function completedTodo(index) {
    const newCompletedTodos = [...completedTodos];
    if (!newCompletedTodos.includes(index)) {
      newCompletedTodos.push(index);
    } else {
      const undo = newCompletedTodos.indexOf(index);
      newCompletedTodos.splice(undo, 1);
    }
    setCompletedTodos(newCompletedTodos);
  }

  function deleteTodo(index) {
    const newTodos = todosArr.filter((_, i) => i !== index);
    setTodosArr(newTodos);
    setCompletedTodos([]);
  }

  function updateSearchTodo({ target: { value } }) {
    setSearchTodo(value);
  }

  function clear() {
    setTodosArr([]);
    setCompletedTodos([]);
  }

  const filteredTodos = todosArr.filter((ele) =>
    ele.toLowerCase().includes(searchTodo.toLowerCase())
  );

  console.log(completedTodos);

  return (
    <section>
      <h1>
        <span>~</span> To-Do Application <span>~</span>
      </h1>
      <div className="getinput">
        <input
          type="text"
          placeholder="Enter Your Tasks..."
          onChange={updateTodo}
          value={todo}
          autoFocus
        />
        <button onClick={updateTodos}>Add Task</button>
        <h3>Tasks count: {filteredTodos.length}</h3>
      </div>

      <div className="task-container">
        <div className="search-todo">
          <input
            type="text"
            placeholder="... Search for task ..."
            onChange={updateSearchTodo}
            value={searchTodo}
          />
          <button onClick={clear}>Clear</button>
        </div>

        <div className="show-todos">
          {filteredTodos.map((ele, index) => {
            const isCompleted = completedTodos.includes(index);
            return (
              <div
                className={`list ${isCompleted ? "completed" : ""}`}
                key={index}
              >
                <GoDotFill />
                <h2>{ele}</h2>
                <FaCheck
                  className="done"
                  onClick={() => {
                    completedTodo(index);
                  }}
                />
                <FaDeleteLeft
                  className="delete"
                  onClick={() => {
                    deleteTodo(index);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default App;
