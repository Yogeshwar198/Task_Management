import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SuccessModal from './SuccessModal';
import { StoreContext } from '../context/store';

const TaskCard = ({ editableTask, isEditMode, onClose }) => {
  const { addTask, editTask } = useContext(StoreContext);

  // Initialize state with either editableTask (if in edit mode) or default values
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    deadline: null,
    assignedTo: '',
    ...editableTask,  
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (isEditMode && editableTask) {
      setTaskDetails(editableTask);
    }
  }, [isEditMode, editableTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      deadline: date,
    }));
  };

  const handleSubmit = () => {
    const { title, description, deadline, assignedTo } = taskDetails;
    if (title && description && deadline && assignedTo) {
      if (isEditMode) {
        editTask({ ...taskDetails });  // Edit task using context
      } else {
        addTask({ ...taskDetails, id: Date.now(), status: 'active' });
      }

      setTaskDetails({ title: '', description: '', deadline: null, assignedTo: '' });
      setIsSuccessModalOpen(true);

    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="max-w-sm p-4 bg-white rounded-lg shadow-md">

      <div className="flex items-center mb-4">
        
{/* ---------- Status Indicator ----------- */}
<div className="rounded-full w-2 h-2 bg-purple-500"></div>        
        <h2 className="text-lg font-bold text-gray-800 ml-2">
          {isEditMode ? "EDIT TASK" : "ADD TASK"}
        </h2>
        <button
          className="text-blue-500 text-2xl pl-56"
          onClick={handleSubmit}
        >
          +
        </button>
      </div>

      {/* ----------------- Task Details Form ------------ */}
      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={taskDetails.title}
          onChange={handleChange}
          placeholder="Task Title"
          className="w-full font-bold text-gray-800 text-lg border-b-2 focus:outline-none focus:border-gray-500"
        />
        <textarea
          name="description"
          value={taskDetails.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="w-full mt-2 text-gray-600 text-sm border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-gray-500"
          rows="8"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <label className="font-semibold">Deadline</label>
        <DatePicker
          selected={taskDetails.deadline}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          className="border p-2 rounded outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <div className="flex justify-between items-center">
        <label className="font-semibold">Assigned To</label>
        <select
          name="assignedTo"
          value={taskDetails.assignedTo}
          onChange={handleChange}
          className="border p-2 rounded outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="High">High</option>
        </select>
      </div>

      {isSuccessModalOpen && (
        <SuccessModal
          message={isEditMode ? "Task has been updated successfully" : "Task has been created successfully"}
          onClose={() => {
            setIsSuccessModalOpen(false)
            onClose()
          }}
        />
      )}
    </div>
  );
};

export default TaskCard;
