const EditTask = ({ taskToEdit, handleInputChange, handleSubmit, toggleEditTaskModal, deleteTask }) => {
    return (
        <form
            onSubmit={ handleSubmit }
            className="flex flex-1 flex-direction-column justify-content-between">
            <div className="flex flex-direction-column">
                <label
                    htmlFor="editTask"
                    className="font-size-3 font-weight-bold mb-1">edit task</label>
                <input
                    type="text"
                    id="editTask"
                    onChange={ handleInputChange }
                    autoComplete="off"
                    value={ taskToEdit.task } />
            </div>
            
            <div className="flex align-items-center justify-content-between">
                <button
                    type="button"
                    onClick={ toggleEditTaskModal }
                    className="button background-color-red">
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