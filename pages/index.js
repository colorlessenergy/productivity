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

const SortableTask = SortableElement(
    ({ task, taskType, setTasks, openEditTaskModal }) => {
        return (
            <Task
                task={task}
                taskType={taskType}
                setTasks={setTasks}
                openEditTaskModal={openEditTaskModal}
            />
        );
    }
);

const SortableTasks = SortableContainer(
    ({ tasks, taskType, setTasks, openEditTaskModal }) => {
        return (
            <div className="tasks-container">
                {tasks.map((task, index) => (
                    <SortableTask
                        key={task.ID}
                        index={index}
                        task={task}
                        taskType={taskType}
                        setTasks={setTasks}
                        openEditTaskModal={openEditTaskModal}
                    />
                ))}
            </div>
        );
    }
);

export default function App() {
    const [tasks, setTasks] = useState({});
    useEffect(() => {
        if (!localStorage.getItem('tasks')) {
            localStorage.setItem(
                'tasks',
                JSON.stringify({
                    quickTasks: [{ ID: 1, task: 'drink water', isDone: false }],
                    firstPriority: [
                        { ID: 2, task: 'create grocery list', isDone: false }
                    ],
                    secondPriority: [{ ID: 3, task: 'read', isDone: false }]
                })
            );
        }

        setTasks(JSON.parse(localStorage.getItem('tasks')));
    }, []);

    const router = useRouter();
    useEffect(() => {
        if (
            (!tasks.quickTasks &&
                !tasks.firstPriority &&
                !tasks.secondPriority) ||
            JSON.parse(localStorage.getItem('visitedCelebrationPage'))
        )
            return;

        if (
            tasks.quickTasks.filter(task => task.isDone === false).length ===
                0 &&
            tasks.firstPriority.filter(task => task.isDone === false).length ===
                0 &&
            tasks.secondPriority.filter(task => task.isDone === false)
                .length === 0
        ) {
            localStorage.setItem(
                'visitedCelebrationPage',
                JSON.stringify(true)
            );
            router.replace('/celebration');
        }
    }, [tasks]);

    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const toggleEditTaskModal = () => {
        setIsEditTaskModalOpen(
            previousIsEditTaskModalOpen => !previousIsEditTaskModalOpen
        );
    };

    const [taskToEdit, setTaskToEdit] = useState({});
    const openEditTaskModal = ({ task, taskType }) => {
        toggleEditTaskModal();
        setTaskToEdit({ ...task, taskType });
    };

    const editTask = () => {
        const cloneTasks = JSON.parse(JSON.stringify(tasks));
        const taskIndex = cloneTasks[taskToEdit.taskType].findIndex(
            task => task.ID === taskToEdit.ID
        );
        cloneTasks[taskToEdit.taskType][taskIndex] = {
            ID: taskToEdit.ID,
            isDone: taskToEdit.isDone,
            task: taskToEdit.task
        };
        setTasks(cloneTasks);
        localStorage.setItem('tasks', JSON.stringify(cloneTasks));

        toggleEditTaskModal();
    };

    const sortTasks = (taskOne, taskTwo) => {
        if (taskOne.isDone === taskTwo.isDone) {
            return 0;
        } else if (taskOne.isDone) {
            return 1;
        } else {
            return -1;
        }
    };

    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [addTaskType, setAddTaskType] = useState('');
    const addTask = taskText => {
        let ID = JSON.parse(localStorage.getItem('ID'));
        ID += 1;
        const task = { ID, task: taskText, isDone: false };

        let cloneTasks = JSON.parse(JSON.stringify(tasks));
        cloneTasks[addTaskType].push(task);

        setTasks(cloneTasks);
        localStorage.setItem('tasks', JSON.stringify(cloneTasks));
        localStorage.setItem('ID', JSON.stringify(ID));
        toggleAddTaskModal();
    };

    const toggleAddTaskModal = taskType => {
        setIsAddTaskModalOpen(previousIsAddTaskModalOpen => {
            if (previousIsAddTaskModalOpen === false) {
                setAddTaskType(taskType);
                return true;
            } else {
                setAddTaskType('');
                return false;
            }
        });
    };

    const onSortEnd = ({ oldIndex, newIndex, taskType }) => {
        setTasks(previousTasks => {
            const tasks = {
                ...previousTasks,
                [taskType]: arrayMoveImmutable(
                    previousTasks[taskType],
                    oldIndex,
                    newIndex
                )
            };

            localStorage.setItem('tasks', JSON.stringify(tasks));
            return tasks;
        });
    };

    const resetTasks = type => {
        let taskCount = JSON.parse(localStorage.getItem('taskCount'));
        let cloneTasks = JSON.parse(JSON.stringify(tasks));

        cloneTasks[type] = cloneTasks[type].map(task => {
            const taskText = task.task.toLowerCase().trim();
            if (task.isDone) {
                taskCount[taskText] -= 1;
            }

            return {
                ...task,
                isDone: false
            };
        });

        localStorage.setItem('taskCount', JSON.stringify(taskCount));
        setTasks(cloneTasks);
        localStorage.setItem('tasks', JSON.stringify(cloneTasks));
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
                    <h2 className="font-size-2 font-weight-bold color-dark-blue">
                        quick tasks
                    </h2>

                    <div>
                        <button
                            onClick={() => resetTasks('quickTasks')}
                            title="reset quick tasks"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="icon"
                            >
                                <path d="M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => toggleAddTaskModal('quickTasks')}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="icon"
                            >
                                <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {tasks.quickTasks ? (
                    <SortableTasks
                        distance={1}
                        lockAxis="y"
                        useWindowAsScrollContainer={true}
                        onSortEnd={({ oldIndex, newIndex }) =>
                            onSortEnd({
                                oldIndex,
                                newIndex,
                                taskType: 'quickTasks'
                            })
                        }
                        tasks={tasks.quickTasks.sort(sortTasks)}
                        taskType="quickTasks"
                        setTasks={setTasks}
                        openEditTaskModal={openEditTaskModal}
                    />
                ) : null}

                <div className="flex align-items-center justify-content-between">
                    <h2 className="font-size-2 font-weight-bold color-dark-blue">
                        priority 1
                    </h2>

                    <div>
                        <button
                            onClick={() => resetTasks('firstPriority')}
                            title="reset priority 1 tasks"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="icon"
                            >
                                <path d="M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z" />
                            </svg>
                        </button>

                        <button
                            onClick={() => toggleAddTaskModal('firstPriority')}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="icon"
                            >
                                <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {tasks.firstPriority ? (
                    <SortableTasks
                        distance={1}
                        lockAxis="y"
                        useWindowAsScrollContainer={true}
                        onSortEnd={({ oldIndex, newIndex }) =>
                            onSortEnd({
                                oldIndex,
                                newIndex,
                                taskType: 'firstPriority'
                            })
                        }
                        tasks={tasks.firstPriority.sort(sortTasks)}
                        taskType="firstPriority"
                        setTasks={setTasks}
                        openEditTaskModal={openEditTaskModal}
                    />
                ) : null}

                <div className="flex align-items-center justify-content-between">
                    <h2 className="font-size-2 font-weight-bold color-dark-blue">
                        priority 2
                    </h2>

                    <div>
                        <button
                            onClick={() => resetTasks('secondPriority')}
                            title="reset priority 2 tasks"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="icon"
                            >
                                <path d="M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z" />
                            </svg>
                        </button>

                        <button
                            onClick={() => toggleAddTaskModal('secondPriority')}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="icon"
                            >
                                <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {tasks.secondPriority ? (
                    <SortableTasks
                        distance={1}
                        lockAxis="y"
                        useWindowAsScrollContainer={true}
                        onSortEnd={({ oldIndex, newIndex }) =>
                            onSortEnd({
                                oldIndex,
                                newIndex,
                                taskType: 'secondPriority'
                            })
                        }
                        tasks={tasks.secondPriority.sort(sortTasks)}
                        taskType="secondPriority"
                        setTasks={setTasks}
                        openEditTaskModal={openEditTaskModal}
                    />
                ) : null}

                {isEditTaskModalOpen ? (
                    <Modal isOpen={isEditTaskModalOpen}>
                        <EditTask
                            taskToEdit={taskToEdit}
                            setTaskToEdit={setTaskToEdit}
                            handleSubmit={editTask}
                            toggleEditTaskModal={toggleEditTaskModal}
                        />
                    </Modal>
                ) : null}

                {isAddTaskModalOpen ? (
                    <Modal isOpen={isAddTaskModalOpen}>
                        <AddTask
                            handleSubmit={addTask}
                            toggleAddTaskModal={toggleAddTaskModal}
                        />
                    </Modal>
                ) : null}
            </div>
        </div>
    );
}
