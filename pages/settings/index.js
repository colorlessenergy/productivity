import Head from 'next/head';

import Nav from '../../shared/components/Nav';
import SettingsItem from '../../shared/components/SettingsItem';

const Settings = () => {
    return (
        <div>
            <Head>
                <title>settings - productivity</title>
                <meta name="description" content="settings - productivity" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />

                <h1 className="m-0 mb-1 font-size-4">settings</h1>

                <SettingsItem text="export data" link="/settings/export-data" />

                <SettingsItem text="import data" link="/settings/import-data" />

                <SettingsItem text="clear data" link="/settings/clear-data" />
            </div>
        </div>
    );
};

export default Settings;
