import React, { useContext } from 'react';
import { PiDotsThreeBold } from "react-icons/pi";
import { StoreContext } from '../context/store';

const Done = () => {
  const { tasks, updateTaskStatus, deleteTask ,searchQuery} = useContext(StoreContext);

  // Function to move task to "On Progress"
  const handleMoveToProgress = (taskId) => {
    updateTaskStatus(taskId, 'inProgress');
  };

  // Function to move task to "To Do"
  const handleMoveToTodo = (taskId) => {
    updateTaskStatus(taskId, 'active');
  };

  // Handle delete task
  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

    // Filter tasks based on the search query
    const filteredTasks = tasks.filter(task =>
      task.status === 'done' && (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  

  return (
    <div className='min-w-[22vw] xl:min-w-[24.5vw] mt-6 p-4 bg-gray-200 rounded-lg shadow-md shadow-gray-400'>
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-full w-2 h-2 bg-purple-400"></div>
          <h1 className="text-lg font-semibold text-gray-800">Done</h1>
          <p className="w-4 h-4 text-center text-[10px] font-medium text-gray-700 bg-gray-300 rounded-full">
          {filteredTasks.length}
            {/* {tasks.filter(task => task.status === 'done').length} */}
          </p>
        </div>
        <hr className='h-1 bg-green-500' />
        <div className="space-y-3">
          {filteredTasks.map((task,index) => (
            <div key={task.id || index} className="relative p-4 bg-white border border-gray-200 rounded-xl shadow-md shadow-gray-400">
              <p className="inline-block mb-2 px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full hover:bg-green-200">
                Completed
              </p>
              <div className="relative group">
                <button className="absolute right-2 -top-8 text-gray-400 hover:text-gray-600">
                  <PiDotsThreeBold />
                </button>
                <div className="hidden group-hover:flex flex-col absolute right-0 -top-5 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-yellow-600 hover:bg-gray-100"
                    onClick={() => handleMoveToProgress(task._id)}
                  >
                    Progress
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-gray-100"
                    onClick={() => handleMoveToTodo(task._id)}
                  >
                    Todo
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
    </div>
  );
}

export default Done;
