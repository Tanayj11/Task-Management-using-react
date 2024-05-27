import React, { useContext, useState } from 'react';
import './App.css';
import { TaskProvider, TaskContext } from './TaskContext';
import Header from './Header';
import Footer from './Footer';

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert('Title is required');
      return;
    }
    addTask({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('To Do');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

const TaskItem = ({ task }) => {
  const { updateTaskStatus, deleteTask } = useContext(TaskContext);

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <select value={task.status} onChange={(e) => updateTaskStatus(task.id, e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

const TaskFilter = ({ filterStatus, setFilterStatus }) => {
  return (
    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="task-filter">
      <option value="All">All</option>
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  );
};

const TaskList = ({ filterStatus }) => {
  const { tasks } = useContext(TaskContext);
  const filteredTasks = tasks.filter(task => filterStatus === 'All' || task.status === filterStatus);

  return (
    <div className="task-list">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

const App = () => {
  const [filterStatus, setFilterStatus] = useState('All');

  return (
    <TaskProvider>
      <div className="app">
        <Header />
        <TaskForm />
        <TaskFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        <TaskList filterStatus={filterStatus} />
        <Footer />
      </div>
    </TaskProvider>
  );
};

export default App;
