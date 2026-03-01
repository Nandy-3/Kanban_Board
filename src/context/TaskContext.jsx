import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ];

  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      columnId: taskData.columnId || 'todo',
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'Medium',
      tags: taskData.tags || [],
      createdAt: new Date().toISOString()
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  
  const reorderTasks = (newTasksArray) => {
      setTasks(newTasksArray);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        columns,
        addTask,
        updateTask,
        deleteTask,
        reorderTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
