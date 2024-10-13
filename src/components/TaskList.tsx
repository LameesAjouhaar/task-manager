import React from 'react';
import TaskItem from './TaskItem';


type Task = {
    id: number;
    description: string;
    completed: boolean;
};

type TaskListProps = {
    tasks: Task[];
    toggleTaskCompletion: (id: number) => void;
    deleteTask: (id: number) => void;
    startEditing: (id: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTaskCompletion, deleteTask, startEditing }) => {



    return (
        <div className="task-list-container">
            <div className="task-table-header">
                <div className="header-column">Task Name</div>
                <div className="header-column">Status</div>
                <div className="header-column">Edit</div>
                <div className="header-column">Delete</div>
            </div>

            {tasks.length === 0 ? (
                <div className="task-row no-results-row">
                    <div className="no-results">No results found</div>
                </div>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        toggleTaskCompletion={toggleTaskCompletion}
                        deleteTask={deleteTask}
                        editTask={startEditing}
                    />
                )))}

        </div>
    );
};

export default TaskList;
