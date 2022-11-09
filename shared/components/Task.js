import React from 'react';

const Task = ({ task, taskType, setTasks, openEditTaskModal }) => {
    const handleCheckboxChange = ({ task, taskType }) => {
        let cloneTasks = JSON.parse(localStorage.getItem('tasks'));
        const taskIndex = cloneTasks[taskType].findIndex(
            cloneTask => cloneTask.ID === task.ID
        );
        cloneTasks[taskType][taskIndex] = {
            ...cloneTasks[taskType][taskIndex],
            isDone: !cloneTasks[taskType][taskIndex].isDone
        };

        setTasks(cloneTasks);
        localStorage.setItem('tasks', JSON.stringify(cloneTasks));

        let taskCount = JSON.parse(localStorage.getItem('taskCount'));
        const taskText = task.task.toLowerCase();
        if (!task.isDone) {
            if (taskCount[taskText]) {
                taskCount[taskText] += 1;
            } else {
                taskCount[taskText] = 1;
            }
        } else {
            taskCount[taskText] -= 1;
        }
        localStorage.setItem('taskCount', JSON.stringify(taskCount));
    };

    return (
        <div
            className={`task flex align-items-center justify-content-between mb-1 ${
                task.isDone ? 'opacity-5' : ''
            }`}
        >
            <input
                onChange={() => handleCheckboxChange({ task, taskType })}
                className="d-none"
                type="checkbox"
                id={`task-${task.ID}`}
                name={`task-${task.ID}`}
                checked={task.isDone}
            />

            <label
                className="flex align-items-center flex-1 p-1 cursor-pointer font-size-2"
                htmlFor={`task-${task.ID}`}
            >
                <span className="checkbox mr-1"></span>
                {task.task}
            </label>

            {!task.isDone ? (
                <React.Fragment>
                    <button
                        title="edit"
                        onClick={() => openEditTaskModal({ task, taskType })}
                        className="mr-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="icon"
                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" />
                        </svg>
                    </button>
                </React.Fragment>
            ) : null}
        </div>
    );
};

export default Task;
