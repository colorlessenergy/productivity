import Head from 'next/head';

import Nav from '../shared/components/Nav';

export default function Home () {
    return (
        <div>
            <Head>
                <title>productivity</title>
                <meta name="description" content="productivity" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />
            </div>
        </div>
    );
}
