import Head from 'next/head';

import Nav from '../shared/components/Nav';
import Streak from '../shared/components/Streak';
import TaskCount from '../shared/components/TaskCount';

const Stats = () => {
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

                <TaskCount />
            </div>
        </div>
    );
};

export default Stats;
