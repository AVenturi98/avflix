import * as React from 'react';
import GlobalContext from '../context/GlobalContext';

export default function BtnDarkMode() {

    const { theme, setTheme } = React.useContext(GlobalContext);

    return (
        <>
            <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
        </>
    )
}