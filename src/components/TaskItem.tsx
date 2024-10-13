import React from 'react';

type TaskItemProps = {
    task: {
        id: number;
        description: string;
        completed: boolean;
    };
    toggleTaskCompletion: (id: number) => void;
    deleteTask: (id: number) => void;
    editTask: (id: number, newDescription: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTaskCompletion, deleteTask, editTask }) => {
    return (
        <div className="task-row">
            <div className="task-column">{task.description}</div>
            <div className="task-column">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="status-checkbox"
                    aria-label={`Mark ${task.description} as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <span className={`status-label ${task.completed ? 'completed' : 'incomplete'}`}>
                    {task.completed ? 'Completed' : 'Incomplete'}
                </span>
            </div>
            <div className="task-column">
                <button
                    onClick={() => editTask(task.id, task.description || task.description)}
                    className="edit-btn"
                >
                    ✏️ Edit
                </button>
            </div>
            <div className="task-column">
                <button onClick={() => deleteTask(task.id)} className="delete-btn">
                    🗑️ Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
