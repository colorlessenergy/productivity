import { useEffect, useRef, useState } from 'react';

const EditTask = ({
    taskToEdit,
    setTaskToEdit,
    setTasks,
    handleSubmit,
    toggleEditTaskModal
}) => {
    const handleInputChange = event => {
        setTaskToEdit(previousTaskToEdit => ({
            ...previousTaskToEdit,
            task: event.target.value
        }));
    };

    const [formValidation, setFormValidation] = useState('');
    const handleEditTaskSubmit = event => {
        event.preventDefault();
        if (taskToEdit.task === '') return setFormValidation('missing task');

        handleSubmit();
    };

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const deleteTask = () => {
        const cloneTasks = JSON.parse(localStorage.getItem('tasks'));
        const taskIndex = cloneTasks[taskToEdit.taskType].findIndex(
            cloneTask => cloneTask.ID === taskToEdit.ID
        );
        cloneTasks[taskToEdit.taskType].splice(taskIndex, 1);
        setTasks(cloneTasks);
        localStorage.setItem('tasks', JSON.stringify(cloneTasks));

        toggleEditTaskModal();
    };

    return (
        <form
            onSubmit={handleEditTaskSubmit}
            className="flex flex-1 flex-direction-column justify-content-between"
        >
            <div className="flex flex-direction-column">
                <label
                    htmlFor="editTask"
                    className="font-size-3 font-weight-bold mb-1"
                >
                    edit task
                </label>
                <input
                    type="text"
                    ref={inputRef}
                    id="editTask"
                    onChange={handleInputChange}
                    value={taskToEdit.task}
                    autoComplete="off"
                />
                {formValidation ? (
                    <p className="mt-1 color-dark-red">{formValidation}</p>
                ) : null}
            </div>

            <div className="flex flex-wrap align-items-center justify-content-between">
                <button
                    type="button"
                    title="cancel"
                    onClick={toggleEditTaskModal}
                    className="button mb-1 background-color-purple color-white"
                >
                    cancel
                </button>

                <button
                    type="button"
                    title="delete"
                    onClick={deleteTask}
                    className="button background-color-dark-red color-white"
                >
                    delete
                </button>

                <button title="edit" className="button background-color-yellow">
                    edit
                </button>
            </div>
        </form>
    );
};

export default EditTask;
