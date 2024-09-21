'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface Task extends Document {
    _id:string;
    title: string;
    description?: string;
    status: string;
    priority: string;
    dueDate?: Date;
    user: string; 
  }

  interface AddTask extends Document {
  
    title: string;
    description?: string;
    status: string;
    priority: string;
    dueDate?: Date;
 
  }

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, '_id'>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
}


const TaskContext = createContext<TaskContextType | undefined>(undefined);

const api_uri = "https://task-manager-t77j.onrender.com"

export const TaskProvider= ({ children }:{children:React.ReactNode}) => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


 
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api_uri}/api/task`,{withCredentials:true});
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

 
  const addTask = async (newTask: AddTask) => {
    try {
      const response = await axios.post(`${api_uri}/api/task`, newTask,{withCredentials:true});
      setTasks(prevTasks => [...prevTasks, { ...response.data, _id: response.data._id }]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  
  const updateTask = async (updatedTask: Task) => {
    try {
      await axios.put(`${api_uri}/api/task/${updatedTask._id}`, updatedTask,{withCredentials:true});
      setTasks(prevTasks => prevTasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
    } catch (err) {
      setError('Failed to update task');
    }
  };


  const deleteTask = async (id: string) => {
    try {
        console.log("object")
      await axios.delete(`${api_uri}/api/task/${id}`,{withCredentials:true});
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};


export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
