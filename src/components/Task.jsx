import React from "react";

const Task = ({ task, onDelete, onToggleCompletion }) => {
  return (
    <li
      className={`flex items-center bg-gray-100 rounded-lg p-3 shadow-md transition transform hover:scale-105 ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      <span
        onClick={onToggleCompletion}
        className={`flex-1 cursor-pointer ${
          task.completed
            ? "line-through text-gray-500"
            : "text-gray-900 font-semibold"
        }`}
      >
        {task.text}
      </span>
      <button
        onClick={onDelete}
        className="ml-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
      >
        Delete
      </button>
    </li>
  );
};

export default Task;
