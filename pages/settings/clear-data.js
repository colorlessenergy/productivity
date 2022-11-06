import Head from 'next/head';

import Nav from '../../shared/components/Nav';

const ClearData = () => {
    const clearData = () => {
        localStorage.setItem('ID', JSON.stringify(0));
        localStorage.setItem('tasks', JSON.stringify({}));
        localStorage.setItem('streak', JSON.stringify({}));
        localStorage.setItem('taskCount', JSON.stringify({}));
    };

    return (
        <div>
            <Head>
                <title>clear data - productivity</title>
                <meta name="description" content="clear data - productivity" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />

                <h1 className="m-0 mb-1 font-size-4">clear data</h1>

                <p className="mb-2 font-size-1">clear tasks and stats</p>

                <button
                    onClick={clearData}
                    title="clear data"
                    className="button background-color-dark-red color-white"
                >
                    clear
                </button>
            </div>
        </div>
    );
};

export default ClearData;
