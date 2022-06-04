import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import Nav from '../shared/components/Nav';
import Confetti from 'react-confetti';

export default function Celebration() {
    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.quickTasks = tasks.quickTasks.map(task => ({
            ...task,
            isDone: false
        }));

        tasks.firstPriority = tasks.firstPriority.map(task => ({
            ...task,
            isDone: false
        }));

        tasks.secondPriority = tasks.secondPriority.map(task => ({
            ...task,
            isDone: false
        }));

        localStorage.setItem('tasks', JSON.stringify(tasks));

        let streak = JSON.parse(localStorage.getItem('streak'));

        const date = new Date();
        const formatDate = `${
            date.getMonth() + 1
        }-${date.getDate()}-${date.getFullYear()}`;

        streak[formatDate] = 1;
        localStorage.setItem('streak', JSON.stringify(streak));
    }, []);

    return (
        <div>
            <Head>
                <title>celebration - productivity</title>
                <meta
                    name="description"
                    content="congratulations you finished all your tasks"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <Nav />

                <div className="text-center">
                    <h1 className="mb-1 font-size-4">yay you did it!</h1>

                    <p className="mb-1 font-size-2">
                        you finished all your tasks 😎
                    </p>

                    <Image
                        src="/assets/gifs/elmo.webp"
                        alt="celebration gif"
                        height={360}
                        width={480}
                    />

                    <div>
                        <Link href="/">
                            <a className="button background-color-yellow color-black d-inline-block mt-1">
                                return to tasks
                            </a>
                        </Link>
                    </div>
                </div>

                {typeof window !== 'undefined' ? (
                    <Confetti
                        height={window.innerHeight}
                        width={window.innerWidth}
                    />
                ) : null}
            </div>
        </div>
    );
}
