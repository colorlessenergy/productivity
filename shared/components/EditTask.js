const EditTask = ({ taskToEdit, handleInputChange, handleSubmit }) => {
    return (
        <form
            onSubmit={ handleSubmit }
            className="flex flex-1 flex-direction-column justify-content-between">
            <div className="flex flex-direction-column">
                <label
                    htmlFor="editTask"
                    className="font-size-2 font-weight-bold mb-1">edit task</label>
                <input
                    type="text"
                    id="editTask"
                    onChange={ handleInputChange }
                    autoComplete="off"
                    value={ taskToEdit.task } />
            </div>
            
            <div className="text-right">
                <button className="submit-button background-color-yellow">
                    edit
                </button>
            </div>
        </form>
    );
}

export default EditTask;