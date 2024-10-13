import React, { useState } from 'react';
import './styling/Form.css'

type TaskFormProps = {
    addTask: (description: string) => void;
    closeModal: () => void;
    initialDescription?: string;
};

const TaskForm: React.FC<TaskFormProps> = ({ addTask, closeModal, initialDescription = '' }) => {
    const [newTask, setNewTask] = useState(initialDescription);
    const [error, setError] = useState('');

    // Update the input field when initialDescription / task name changes
    React.useEffect(() => {
        setNewTask(initialDescription);
    }, [initialDescription]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTask.trim() === '') {
            setError('* Task name cannot be empty!');
            return;
        }
        addTask(newTask);
        setNewTask('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newTask}
                onChange={(e) => {
                    setNewTask(e.target.value)
                    if (error) setError('');
                }}
                placeholder="Add a new task"
                className="task-input"
            />
            {error && <div className="error-message">{error}</div>}
            <div className="form-button-container">
                <button type="submit" className='add-task-button'>{initialDescription ? 'Update Task' : 'Add Task'}</button>
                <button type="button" className="close-modal" onClick={closeModal}>Close</button>
            </div>
        </form>
    );
};

export default TaskForm;
