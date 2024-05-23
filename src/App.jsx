import React, { useState } from "react";
import "./App.css";
import { GoDotFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import ZoomButtons from "./components/ZoomBtns";

const App = () => {
  let [todo, setTodo] = useState("");
  let [todosArr, setTodosArr] = useState([]);
  let [searchTodo, setSearchTodo] = useState("");
  let [filter, setFilter] = useState("all");

  function updateTodo({ target: { value } }) {
    setSearchTodo("");
    setTodo(value);
  }

  function updateTodos() {
    if (todo) {
      const newTodo = { task: todo, status: false };
      setTodosArr([...todosArr, newTodo]);
      setTodo("");
    }
  }

  function toggleFinish(index) {
    const newTodosArr = todosArr.map((todo, i) =>
      i === index ? { ...todo, status: !todo.status } : todo
    );  

    setTodosArr(newTodosArr);
  }

  
  function deleteTodo(index) {
    const newTodos = todosArr.filter((_, i) => i !== index);
    setTodosArr(newTodos);
  }

  function updateSearchTodo({ target: { value } }) {
    setSearchTodo(value);
  }

  function clear() {
    setTodosArr([]);
  }

  function filterPending() {
    setFilter("pending");
  }

  function filterCompleted() {
    setFilter("completed");
  }

  function showAll() {
    setFilter("all");
  }

  const filteredTodos = todosArr.filter((todo) => {
    if (filter === "pending") {
      return !todo.status;
    } else if (filter === "completed") {
      return todo.status;
    } else {
      return true;
    }
  });

  console.log(todosArr);

  const searchedTodos = filteredTodos.filter((todo) =>
    todo.task.toLowerCase().includes(searchTodo.toLowerCase())
  );

  return (
    <section>
      <ZoomButtons/>
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
        <button onClick={updateTodos} className="add">Add Task</button>
        <button onClick={clear} className="clear">Clear All</button>
        <h3>Tasks count: {searchedTodos.length}</h3>
      </div>

      <div className="task-container">
        <div className="search-todo">
          <input
            type="text"
            placeholder="... Search for task ..."
            onChange={updateSearchTodo}
            value={searchTodo}
          />
          <div className="sort">
            <button className="all" onClick={showAll}>All Tasks</button>
            <button className="pending" onClick={filterPending}>Pending Tasks</button>
            <button className="finished" onClick={filterCompleted}>Completed Tasks</button>
          </div>
        </div>

        <div className="show-todos">
          {searchedTodos.map((todo, index) => {
            return (
              <div
                className={`list ${todo.status ? "completed" : ""}`}
                key={index}
              >
                <GoDotFill />
                <h2>{todo.task}</h2>
                <FaCheck
                  className="done"
                  onClick={() => toggleFinish(index)}
                />
                <FaDeleteLeft
                  className="delete"
                  onClick={() => deleteTodo(index)}
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
