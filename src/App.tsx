import React, { useState, useEffect, useRef } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { debounce } from './utility/debounce';
import './App.css';
import './Modal.css';

type Task = {
  id: number;
  description: string;
  completed: boolean;
};

const App: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize the state with localStorage data, if available. 
  //If no data return empty array
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');

    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (description: string) => {
    const task: Task = {
      id: Date.now(),
      description,
      completed: false,
    };
    setTasks([...tasks, task]);
    setShowModal(false);
  };

  // Toggle task completion
  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };


  // Delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const taskToEdit = editingTaskId !== null
    ? tasks.find(task => task.id === editingTaskId)
    : null;

  // Filter tasks based on status
  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      const matchesFilter =
        filter === 'All' || (filter === 'Completed' && task.completed) || (filter === 'Incomplete' && !task.completed);
      const matchesSearch = task.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  };

  // Update filtered tasks based on search term with debounce
  const updateFilteredTasks = debounce((term: string) => {
    setSearchTerm(term);
  }, 300);

  useEffect(() => {
    setFilteredTasks(getFilteredTasks());
  }, [tasks, filter, searchTerm]);

  // Clear the search input
  const clearSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    setSearchTerm('');
  };

  //handle edit task form using id and preprop task name - description
  const handleEditTask = (newDescription: string) => {
    if (editingTaskId !== null) {
      editTask(editingTaskId, newDescription);
      setEditingTaskId(null);
      setShowModal(false);
    }
  };

  const startEditing = (id: number) => {
    setEditingTaskId(id);
    setShowModal(true);
  };

  // Edit a task
  const editTask = (id: number, newDescription: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task
      )
    );
  };


  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      <div className="task-controls-container">
        <button className="new-task-button" onClick={() => { setEditingTaskId(null); setShowModal(true) }}>
          ⊕ New Task
        </button>

        <div className="filter-container">
          <label htmlFor="filter">Filter Tasks: </label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>


        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            className="search-input"
            ref={searchInputRef}
            onChange={(e) => updateFilteredTasks(e.target.value)}
          />
          <button className="clear-button" onClick={clearSearch}>Clear</button>
        </div>
      </div>


      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1 className='form-header'>{editingTaskId ? 'Edit Task' : 'Task Form'}</h1>
            <TaskForm
              addTask={editingTaskId ? handleEditTask : addTask}
              closeModal={() => setShowModal(false)}
              initialDescription={taskToEdit?.description || ''}
            />

          </div>
        </div>
      )}


      <TaskList
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
        startEditing={startEditing}
      />
    </div>
  );
};

export default App;
