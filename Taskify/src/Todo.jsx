import { useState } from "react";
import "./App.css";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateTodo = () => {};

  const editTodo = (index) => {};

  const deleteTodo = (index) => {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-2xl">
        <h1 className="text-2xl font-bold text-white text-center mb-5">
          Task<span className="text-yellow-300">ify</span>
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 px-4 py-2 rounded-xl bg-white/90
                       text-gray-800 outline-none
                       focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={addOrUpdateTodo}
            className="px-4 py-2 rounded-xl bg-yellow-400
                       hover:bg-yellow-500 text-gray-900 font-semibold
                       active:scale-95 transition"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto overflow-x-hidden">
          {todos.length === 0 ? (
            <p className="text-white/70 text-center text-sm">No tasks yet</p>
          ) : (
            todos.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 rounded-xl px-4 py-2
                           text-gray-800 flex items-start gap-3"
              >
                <p className="flex-1 wrap-break-word">{item}</p>

                <button
                  onClick={() => editTodo(index)}
                  className="text-blue-500 font-bold hover:text-blue-700"
                >
                  ✎
                </button>

                <button
                  onClick={() => deleteTodo(index)}
                  className="text-pink-500 font-bold hover:text-pink-700"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
