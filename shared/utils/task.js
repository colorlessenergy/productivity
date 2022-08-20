export const initializeTasks = () => {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem(
            'tasks',
            JSON.stringify({
                quickTasks: [
                    {
                        ID: 1,
                        task: 'drink water',
                        isDone: false
                    }
                ],
                mediumTasks: [
                    {
                        ID: 2,
                        task: 'create grocery list',
                        isDone: false
                    }
                ],
                largeTasks: [{ ID: 3, task: 'read', isDone: false }]
            })
        );
    }
};

export const addTaskToLocalStorage = ({ taskText, taskType }) => {
    let ID = JSON.parse(localStorage.getItem('ID'));
    ID += 1;
    const task = { ID, task: taskText, isDone: false };

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[taskType].push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('ID', JSON.stringify(ID));

    return tasks;
};

export const editTaskInLocalStorage = ({ taskType, ID, task }) => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskIndex = tasks[taskType].findIndex(task => task.ID === ID);

    tasks[taskType][taskIndex] = {
        ...tasks[taskType][taskIndex],
        task: task.trim()
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));

    return tasks;
};

export const areAllTasksDone = tasks => {
    return (
        tasks.quickTasks.filter(task => task.isDone === false).length === 0 &&
        tasks.mediumTasks.filter(task => task.isDone === false).length === 0 &&
        tasks.largeTasks.filter(task => task.isDone === false).length === 0
    );
};
