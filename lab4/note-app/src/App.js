import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]); // [todos, setTodos] = useState([]) is a hook
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] =
    useState(false);
  const [editingTodo, setEditingTodo] =
    useState(null);

  const getTodos = () => {
    fetch("http://localhost:3030/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  const onAddTodo = () => {
    const newTodo = {
      content,
      completed: false,
    };

    fetch("http://localhost:3030/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
      });
  };

  const onDeleteTodo = (id) => {
    fetch(`http://localhost:3030/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const newTodos = todos.filter(
          (todo) => todo.id !== id
        );
        setTodos(newTodos);
      });
  };

  const onEditTodo = (id) => {
    const todo = todos.find(
      (todo) => todo.id === id
    );
    setEditingTodo({
      id: todo.id,
      content: todo.content,
    });
    setShowModal(true);
  };

  const onSaveTodo = () => {
    fetch(
      `http://localhost:3030/todos/${editingTodo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingTodo),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const newTodos = todos.map((todo) => {
          if (todo.id === editingTodo.id) {
            return data;
          }
          return todo;
        });
        setTodos(newTodos);
      });
  }

  const onToggleTodo = (id) => {
    const todo = todos.find(
      (todo) => todo.id === id
    );
    const newTodo = {
      ...todo,
      completed: !todo.completed,
    };

    fetch(`http://localhost:3030/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        const newTodos = todos.map((todo) => {
          if (todo.id === id) {
            return data;
          }
          return todo;
        });
        setTodos(newTodos);
      });
  };

  const getTodo = (content) => {
    fetch(
      `http://localhost:3030/todos?content_like=${content}`
    )
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  const getCompletedTodo = () => {
    fetch(
      `http://localhost:3030/todos?completed=true&content_like=${search}`
    )
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  const getUncompletedTodo = () => {
    fetch(
      `http://localhost:3030/todos?completed=false${search}`
    )
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    getTodo(search);
  }, [search]);

  return (
    <div
      className="App"
      style={{
        width: "400px",
        margin: "auto",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: "1",
          justifyContent: "center",
          alignItems: "center",
          visibility: showModal
            ? "visible"
            : "hidden",
        }}
      >
        <div
          style={{
            width: "400px",

            backgroundColor: "white",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>Edit Note: {editingTodo?.id}</h1>
          <input
            type="text"
            placeholder="Enter your note"
            style={{
              width: "100%",
              padding: "5px 0",
            }}
            value={editingTodo?.content}
            onChange={(e) =>
              setEditingTodo({
                ...editingTodo,
                content: e.target.value,
              })
            }
          />
          <button
            style={{
              padding: "5px",
              margin: "5px 0",
            }}
            onClick={() => {
              setShowModal(false);
              onSaveTodo();
            }}
          >
            Save
          </button>
        </div>
      </div>
      <h1>Note App</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search your note"
          style={{
            width: "100%",
            padding: "5px",
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => {
            getTodos();
            setSearch("");
          }}
          style={{
            padding: "5px",
          }}
        >
          All
        </button>
        <button
          onClick={getCompletedTodo}
          style={{
            padding: "5px",
          }}
        >
          Completed
        </button>
        <button
          onClick={getUncompletedTodo}
          style={{
            padding: "5px",
          }}
        >
          Uncompleted
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Enter your note"
          style={{
            width: "100%",
            padding: "5px",
          }}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />
        <button
          onClick={onAddTodo}
          style={{
            padding: "5px",
          }}
        >
          Add
        </button>
      </div>
      {todos.map((todo) => {
        return (
          <div
            key={todo.id}
            style={{
              border: "1px solid grey",
              padding: "10px",
              backgroundColor: todo.completed
                ? `rgba(0, 255, 0, 0.5)`
                : "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>{todo.content}</p>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  onToggleTodo(todo.id)
                }
              />
            </div>
            <button
              onClick={() =>
                onDeleteTodo(todo.id)
              }
            >
              Delete
            </button>
            <button
              onClick={() => onEditTodo(todo.id)}
            >
              Edit
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
