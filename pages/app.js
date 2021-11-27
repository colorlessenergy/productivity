import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Nav from '../shared/components/Nav';
import Task from '../shared/components/Task';
import Modal from '../shared/components/Modal/Modal';
import EditTask from '../shared/components/EditTask';
import AddTask from '../shared/components/AddTask';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

const SortableTask = SortableElement(({ task, taskType, handleCheckboxChange, openEditTaskModal }) => {
    return (
        <Task
            task={ task }
            taskType={ taskType }
            handleCheckboxChange={ handleCheckboxChange }
            openEditTaskModal={ openEditTaskModal } />
    );
});

const SortableTasks = SortableContainer(({ tasks, taskType, handleCheckboxChange, openEditTaskModal }) => {
    return (
        <div>
            { tasks.map((task, index) => (
                <SortableTask
                    key={ task.ID }
                    index={ index }
                    task={ task }
                    taskType={ taskType }
                    handleCheckboxChange={ handleCheckboxChange }
                    openEditTaskModal={ openEditTaskModal } />
            )) }
        </div>
    );
});

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
    
    const editTask = () => {
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
            return 0;
        } else if (taskOne.isDone) {
            return 1;
        } else {
            return -1;
        }
    }

    const [ isAddTaskModalOpen, setIsAddTaskModalOpen ] = useState(false);
    const [ addTaskType, setAddTaskType ] = useState('');
    const addTask = (taskText) => {
        let ID = JSON.parse(localStorage.getItem('ID'));
        ID += 1;
        const task = { ID, task: taskText, isDone: false };

        let cloneTasks = JSON.parse(JSON.stringify(tasks));
        cloneTasks[ addTaskType ].push(task);

        setTasks(cloneTasks);
        localStorage.setItem('tasks', JSON.stringify(cloneTasks));
        localStorage.setItem('ID', JSON.stringify(ID));
        toggleAddTaskModal();
    }

    const toggleAddTaskModal = (taskType) => {
        setIsAddTaskModalOpen(previousIsAddTaskModalOpen => {
            if (previousIsAddTaskModalOpen === false) {
                setAddTaskType(taskType);
                return true;
            } else {
                setAddTaskType('');
                return false;
            }
        });
    }

    const onSortEnd = ({ oldIndex, newIndex, taskType }) => {
        setTasks(previousTasks => {
            return {
                ...previousTasks,
                [ taskType ]: arrayMoveImmutable(previousTasks[ taskType ], oldIndex, newIndex),
            }
        });
    };

    return (
        <div>
            <Head>
                <title>app - productivity</title>
                <meta name="description" content="app - productivity" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />

                <div className="flex align-items-center justify-content-between">
                    <h2 className="font-size-2 font-weight-bold color-dark-blue">quick tasks</h2>

                    <button onClick={ () => toggleAddTaskModal('quickTasks') }>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="icon">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
                        </svg>
                    </button>
                </div>
                { tasks.quickTasks ? (
                    <SortableTasks
                        pressDelay={ 50 }
                        onSortEnd={ ({ oldIndex, newIndex }) => onSortEnd({ oldIndex, newIndex, taskType: 'quickTasks' }) }
                        tasks={ tasks.quickTasks.sort(sortTasks) }
                        taskType='quickTasks'
                        handleCheckboxChange={ handleCheckboxChange }
                        openEditTaskModal={ openEditTaskModal } />
                ) : (null) }

                <div className="flex align-items-center justify-content-between">
                    <h2 className="font-size-2 font-weight-bold color-dark-blue">priority 1</h2>

                    <button onClick={ () => toggleAddTaskModal('firstPriority') }>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="icon">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
                        </svg>
                    </button>
                </div>
                { tasks.firstPriority ? (
                    <SortableTasks
                        pressDelay={ 50 }
                        onSortEnd={ ({ oldIndex, newIndex }) => onSortEnd({ oldIndex, newIndex, taskType: 'firstPriority' }) }
                        tasks={ tasks.firstPriority.sort(sortTasks) }
                        taskType='firstPriority'
                        handleCheckboxChange={ handleCheckboxChange }
                        openEditTaskModal={ openEditTaskModal } />
                ) : (null) }

                <div className="flex align-items-center justify-content-between">
                    <h2 className="font-size-2 font-weight-bold color-dark-blue">priority 2</h2>

                    <button onClick={ () => toggleAddTaskModal('secondPriority') }>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="icon">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
                        </svg>
                    </button>
                </div>
                { tasks.secondPriority ? (
                    <SortableTasks
                        pressDelay={ 50 }
                        onSortEnd={ ({ oldIndex, newIndex }) => onSortEnd({ oldIndex, newIndex, taskType: 'secondPriority' }) }
                        tasks={ tasks.secondPriority.sort(sortTasks) }
                        taskType='secondPriority'
                        handleCheckboxChange={ handleCheckboxChange }
                        openEditTaskModal={ openEditTaskModal } />
                ) : (null) }

                { isEditTaskModalOpen ? (
                    <Modal isOpen={ isEditTaskModalOpen }>
                        <EditTask
                            taskToEdit={ taskToEdit }
                            setTaskToEdit={ setTaskToEdit }
                            handleSubmit={ editTask }
                            toggleEditTaskModal={ toggleEditTaskModal }
                            deleteTask={ deleteTask } />
                    </Modal>
                ) : (null) }

                { isAddTaskModalOpen ? (
                    <Modal isOpen={ isAddTaskModalOpen }>
                        <AddTask
                            handleSubmit={ addTask }
                            toggleAddTaskModal={ toggleAddTaskModal } />
                    </Modal>
                ) : (null) }
            </div>
        </div>
    );
}
