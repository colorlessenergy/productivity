import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Nav from '../shared/components/Nav';
import Task from '../shared/components/Task';
import EditTask from '../shared/components/EditTask';
import Modal from '../shared/components/Modal/Modal';

export default function App () {
    const [ tasks, setTasks ] = useState({});
    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem('tasks')));
    }, []);

    const handleCheckboxChange = ({ task, taskType }) => {
        let cloneTasks = JSON.parse(JSON.stringify(tasks));
        const taskIndex = cloneTasks[ taskType ].findIndex(cloneTask => cloneTask.ID === task.ID);
        cloneTasks[ taskType ][ taskIndex ] = { ...cloneTasks[ taskType ][ taskIndex ], isDone: !cloneTasks[ taskType ][ taskIndex ].isDone }

        setTasks(cloneTasks);
        localStorage.setItem('visitedCelebrationPage', JSON.stringify(false));
        localStorage.setItem('tasks', JSON.stringify(cloneTasks));
    }

    const router = useRouter();
    useEffect(() => {
        if (!tasks.quickTasks && !tasks.firstPriority && !tasks.secondPriority || JSON.parse(localStorage.getItem('visitedCelebrationPage'))) return;

        if (tasks.quickTasks.filter(task => task.isDone === false).length === 0 &&
            tasks.firstPriority.filter(task => task.isDone === false).length === 0 &&
            tasks.secondPriority.filter(task => task.isDone === false).length === 0) {
                localStorage.setItem('visitedCelebrationPage', JSON.stringify(true));
                router.replace('/celebration');
        }
    }, [ tasks ]);

    const [ isEditTaskModalOpen, setIsEditTaskModalOpen ] = useState(false);
    const toggleEditTaskModal = () => {
        setIsEditTaskModalOpen(previousIsEditTaskModalOpen => !previousIsEditTaskModalOpen);
    }

    const [ taskToEdit, setTaskToEdit ] = useState({});
    const openEditTaskModal = ({ task, taskType }) => {
        toggleEditTaskModal();
        setTaskToEdit({ ...task, taskType })
    }
    
    const handleInputChange = (event) => {
        setTaskToEdit(previousTaskToEdit => ({ ...previousTaskToEdit, task: event.target.value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const cloneTasks = JSON.parse(JSON.stringify(tasks));
        const taskIndex = cloneTasks[ taskToEdit.taskType ].findIndex(task => task.ID === taskToEdit.ID);
        cloneTasks[ taskToEdit.taskType ][ taskIndex ] = {
            ID: taskToEdit.ID,
            isDone: taskToEdit.isDone,
            task: taskToEdit.task
        }
        setTasks(cloneTasks);
        localStorage.setItem('tasks', JSON.stringify(cloneTasks));

        toggleEditTaskModal();
    }

    const deleteTask = () => {
        const cloneTasks = JSON.parse(JSON.stringify(tasks));
        const taskIndex = cloneTasks[ taskToEdit.taskType ].findIndex(task => task.ID === taskToEdit.ID);
        cloneTasks[ taskToEdit.taskType ].splice(taskIndex, 1);
        setTasks(cloneTasks);
        localStorage.setItem('tasks', JSON.stringify(cloneTasks));

        toggleEditTaskModal();
    }

    const sortTasks = (taskOne, taskTwo) => {
        if (taskOne.isDone === taskTwo.isDone) {
            return taskOne.ID - taskTwo.ID;
        } else if (taskOne.isDone) {
            return 1;
        } else {
            return -1;
        }
    }

    return (
        <div>
            <Head>
                <title>app - productivity</title>
                <meta name="description" content="app - productivity" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />

                <h2 className="font-size-2 font-weight-bold color-dark-blue">quick tasks</h2>
                { tasks.quickTasks && tasks.quickTasks.sort(sortTasks).map(task => {
                    return ( <Task key={ task.ID }
                            task={ task }
                            taskType='quickTasks'
                            handleCheckboxChange={ handleCheckboxChange }
                            openEditTaskModal={ openEditTaskModal } />
                    );
                }) }

                <h2 className="font-size-2 font-weight-bold color-dark-blue">priority 1</h2>
                { tasks.firstPriority && tasks.firstPriority.sort(sortTasks).map(task => {
                    return (
                        <Task
                            key={ task.ID }
                            task={ task }
                            taskType='firstPriority'
                            handleCheckboxChange={ handleCheckboxChange }
                            openEditTaskModal={ openEditTaskModal } />
                    );
                }) }

                <h2 className="font-size-2 font-weight-bold color-dark-blue">priority 2</h2>
                { tasks.secondPriority && tasks.secondPriority.sort(sortTasks).map(task => {
                    return (
                        <Task
                            key={ task.ID }
                            task={ task }
                            taskType='secondPriority'
                            handleCheckboxChange={ handleCheckboxChange }
                            openEditTaskModal={ openEditTaskModal } />
                    );
                }) }

                { isEditTaskModalOpen ? (
                    <Modal isOpen={ isEditTaskModalOpen }>
                        <EditTask
                            taskToEdit={ taskToEdit }
                            handleInputChange={ handleInputChange }
                            handleSubmit={ handleSubmit }
                            toggleEditTaskModal={ toggleEditTaskModal }
                            deleteTask={ deleteTask } />
                    </Modal>
                ) : (null) }
            </div>
        </div>
    );
}
