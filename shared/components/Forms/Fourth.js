import React, { useState } from 'react';

const Fourth = ({ tasks, setTasks, setFormPart }) => { 
    const [ firstPriorityTasks, setFirstPriorityTasks ] = useState(tasks.map(task => ({ task: task, isFirstPriorityTask: false })));

    const handleCheckboxChange = (index) => {
        let cloneFirstPriorityTasks = JSON.parse(JSON.stringify(firstPriorityTasks));
        cloneFirstPriorityTasks[index].isFirstPriorityTask = !cloneFirstPriorityTasks[index].isFirstPriorityTask;
        setFirstPriorityTasks(cloneFirstPriorityTasks);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let ID = JSON.parse(localStorage.getItem('ID'));

        setTasks(previousTasks => (
            { ...previousTasks,
                firstPriority: firstPriorityTasks
                    .filter(task => task.isFirstPriorityTask)
                    .map(task => {
                        ID += 1;
                        return { ID, task: task.task, isDone: false }
                    }),
                    secondPriority: firstPriorityTasks
                    .filter(task => !task.isFirstPriorityTask)
                    .map(task => {
                        ID += 1;
                        return { ID, task: task.task, isDone: false }
                    }),
                    allTasks: []
                }));

        localStorage.setItem('ID', JSON.stringify(ID));

        setFormPart('done');
    }

    return (
        <div>
            <p className="mb-1 font-size-3">
                pick ones that have the most priority
            </p>

            <form onSubmit={ handleSubmit }>
                <div className="height-450 mb-1">
                    { tasks.map((task, index) => {
                        return (
                            <React.Fragment key={ index }>
                                <input
                                    onChange={ () => handleCheckboxChange(index) }
                                    className="d-none"
                                    type="checkbox"
                                    id={`task-${ index }`}
                                    name={`task-${ index }`}
                                    checked={ firstPriorityTasks[ index ].isFirstPriorityTask } />

                                <label
                                    className="flex align-items-center mb-1 p-1 cursor-pointer font-size-2"
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

export default Fourth;