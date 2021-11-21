import { useState } from 'react';

const First = ({ setTasks, setFormPart }) => { 
    const [ allTasks, setAllTasks ] = useState('');
    const handleTextareaChange = (event) => {
        setAllTasks(event.target.value);
    }

    const [ formValidation, setFormValidation ] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        if (allTasks === '') return setFormValidation('at least one task needs to exist');

        setTasks(previousTasks => ({...previousTasks, allTasks: allTasks.split('\n').filter(task => task !== '')}));
        setFormPart(1);
    }

    return (
        <div>
            <p className="mb-1 font-size-3">
                Dump everything that you need to do
            </p>
            <p className="mb-1 font-size-2">
                make sure to separate them with a enter :)
            </p>

            <form onSubmit={ handleSubmit }>
                <div className="mb-1 text-right">
                    <button className="button background-color-yellow">next</button>
                </div>

                <label
                    htmlFor="allTask"
                    className="d-none">Dump everything that you need to do</label>
                <textarea
                    onChange={ handleTextareaChange }
                    className="all-tasks-textarea"></textarea>
                { formValidation ? (
                    <p className="mt-1 color-dark-red">
                        { formValidation }
                    </p>
                ) : (null) }
            </form>
        </div>
    );
}

export default First;