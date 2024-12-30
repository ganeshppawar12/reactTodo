import React, { useState, useEffect } from "react";
import Task from "./components/Task";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">
          LocalTasker
        </h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:ring focus:ring-purple-400 focus:outline-none"
          />
          <button
            onClick={addTask}
            className="bg-purple-600 text-white px-6 py-3 rounded-r-lg hover:bg-purple-700 transition"
          >
            Add Task
          </button>
        </div>
        <ul className="space-y-3 max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {tasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              onDelete={() => deleteTask(index)}
              onToggleCompletion={() => toggleTaskCompletion(index)}
            />
          ))}
        </ul>
        <button
          onClick={clearCompletedTasks}
          className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
        >
          Clear Completed Tasks
        </button>
      </div>
    </div>
  );
};

export default App;
