import Head from 'next/head';
import { useEffect, useState } from 'react';

import Nav from '../shared/components/Nav';
import Task from '../shared/components/Task';

export default function App () {
    const [ tasks, setTasks ] = useState({});
    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem('tasks')));
    }, []);

    const handleCheckboxChange = ({ task, taskType }) => {
        let cloneTasks = JSON.parse(JSON.stringify(tasks));
        const taskIndex = cloneTasks[ taskType ].findIndex(cloneTask => cloneTask.ID === task.ID);
        cloneTasks[ taskType ][ taskIndex ] = { ...cloneTasks[ taskType ][ taskIndex ], isDone: !cloneTasks[ taskType ][ taskIndex ].isDone }

        if (cloneTasks[ taskType ][ taskIndex ].isDone === true) {
            const task = cloneTasks[ taskType ][ taskIndex ];
            cloneTasks[ taskType ].splice(taskIndex, 1)
            cloneTasks[ taskType ].splice(cloneTasks[ taskType ].length, 0, task);
        }

        setTasks(cloneTasks);
    }

    return (
        <div>
            <Head>
                <title>productivity</title>
                <meta name="description" content="productivity" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />

                <h2 className="font-size-2 font-weight-bold color-dark-blue">quick tasks</h2>
                { tasks.quickTasks && tasks.quickTasks.map(task => {
                    return (
                        <Task
                            key={ task.ID }
                            task={ task }
                            taskType='quickTasks'
                            handleCheckboxChange={ handleCheckboxChange } />
                    );
                }) }

                <h2 className="font-size-2 font-weight-bold color-dark-blue">priority 1</h2>
                { tasks.firstPriority && tasks.firstPriority.map(task => {
                    return (
                        <Task
                            key={ task.ID }
                            task={ task }
                            taskType='firstPriority'
                            handleCheckboxChange={ handleCheckboxChange } />
                    );
                }) }

                <h2 className="font-size-2 font-weight-bold color-dark-blue">priority 2</h2>
                { tasks.secondPriority && tasks.secondPriority.map(task => {
                    return (
                        <Task
                            key={ task.ID }
                            task={ task }
                            taskType='secondPriority'
                            handleCheckboxChange={ handleCheckboxChange } />
                    );
                }) }
            </div>
        </div>
    );
}
