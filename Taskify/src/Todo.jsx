import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [updateTask, setUpdateTask] = useState("");

  const token = localStorage.getItem("token");

  const FetchTask = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Fetch", {
        headers: {
          authorization: token,
        },
      });
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const AddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/Add",
        { task },
        {
          headers: {
            authorization: token,
          },
        }
      );
      setTask("");
      FetchTask();
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteTodo = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/Delete/${_id}`, {
        headers: {
          authorization: token,
        },
      });
      FetchTask();
    } catch (err) {
      console.log(err);
    }
  };

  const StartEdit = (item) => {
    setEditId(item._id);
    setUpdateTask(item.task);
  };

  const UpdateTask = async (_id) => {
    try {
      await axios.put(
        `http://localhost:3000/Update/${_id}`,
        { task: updateTask },
        {
          headers: {
            authorization: token,
          },
        }
      );
      setEditId(null);
      FetchTask();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchTask();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-2xl -mt-60">
        <h1 className="text-2xl font-bold text-white text-center mb-5">
          Task<span className="text-yellow-300">ify</span>
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 px-4 py-2 rounded-xl bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={AddTask}
            className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold active:scale-95 transition"
          >
            Add
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto overflow-x-hidden">
          {todos.length === 0 ? (
            <p className="text-white/70 text-center text-sm">No tasks yet</p>
          ) : (
            todos.map((item) => (
              <div key={item._id}>
                {editId !== item._id ? (
                  <div className="bg-white/80 rounded-xl px-4 py-2 text-gray-800 flex items-start gap-3">
                    <p className="flex-1 break-words">{item.task}</p>

                    <button
                      onClick={() => StartEdit(item)}
                      className="text-blue-500 font-bold hover:text-blue-700"
                    >
                      ✎
                    </button>

                    <button
                      onClick={() => DeleteTodo(item._id)}
                      className="text-pink-500 font-bold hover:text-pink-700"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex bg-white/80 rounded-xl px-4 py-2 text-gray-800 items-start gap-3">
                    <input
                      className="flex-1 px-2 py-1 border rounded"
                      type="text"
                      value={updateTask}
                      onChange={(e) => setUpdateTask(e.target.value)}
                    />

                    <button
                      onClick={() => UpdateTask(item._id)}
                      className="font-bold text-green-600"
                    >
                      ✔
                    </button>

                    <button
                      onClick={() => setEditId(null)}
                      className="text-pink-500 font-bold hover:text-pink-700"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
