import React, { useState } from 'react';

const Second = ({ tasks, setTasks, setFormPart }) => { 
    const [ allTasks, setAllTasks ] = useState(tasks.map(task => ({ task: task, isRemoved: false })));

    const handleCheckboxChange = (index) => {
        let cloneAllTasks = JSON.parse(JSON.stringify(allTasks));
        cloneAllTasks[index].isRemoved = !cloneAllTasks[index].isRemoved;
        setAllTasks(cloneAllTasks);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setTasks(previousTasks => ({ ...previousTasks, allTasks: allTasks.filter(task => !task.isRemoved).map(task => task.task) }));
        setFormPart(2);
    }

    return (
        <div>
            <p className="mb-1 font-size-3">
                remove ones that you know can not be done in a reasonable time
            </p>

            <form onSubmit={ handleSubmit }>
                <div className="height-500 mb-1">
                    { tasks.map((task, index) => {
                        return (
                            <React.Fragment key={ index }>
                                <input
                                    onChange={ () => handleCheckboxChange(index) }
                                    className="d-none"
                                    type="checkbox"
                                    id={`task-${ index }`}
                                    name={`task-${ index }`}
                                    checked={ allTasks[ index ].isRemoved } />

                                <label
                                    className="remove-task-label flex align-items-center mb-1 p-1 cursor-pointer font-size-2"
                                    htmlFor={`task-${ index }`}>
                                        <span className="checkbox mr-1"></span>
                                        { task }
                                </label>
                            </React.Fragment>
                        );
                    }) }
                </div>

                <div className="text-right">
                    <button className="button background-color-yellow">next</button>
                </div>
            </form>
        </div>
    );
}

export default Second;