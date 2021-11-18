import { useState } from 'react';
import Head from 'next/head';

import Nav from '../shared/components/Nav';
import First from '../shared/components/Forms/First';

export default function Home () {
    const [ tasks, setTasks ] = useState({
        allTasks: [],
        quickTasks: [],
        firstPriority: [],
        secondPriority: []
    });

    return (
        <div>
            <Head>
                <title>productivity</title>
                <meta name="description" content="productivity" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />

                <First setTasks={ setTasks } />
            </div>
        </div>
    );
}
