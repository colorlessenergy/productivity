import { useEffect } from 'react';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if (!localStorage.getItem('taskCount')) {
            localStorage.setItem('taskCount', JSON.stringify({}));
        }

        if (!localStorage.getItem('ID')) {
            localStorage.setItem('ID', JSON.stringify(3));
        }

        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'light');
        }

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark');
        }
    }, []);

    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            'serviceWorker' in navigator &&
            window.workbox !== undefined
        ) {
            const wb = window.workbox;
            const installNewVersion = () => {
                wb.addEventListener('controlling', () => {
                    window.location.reload();
                });

                wb.messageSkipWaiting();
            };

            wb.addEventListener('waiting', installNewVersion);
            wb.register();
        }
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
