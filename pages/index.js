import { useState } from 'react';
import Head from 'next/head';

import Nav from '../shared/components/Nav';
import First from '../shared/components/Forms/First';
import Second from '../shared/components/Forms/Second';
import Third from '../shared/components/Forms/Third';

export default function Home () {
    const [ tasks, setTasks ] = useState({
        allTasks: [],
        quickTasks: [],
        firstPriority: [],
        secondPriority: []
    });

    const [ formPart, setFormPart ] = useState(0);
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
            </div>
        </div>
    );
}
