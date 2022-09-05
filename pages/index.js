import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Nav from '../shared/components/Nav';
import Task from '../shared/components/Task';
import Modal from '../shared/components/Modal/Modal';
import EditTask from '../shared/components/EditTask';
import AddTask from '../shared/components/AddTask';
import {
    addTaskToLocalStorage,
    areAllTasksDone,
    editTaskInLocalStorage,
    initializeTasks
} from '../shared/utils/task';

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
        initializeTasks();

        setTasks(JSON.parse(localStorage.getItem('tasks')));
    }, []);

    const router = useRouter();
    useEffect(() => {
        if (areAllTasksDone(tasks)) {
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
        const updatedTasks = editTaskInLocalStorage({ ...taskToEdit });
        setTasks(updatedTasks);

        toggleEditTaskModal();
    };

    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [addTaskType, setAddTaskType] = useState('');
    const addTask = taskText => {
        const updatedTasks = addTaskToLocalStorage({
            taskText,
            taskType: addTaskType
        });
        setTasks(updatedTasks);
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
            previousTasks[taskType] = previousTasks[taskType].sort(sortTasks);

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

    const sortTasks = (taskOne, taskTwo) => {
        if (taskOne.isDone === taskTwo.isDone) {
            return 0;
        } else if (taskOne.isDone) {
            return 1;
        } else {
            return -1;
        }
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
                    <h2 className="flex align-items-center font-size-2 font-weight-bold color-dark-blue">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="icon mr-1"
                        >
                            <path d="M19 20H5v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-9l2.513-6.702A2 2 0 0 1 6.386 4h11.228a2 2 0 0 1 1.873 1.298L22 12v9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1zM4.136 12h15.728l-2.25-6H6.386l-2.25 6zM6.5 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                        </svg>{' '}
                        quick tasks
                    </h2>

                    <div>
                        <button
                            onClick={() => toggleAddTaskModal('quickTasks')}
                            title="add quick task"
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
                        tasks={JSON.parse(
                            JSON.stringify(tasks.quickTasks)
                        ).sort(sortTasks)}
                        taskType="quickTasks"
                        setTasks={setTasks}
                        openEditTaskModal={openEditTaskModal}
                    />
                ) : null}

                <div className="flex align-items-center justify-content-between">
                    <h2 className="flex align-items-center font-size-2 font-weight-bold color-dark-blue">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="icon mr-1"
                        >
                            <path d="M17 8h3l3 4.056V18h-2.035a3.5 3.5 0 0 1-6.93 0h-5.07a3.5 3.5 0 0 1-6.93 0H1V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2zm0 2v3h4v-.285L18.992 10H17z" />
                        </svg>{' '}
                        medium tasks
                    </h2>

                    <div>
                        <button
                            onClick={() => toggleAddTaskModal('mediumTasks')}
                            title="add medium task"
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
                {tasks.mediumTasks ? (
                    <SortableTasks
                        distance={1}
                        lockAxis="y"
                        useWindowAsScrollContainer={true}
                        onSortEnd={({ oldIndex, newIndex }) =>
                            onSortEnd({
                                oldIndex,
                                newIndex,
                                taskType: 'mediumTasks'
                            })
                        }
                        tasks={JSON.parse(
                            JSON.stringify(tasks.mediumTasks)
                        ).sort(sortTasks)}
                        taskType="mediumTasks"
                        setTasks={setTasks}
                        openEditTaskModal={openEditTaskModal}
                    />
                ) : null}

                <div className="flex align-items-center justify-content-between">
                    <h2 className="flex align-items-center font-size-2 font-weight-bold color-dark-blue">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="icon mr-1"
                        >
                            <path d="M9 4h5.446a1 1 0 0 1 .848.47L18.75 10h4.408a.5.5 0 0 1 .439.74l-3.937 7.217A4.992 4.992 0 0 1 15 16 4.992 4.992 0 0 1 11 18a4.992 4.992 0 0 1-4-2 4.992 4.992 0 0 1-4.55 1.97l-1.236-6.791A1 1 0 0 1 2.198 10H3V5a1 1 0 0 1 1-1h1V1h4v3zm-4 6h11.392l-2.5-4H5v4zM3 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 11 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 19 20h2v2h-2a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 11 22a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 3 22H1v-2h2z" />
                        </svg>{' '}
                        large tasks
                    </h2>

                    <div>
                        <button
                            onClick={() => toggleAddTaskModal('largeTasks')}
                            title="add large task"
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
                {tasks.largeTasks ? (
                    <SortableTasks
                        distance={1}
                        lockAxis="y"
                        useWindowAsScrollContainer={true}
                        onSortEnd={({ oldIndex, newIndex }) =>
                            onSortEnd({
                                oldIndex,
                                newIndex,
                                taskType: 'largeTasks'
                            })
                        }
                        tasks={JSON.parse(
                            JSON.stringify(tasks.largeTasks)
                        ).sort(sortTasks)}
                        taskType="largeTasks"
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
