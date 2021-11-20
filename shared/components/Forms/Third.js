import React, { useState } from 'react';

const Third = ({ tasks, setTasks, setFormPart }) => { 
    const [ quickTasks, setQuickTasks ] = useState(tasks.map(task => ({ task: task, isQuickTask: false })));

    const handleCheckboxChange = (index) => {
        let cloneQuickTasks = JSON.parse(JSON.stringify(quickTasks));
        cloneQuickTasks[index].isQuickTask = !cloneQuickTasks[index].isQuickTask;
        setQuickTasks(cloneQuickTasks);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let ID = JSON.parse(localStorage.getItem('ID'));

        setTasks(previousTasks => (
            { ...previousTasks,
                allTasks: quickTasks.filter(task => !task.isQuickTask).map(task => task.task),
                quickTasks: quickTasks
                    .filter(task => task.isQuickTask)
                    .map(task => {
                        ID += 1;
                        return { ID, task: task.task, isDone: false }
                    })
                }));

        localStorage.setItem('ID', JSON.stringify(ID));

        setFormPart(3);
    }

    return (
        <div>
            <p className="mb-1 font-size-3">
                pick ones that can be done quickly
            </p>

            <form onSubmit={ handleSubmit }>
                { tasks.map((task, index) => {
                    return (
                        <React.Fragment key={ index }>
                            <input
                                onChange={ () => handleCheckboxChange(index) }
                                className="d-none"
                                type="checkbox"
                                id={`task-${ index }`}
                                name={`task-${ index }`}
                                checked={ quickTasks[ index ].isQuickTask } />

                            <label
                                className="flex align-items-center mb-1 p-1 cursor-pointer font-size-2"
                                htmlFor={`task-${ index }`}>
                                    <span className="checkbox mr-1"></span>
                                    { task }
                            </label>
                        </React.Fragment>
                    );
               }) }

                <div className="text-right">
                    <button className="submit-button background-color-yellow">next</button>
                </div>
            </form>
        </div>
    );
}

export default Third;