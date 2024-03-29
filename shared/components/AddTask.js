import { useEffect, useRef, useState } from 'react';

const AddTask = ({ handleSubmit, toggleAddTaskModal }) => {
    const [task, setTask] = useState('');
    const [formValidation, setFormValidation] = useState('');

    const handleInputChange = event => {
        setTask(event.target.value);
    };

    const handleAddTaskSubmit = ({ event, task }) => {
        event.preventDefault();
        if (task === '') return setFormValidation('missing task');

        handleSubmit(task.trim());
    };

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <form
            onSubmit={event => handleAddTaskSubmit({ event, task })}
            className="flex flex-1 flex-direction-column justify-content-between"
        >
            <div className="flex flex-direction-column">
                <label
                    htmlFor="addTask"
                    className="font-size-3 font-weight-bold mb-1"
                >
                    add task
                </label>
                <input
                    type="text"
                    ref={inputRef}
                    id="addTask"
                    placeholder="add task"
                    onChange={handleInputChange}
                    value={task}
                    autoComplete="off"
                />
                {formValidation ? (
                    <p className="mt-1 color-dark-red">{formValidation}</p>
                ) : null}
            </div>

            <div className="flex align-items-center justify-content-between">
                <button
                    type="button"
                    title="cancel"
                    onClick={toggleAddTaskModal}
                    className="button background-color-purple color-white"
                >
                    cancel
                </button>

                <button
                    title="create"
                    className="button background-color-yellow"
                >
                    create
                </button>
            </div>
        </form>
    );
};

export default AddTask;
