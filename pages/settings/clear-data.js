import Head from 'next/head';
import { useState } from 'react';

import Nav from '../../shared/components/Nav';
import Toast from '../../shared/components/Toast';
import useToast from '../../shared/hooks/useToast';

const ClearData = () => {
    const clearData = () => {
        if (form.tasks) {
            localStorage.setItem('ID', JSON.stringify(0));
            localStorage.setItem('tasks', JSON.stringify({}));
        }

        if (form.streak) {
            localStorage.setItem('streak', JSON.stringify({}));
        }

        if (form.taskCount) {
            localStorage.setItem('taskCount', JSON.stringify({}));
        }

        addToast('data cleared');
    };

    const { toast, addToast } = useToast();

    const [form, setForm] = useState({
        tasks: true,
        streak: true,
        taskCount: true
    });

    const handleOnChange = event => {
        setForm(previousForm => ({
            ...previousForm,
            [event.target.id]: !previousForm[event.target.id]
        }));
    };

    return (
        <div>
            <Head>
                <title>clear data - productivity</title>
                <meta name="description" content="clear data - productivity" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />

                <h1 className="m-0 mb-1 font-size-4">clear data</h1>

                <p className="mb-1 font-size-1">clear tasks and stats</p>

                <form className="mb-1">
                    <input
                        type="checkbox"
                        onChange={handleOnChange}
                        className="d-none"
                        id="tasks"
                        checked={form.tasks}
                    />
                    <label
                        className="flex align-items-center p-1 pl-0 cursor-pointer font-size-2"
                        htmlFor="tasks"
                    >
                        <span className="checkbox mr-1"></span>
                        tasks
                    </label>

                    <input
                        type="checkbox"
                        onChange={handleOnChange}
                        className="d-none"
                        id="streak"
                        checked={form.streak}
                    />
                    <label
                        className="flex align-items-center p-1 pl-0 cursor-pointer font-size-2"
                        htmlFor="streak"
                    >
                        <span className="checkbox mr-1"></span>
                        streak
                    </label>

                    <input
                        type="checkbox"
                        onChange={handleOnChange}
                        className="d-none"
                        id="taskCount"
                        checked={form.taskCount}
                    />

                    <label
                        className="flex align-items-center p-1 pl-0 cursor-pointer font-size-2"
                        htmlFor="taskCount"
                    >
                        <span className="checkbox mr-1"></span>
                        task count
                    </label>
                </form>

                <button
                    onClick={clearData}
                    disabled={!form.tasks && !form.streak && !form.taskCount}
                    title="clear data"
                    className="button background-color-dark-red color-white"
                >
                    clear
                </button>
            </div>

            <Toast toast={toast} />
        </div>
    );
};

export default ClearData;
