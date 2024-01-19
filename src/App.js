import "./App.css";
import Header from "./MyComponents/Header";
import Todos from "./MyComponents/Todos.js";
import Footer from "./MyComponents/Footer";
import React, { useState, useEffect } from "react";
import AddTodo from "./MyComponents/AddTodo";
import About from "./MyComponents/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    // console.log("I am ondelete of todo",todo);
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    // localStorage.getItem("todos");

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log("i am adding", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  // {
  //   sno: 1,
  //   title: "market",
  //   desc: "go to market",
  // },
  // {
  //   sno: 2,
  //   title: "mall",
  //   desc: "go to mall",
  // },
  // {
  //   sno: 3,
  //   title: "zoo",
  //   desc: "go to zoo",
  // },

  return (
    <>
      <Router>
        <Header title="mytodoslist" searchBar={false} />
        <Routes>
          <Route exact path="/" element={
                <><AddTodo addTodo={addTodo}></AddTodo>
                  <Todos todos={todos} onDelete={onDelete} />
                </>}
          ></Route>
          <Route exact path="/about" element={<About />}>
          </Route>
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
