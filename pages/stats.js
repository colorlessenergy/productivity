import { useEffect, useState } from 'react';
import Head from 'next/head';

import Nav from '../shared/components/Nav';
import Streak from '../shared/components/Streak';

const Stats = () => {
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
        <div>
            <Head>
                <title>stats - productivity</title>
                <meta name="description" content="stats - productivity" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />

                <h1 className="m-0 font-size-4">stats</h1>

                <Streak />

                <h2 className="mb-1 font-size-3">task count</h2>

                <p className="mb-2 font-size-1">
                    total amount of tasks completed:{' '}
                    <span className="font-weight-bold">
                        {totalAmountOfTasksCompleted}
                    </span>
                </p>

                {Object.keys(taskCount)
                    .sort((a, b) => taskCount[b] - taskCount[a])
                    .map(taskCountKey => {
                        return (
                            <div
                                className="mb-1 font-size-2"
                                key={taskCountKey}
                            >
                                {taskCountKey} - {taskCount[taskCountKey]}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Stats;
