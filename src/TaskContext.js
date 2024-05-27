import React, { createContext, useReducer } from 'react';
import TaskReducer from './TaskReducer';

const initialState = {
  tasks: []
};

export const TaskContext = createContext(initialState);

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const addTask = (task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const updateTaskStatus = (id, status) => {
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id, status } });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return (
    <TaskContext.Provider value={{
      tasks: state.tasks,
      addTask,
      updateTaskStatus,
      deleteTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};
