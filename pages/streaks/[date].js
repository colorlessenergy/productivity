import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Nav from '../../shared/components/Nav';

export default function Streaks() {
    const [streak, setStreak] = useState([]);
    const router = useRouter();

    const date = router.query.date;

    useEffect(() => {
        if (date) {
            let streak = JSON.parse(localStorage.getItem('streak'));

            if (!streak[date] || !Array.isArray(streak[date])) {
                setStreak(null);
            } else {
                setStreak(streak[date]);
            }
        }
    }, [date]);

    return (
        <div>
            <Head>
                <title>previous tasks - productivity</title>
                <meta name="description" content="previous tasks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <Nav />

                <h1 className="mb-1 font-size-4">previous tasks</h1>
                <p className="mb-3 font-size-1">{date}</p>

                {streak ? (
                    streak.map((tasks, index) => {
                        return (
                            <div
                                key={index}
                                className="task p-1 mb-2 position-relative"
                            >
                                <div className="font-size-2 task-list-header">
                                    task list {index + 1}
                                </div>
                                <h2 className="font-size-2">quick tasks</h2>
                                <ul className="font-size-1">
                                    {tasks.quickTasks.map((task, index) => {
                                        return <li key={index}>{task.task}</li>;
                                    })}
                                </ul>

                                <h2 className="font-size-2">medium tasks</h2>

                                <ul className="font-size-1">
                                    {tasks.mediumTasks.map((task, index) => {
                                        return <li key={index}>{task.task}</li>;
                                    })}
                                </ul>

                                <h2 className="font-size-2">large tasks</h2>

                                <ul className="font-size-1">
                                    {tasks.largeTasks.map((task, index) => {
                                        return <li key={index}>{task.task}</li>;
                                    })}
                                </ul>
                            </div>
                        );
                    })
                ) : (
                    <p className="font-size-3">
                        Nothing was recorded on this day.
                    </p>
                )}
            </div>
        </div>
    );
}
