import React, { useEffect, useState } from 'react';

const TaskCount = () => {
    const [taskCount, setTaskCount] = useState({});
    useEffect(() => {
        setTaskCount(JSON.parse(localStorage.getItem('taskCount')));
    }, []);

    const totalAmountOfTasksCompleted = Object.keys(taskCount).reduce(
        (previousValue, currentValue) => {
            return previousValue + taskCount[currentValue];
        },
        0
    );

    return (
        <React.Fragment>
            <h2 className="mb-1 font-size-3">task count</h2>

            <p className="mb-2">
                <span className="font-weight-bold">
                    {totalAmountOfTasksCompleted}
                </span>{' '}
                {totalAmountOfTasksCompleted === 1 ? 'task ' : 'tasks '}
                completed
            </p>

            {Object.keys(taskCount)
                .sort((a, b) => taskCount[b] - taskCount[a])
                .map(taskCountKey => {
                    return (
                        <div className="mb-1 font-size-2" key={taskCountKey}>
                            {taskCountKey} - {taskCount[taskCountKey]}
                        </div>
                    );
                })}
        </React.Fragment>
    );
};

export default TaskCount;
