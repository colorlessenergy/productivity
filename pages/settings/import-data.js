import Head from 'next/head';
import Link from 'next/link';

import Nav from '../../shared/components/Nav';
import Toast from '../../shared/components/Toast';
import useToast from '../../shared/hooks/useToast';

const ImportData = () => {
    const importData = event => {
        addToast('importing');
        const reader = new FileReader();
        reader.onload = event => {
            const importedData = JSON.parse(event.target.result);

            const importedStreak = JSON.parse(importedData.streak);
            const streak = JSON.parse(localStorage.getItem('streak'));
            for (const date in importedStreak) {
                streak[date] = importedStreak[date];
            }
            localStorage.setItem('streak', JSON.stringify(streak));

            const importedTaskCount = JSON.parse(importedData.taskCount);
            const taskCount = JSON.parse(localStorage.getItem('taskCount'));
            for (const task in importedTaskCount) {
                if (taskCount[task]) {
                    taskCount[task] += importedTaskCount[task];
                } else {
                    taskCount[task] = importedTaskCount[task];
                }
            }
            localStorage.setItem('taskCount', JSON.stringify(taskCount));

            addToast('done importing');
        };

        reader.readAsText(event.target.files[0]);
    };

    const setValueToNull = event => {
        event.target.value = null;
    };

    const { toast, addToast } = useToast();

    return (
        <div>
            <Head>
                <title>import data - productivity</title>
                <meta name="description" content="import data - productivity" />
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

                <h1 className="m-0 mb-1 font-size-4">import data</h1>

                <p className="mb-2 font-size-1">import stats</p>

                <label
                    htmlFor="import-data"
                    title="import data"
                    className="button background-color-purple color-white d-inline-block text-center cursor-pointer"
                >
                    import
                </label>
                <input
                    type="file"
                    id="import-data"
                    accept=".json"
                    onChange={importData}
                    onClick={setValueToNull}
                    className="d-none"
                />
            </div>

            <Toast toast={toast} />
        </div>
    );
};

export default ImportData;
