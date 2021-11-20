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

    const [ formPart, setFormPart ] = useState(0);

    const router = useRouter(); 
    useEffect(() => {
        if (formPart === 'done') {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            router.replace('/app')
        }
    }, [ formPart ]);

    return (
        <div>
            <Head>
                <title>productivity</title>
                <meta name="description" content="productivity" />
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
