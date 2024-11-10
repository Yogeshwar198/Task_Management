import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
export const StoreContext = createContext();

// Create the provider component
const StoreContextProvider = ({ children }) => {

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [tasks, setTasks] = useState([]);
  // Add search query state
  const [searchQuery, setSearchQuery] = useState(""); 

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/tasks`);
        const tasksWithDates = response.data.map(task => ({
          ...task,
          deadline: new Date(task.deadline),  // Convert deadline to Date object
        }));
        setTasks(tasksWithDates);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, [backendUrl]);


  // Function to add a new task with POST request
  const addTask = async (newTask) => {
    try {
      const response = await axios.post(`${backendUrl}/api/tasks`, newTask);
      const savedTask = {
        ...response.data,
        deadline: new Date(response.data.deadline), // Convert deadline to Date object
      };
      setTasks((prevTasks) => [...prevTasks, savedTask]);
    } catch (error) {
      console.error("Error adding task:", error);
      // Optionally handle the error in the UI
    }
  };


  // Function to update the task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      // Update the status in the backend
      await axios.put(`${backendUrl}/api/tasks/${taskId}`, { status: newStatus });
  
      // Update the status in the state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };
  

  // Function to edit an existing task and save it to backend
  const editTask = async (updatedTask) => {
    try {
      const response = await axios.put(`${backendUrl}/api/tasks/${updatedTask._id}`, updatedTask);
      const updatedData = {
        ...response.data,
        deadline: new Date(response.data.deadline),  // Ensure deadline is a Date object
      };
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedData.id ? updatedData : task))
      );
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  };

  // Function to check if a task is expired
  const isTaskExpired = (task) => {
    const currentDate = new Date();
    return new Date(task.deadline) < currentDate && task.status !== 'done';
  };

  // Function to delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${backendUrl}/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };


  return (
    <StoreContext.Provider value={{ tasks, addTask, updateTaskStatus, editTask, deleteTask, isTaskExpired, backendUrl, filteredTasks, searchQuery, setSearchQuery }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
