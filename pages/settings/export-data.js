import Head from 'next/head';
import Link from 'next/link';

import Nav from '../../shared/components/Nav';

const ExportData = () => {
    const exportData = () => {
        const streak = localStorage.getItem('streak');
        const taskCount = localStorage.getItem('taskCount');

        const data = {
            streak,
            taskCount
        };

        const filename = 'productivity-data.json';
        const JSONString = JSON.stringify(data);
        let anchorElement = document.createElement('a');
        anchorElement.setAttribute(
            'href',
            'data:text/plain;charset=utf-8,' + encodeURIComponent(JSONString)
        );
        anchorElement.setAttribute('download', filename);
        anchorElement.style.display = 'none';
        document.body.appendChild(anchorElement);
        anchorElement.click();
        document.body.removeChild(anchorElement);
    };

    return (
        <div>
            <Head>
                <title>export data - productivity</title>
                <meta name="description" content="export data - productivity" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />

                <Link href="/settings">
                    <a className="flex color-blue">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="arrow-icon fill-blue"
                        >
                            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                        </svg>{' '}
                        return to settings
                    </a>
                </Link>

                <h1 className="m-0 mb-1 font-size-4">export data</h1>

                <p className="mb-2 font-size-1">export stats</p>

                <button
                    onClick={exportData}
                    title="export data"
                    className="button background-color-yellow"
                >
                    export
                </button>
            </div>
        </div>
    );
};

export default ExportData;
