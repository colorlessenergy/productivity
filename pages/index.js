import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Nav from '../shared/components/Nav';
import First from '../shared/components/Forms/First';
import Second from '../shared/components/Forms/Second';
import Third from '../shared/components/Forms/Third';
import Fourth from '../shared/components/Forms/Fourth';

export default function Home () {
    const [ tasks, setTasks ] = useState({
        allTasks: [],
        quickTasks: [],
        firstPriority: [],
        secondPriority: []
    });

    const router = useRouter(); 

    useEffect(() => {
        let tasks = localStorage.getItem('tasks');
        if (!tasks) return;
        tasks = JSON.parse(tasks);
        const taskTypes = ['quickTasks', 'firstPriority', 'secondPriority'];
        for (let i = 0; i < taskTypes.length; i++) {
            for (let j = 0; j < tasks[taskTypes[ i ]].length; j++ ) {
                if (tasks[ taskTypes[i] ][ j ].isDone === false) return router.replace('/app');
            }
        }
    }, []);

    const [ formPart, setFormPart ] = useState(0);
    useEffect(() => {
        if (formPart === 'done') {
            localStorage.setItem('visitedCelebrationPage', JSON.stringify(false));
            localStorage.setItem('tasks', JSON.stringify(tasks));
            router.replace('/app')
        }
    }, [ formPart ]);

    return (
        <div>
            <Head>
                <title>questions - productivity</title>
                <meta name="description" content="questions - productivity" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />
                { formPart === 0 ? (
                    <First
                        setTasks={ setTasks }
                        setFormPart={ setFormPart } />
                ) : (null) }


                { formPart === 1 ? (
                    <Second
                        tasks={ tasks.allTasks }
                        setTasks={ setTasks }
                        setFormPart={ setFormPart } />
                ) : (null) }

                { formPart === 2 ? (
                    <Third
                        tasks={ tasks.allTasks }
                        setTasks={ setTasks }
                        setFormPart={ setFormPart } />
                ) : (null) }

                { formPart === 3 ? (
                    <Fourth
                        tasks={ tasks.allTasks }
                        setTasks={ setTasks }
                        setFormPart={ setFormPart } />
                ) : (null) }
            </div>
        </div>
    );
}
