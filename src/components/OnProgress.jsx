import React, { useContext } from 'react';
import { PiDotsThreeBold } from "react-icons/pi";
import { StoreContext } from '../context/store';

const OnProgress = () => {
  const { tasks, updateTaskStatus, deleteTask, searchQuery } = useContext(StoreContext);  // Access tasks, updateTaskStatus, deleteTask from context

  // Function to move task to "Done"
  const handleMoveToDone = (taskId) => {
    updateTaskStatus(taskId, 'done');
  };

  // Function to move task to "Todo"
  const handleMoveToTodo = (taskId) => {
    updateTaskStatus(taskId, 'active');  // Change status to 'active' to move to To Do
  };

  // Handle delete task
  const handleDelete = (taskId) => {
    deleteTask(taskId);  // Delete the task by its id
  };

  // Function to dynamically set the priority color based on assignedTo
  const getPriorityColor = (assignedTo) => {
    switch (assignedTo) {
      case 'High':
        return 'text-blue-600 bg-blue-100 hover:bg-blue-200'; // High Priority Color
      case 'Low':
        return 'text-red-600 bg-red-100 hover:bg-red-200'; // Low Priority Color
      default:
        return 'text-gray-600 bg-gray-100'; // Default (if no priority assigned)
    }
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter(task =>
    task.status === 'inProgress' && (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className='min-w-[22vw] xl:min-w-[24.5vw] mt-6 p-4 bg-gray-200 rounded-lg shadow-md shadow-gray-400'>
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          {/* ---------- Status Indicator ----------- */}
          <div className="rounded-full w-2 h-2 bg-yellow-500"></div>

          {/* ------------------ Title ------------------ */}
          <h1 className="text-lg font-semibold text-gray-800">On Progress</h1>

          {/* ------------------- Task Count ----------------- */}
          <p className="w-4 h-4 text-center text-[10px] font-medium text-gray-700 bg-gray-300 rounded-full">
            {filteredTasks.length}
          </p>
        </div>

        {/* --------- Horizontal Line --------*/}
        <hr className='h-1 bg-yellow-500' />

        {/* ---------- Task Cards ---------- */}
        <div className="space-y-3">
          {filteredTasks.map((task, index) => (
            <div key={task.id || index} className="relative p-4 bg-white border border-gray-200 rounded-xl shadow-md shadow-gray-400">
              {/* ------------------- Priority Label ---------------------- */}
              <p className={`${getPriorityColor(task.assignedTo)} inline-block mb-2 px-3 py-1 text-xs font-medium rounded-full`}>
                {task.assignedTo || "Low"}
              </p>

              {/* <p className="inline-block mb-2 px-3 py-1 text-xs font-medium text-yellow-600 bg-red-100 rounded-full hover:bg-blue-200">
                Low
              </p> */}

              {/* -------------------- Options Icon with Dropdown ---------------------- */}
              <div className="relative group">
                <button className="absolute right-2 -top-8 text-gray-400 hover:text-gray-600">
                  <PiDotsThreeBold />
                </button>
                {/* ------------------- Dropdown Menu ------------------- */}
                <div className="hidden group-hover:flex flex-col absolute right-0 -top-5 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => handleDelete(task._id)}  // Delete task
                  >
                    Delete
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-gray-100"
                    onClick={() => handleMoveToTodo(task._id)}  // Move to Todo
                  >
                    Todo
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-gray-100"
                    onClick={() => handleMoveToDone(task._id)}  // Move to Done
                  >
                    Done
                  </button>
                </div>
              </div>

              {/* ------------------ Task Title ---------------- */}
              <h2 className="text-sm font-semibold text-gray-800">{task.title}</h2>

              {/* -------------------- Task Description -------------------- */}
              <p className="text-xs text-gray-600 mt-1">
                {task.description}
              </p>

              {/* ---------------------- Deadline ------------------- */}
              <p className="text-xs text-gray-500 mt-2">
                Deadline: <span className="font-medium text-gray-700">{task.deadline?.toLocaleDateString()}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnProgress;
