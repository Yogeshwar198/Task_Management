import React, { useState, useContext } from 'react';
import { PiDotsThreeBold } from "react-icons/pi";
import { StoreContext } from '../context/store';
import TaskCard from './TaskCard';

const Todo = () => {
  const { tasks, updateTaskStatus, deleteTask, searchQuery } = useContext(StoreContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableTask, setEditableTask] = useState(null);

  // Open the modal with the task data for editing
  const openEditModal = (task) => {
    setEditableTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditableTask(null);
  };

  // Handle status change
  const handleStatusChange = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
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

  // Handle delete task
  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter(task =>
    task.status === 'active' && (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className='min-w-[22vw] xl:min-w-[24.5vw] mt-6 p-4 bg-gray-200 rounded-lg shadow-md shadow-gray-400'>
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-full w-2 h-2 bg-blue-600"></div>
          <h1 className="text-lg font-semibold text-gray-800">To Do</h1>
          <p className="w-4 h-4 text-center text-[10px] font-medium text-gray-700 bg-gray-300 rounded-full">
          {filteredTasks.length}
          </p>
        </div>

        <hr className='h-1 bg-blue-600' />

        <div className="space-y-3">
          {filteredTasks.map((task, index) => (
            <div key={task.id || index} className="relative p-4 bg-white border border-gray-200 rounded-xl shadow-md shadow-gray-400">
              <p className={`${getPriorityColor(task.assignedTo)} inline-block mb-2 px-3 py-1 text-xs font-medium rounded-full`}>
                {task.assignedTo || "Low"}
              </p>

              <div className="relative group">
                <button className="absolute right-2 -top-8 text-gray-400 hover:text-gray-600">
                  <PiDotsThreeBold />
                </button>
                <div className="hidden group-hover:flex flex-col absolute right-0 -top-5 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => openEditModal(task)}  // Open edit modal with task data
                  >
                    Edit
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-yellow-600 hover:bg-gray-100"
                    onClick={() => handleStatusChange(task._id, 'inProgress')}
                  >
                    Progress
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-gray-100"
                    onClick={() => handleStatusChange(task._id, 'done')}
                  >
                    Done
                  </button>
                </div>
              </div>

              <h2 className="text-sm font-semibold text-gray-800">{task.title}</h2>
              <p className="text-xs text-gray-600 mt-1">{task.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Deadline: <span className="font-medium text-gray-700">{task.deadline?.toLocaleDateString()}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------ Modal for Editing Task ------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <TaskCard
            editableTask={editableTask}
            isEditMode={true}
            onClose={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default Todo;
