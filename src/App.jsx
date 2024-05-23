

import React, { useState } from "react";
import "./App.css";
import { GoDotFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import ZoomButtons from "./components/ZoomBtns";
import Calendar from 'react-calendar';
import { FaCalendarPlus } from "react-icons/fa6";
import { FaCalendarMinus } from "react-icons/fa6";
import 'react-calendar/dist/Calendar.css';  // Import the CSS for the calendar

const App = () => {
  const [todo, setTodo] = useState("");
  const [todosArr, setTodosArr] = useState([]);
  const [searchTodo, setSearchTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const updateTodo = ({ target: { value } }) => {
    setSearchTodo("");
    setTodo(value);
  };

  const updateTodos = () => {
    if (todo) {
      const newTodo = { task: todo, status: false, date: selectedDate };
      setTodosArr([...todosArr, newTodo]);
      setTodo("");
    }
  };

  const toggleFinish = (index) => {
    const newTodosArr = todosArr.map((todo, i) =>
      i === index ? { ...todo, status: !todo.status } : todo
    );
    setTodosArr(newTodosArr);
  };

  const deleteTodo = (index) => {
    const newTodos = todosArr.filter((_, i) => i !== index);
    setTodosArr(newTodos);
  };

  const updateSearchTodo = ({ target: { value } }) => {
    setSearchTodo(value);
  };

  const clear = () => {
    setTodosArr([]);
  };

  const filterPending = () => {
    setFilter("pending");
  };

  const filterCompleted = () => {
    setFilter("completed");
  };

  const showAll = () => {
    setFilter("all");
  };

  const handleDateChange = (date) => {
    // console.log(date);
    setSelectedDate(date);
  };

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const filteredTodos = todosArr.filter((todo) => {
    if (filter === "pending") {
      return !todo.status;
    } else if (filter === "completed") {
      return todo.status;
    } else {
      return true;
    }
  });

  const dateFilteredTodos = filteredTodos.filter((todo) =>
    // console.log(new Date(todo.date).toDateString())
    new Date(todo.date).toDateString() === selectedDate.toDateString()
  );

  const searchedTodos = dateFilteredTodos.filter((todo) =>
    todo.task.toLowerCase().includes(searchTodo.toLowerCase())
  );

  return (
    <section>
      <ZoomButtons />
      <button onClick={toggleCalendarVisibility} className="toggle-calendar">
        {isCalendarVisible ? <FaCalendarMinus /> : <FaCalendarPlus />}
      </button>
      {isCalendarVisible && (
        <Calendar onChange={handleDateChange} />
      )}
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
          aria-label="Task input"
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
            aria-label="Search tasks"
          />
          <div className="sort">
            <button className="all" onClick={showAll}>All Tasks</button>
            <button className="pending" onClick={filterPending}>Pending Tasks</button>
            <button className="finished" onClick={filterCompleted}>Completed Tasks</button>
          </div>
        </div>

        <div className="show-todos">
          {searchedTodos.map((todo, index) => (
            <div
              className={`list ${todo.status ? "completed" : ""}`}
              key={index}
            >
              <GoDotFill />
              <h2>{todo.task}</h2>
              <FaCheck
                className="done"
                onClick={() => toggleFinish(index)}
                aria-label={`Mark task ${todo.status ? "incomplete" : "complete"}`}
              />
              <FaDeleteLeft
                className="delete"
                onClick={() => deleteTodo(index)}
                aria-label="Delete task"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default App;
