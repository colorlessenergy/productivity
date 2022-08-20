import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Streak = () => {
    const [streak, setStreak] = useState({});
    useEffect(() => {
        setStreak(JSON.parse(localStorage.getItem('streak')));
    }, []);

    const streakForMonth = () => {
        const date = new Date();
        const amountOfDays = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        const days = [];
        for (let i = 0; i < amountOfDays; i++) {
            const formatDate = `${date.getMonth() + 1}-${
                i + 1
            }-${date.getFullYear()}`;

            if (streak[formatDate]) {
                days[i] = formatDate;
                continue;
            }

            days[i] = false;
        }

        return days;
    };

    const date = new Date();
    const monthName = date.toLocaleString('en-US', { month: 'long' });

    return (
        <React.Fragment>
            <h2 className="mb-1 font-size-3">streak</h2>

            <p className="mb-2 font-size-1">
                total amount of days:{' '}
                <span className="font-weight-bold">
                    {Object.keys(streak).length}
                </span>
            </p>

            <div className="mb-1 font-size-1">{monthName}</div>

            <div className="streak">
                {streakForMonth().map((day, index) => {
                    if (day) {
                        return (
                            <Link key={index} href={`streaks/${day}`}>
                                <a className="streak-circle streak-circle-active"></a>
                            </Link>
                        );
                    }

                    return <div key={index} className="streak-circle"></div>;
                })}
            </div>
        </React.Fragment>
    );
};

export default Streak;
