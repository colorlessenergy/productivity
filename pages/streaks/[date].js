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

            if (!streak[date]) {
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
                <p className="font-size-1">{date}</p>

                {streak ? (
                    <div className="mb-2">
                        <h2 className="font-size-2">quick tasks</h2>
                        <div className="flex flex-wrap font-size-1">
                            {streak.quickTasks &&
                                streak.quickTasks.map((task, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="previous-task"
                                        >
                                            {task.task}
                                        </div>
                                    );
                                })}
                        </div>

                        <h2 className="font-size-2">medium tasks</h2>
                        <div className="flex flex-wrap font-size-1">
                            {streak.mediumTasks &&
                                streak.mediumTasks.map((task, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="previous-task"
                                        >
                                            {task.task}
                                        </div>
                                    );
                                })}
                        </div>

                        <h2 className="font-size-2">large tasks</h2>
                        <div className="flex flex-wrap font-size-1">
                            {streak.largeTasks &&
                                streak.largeTasks.map((task, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="previous-task"
                                        >
                                            {task.task}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                ) : (
                    <p className="font-size-3">
                        Nothing was recorded on this day.
                    </p>
                )}
            </div>
        </div>
    );
}
