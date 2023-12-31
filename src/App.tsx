/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./style.css";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    setTodos((currentTodos) => {
      return [...currentTodos, { id: Math.random().toString(), title: newItem, completed: false }];
    });

    setNewItem("");
  }

  function toggleTodo(id: string, completed: boolean) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id: string) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <div id="card">
        <div id="card-content">
          <div id="card-title">
            <h2>Todo List</h2>
            <div className="underline-title"></div>
          </div>
          <form onSubmit={handleSubmit} className="new-item-form" action="">
            <div className="form-row">
              <label htmlFor="item">New Item</label>
              <input value={newItem} onChange={(e) => setNewItem(e.target.value)} type="text" id="item" />
            </div>
            <button className="btn">Add</button>
          </form>
          <h1 className="header">Todo list</h1>
          <ul className="list">
            {todos.length === 0 && "Nothing to do"}
            {todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <label>
                    <input type="checkbox" checked={todo.completed} onChange={(e) => toggleTodo(todo.id, e.target.checked)} />
                    {todo.title}
                  </label>
                  <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
