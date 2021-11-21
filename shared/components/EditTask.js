import { useEffect, useRef, useState } from 'react';

const EditTask = ({ taskToEdit, setTaskToEdit, handleSubmit, toggleEditTaskModal, deleteTask }) => {
    const handleInputChange = (event) => {
        setTaskToEdit(previousTaskToEdit => ({ ...previousTaskToEdit, task: event.target.value }))
    }

    const [ formValidation, setFormValidation ] = useState('');
    const handleEditTaskSubmit = (event) => {
        event.preventDefault();
        if (taskToEdit.task === '') return setFormValidation('missing task');

        handleSubmit();
    }

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <form
            onSubmit={ handleEditTaskSubmit }
            className="flex flex-1 flex-direction-column justify-content-between">
            <div className="flex flex-direction-column">
                <label
                    htmlFor="editTask"
                    className="font-size-3 font-weight-bold mb-1">edit task</label>
                <input
                    type="text"
                    ref={ inputRef }
                    id="editTask"
                    onChange={ handleInputChange }
                    value={ taskToEdit.task }
                    autoComplete="off" />
                { formValidation ? (
                    <p className="mt-1 color-dark-red">
                        { formValidation }
                    </p>
                ) : (null) }
            </div>
            
            <div className="flex flex-wrap align-items-center justify-content-between">
                <button
                    type="button"
                    onClick={ toggleEditTaskModal }
                    className="button mb-1 background-color-purple color-white">
                    cancel
                </button>

                <button
                    type="button"
                    onClick={ deleteTask }
                    className="button background-color-dark-red color-white">
                    delete
                </button>

                <button className="button background-color-yellow">
                    edit
                </button>
            </div>
        </form>
    );
}

export default EditTask;