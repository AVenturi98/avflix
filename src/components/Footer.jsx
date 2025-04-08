import * as React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import GlobalContext from "../context/GlobalContext";

export default function Footer() {
    const { theme } = React.useContext(GlobalContext);
    return (
        <>
            <div className={`border-t-4 ${theme === 'dark' ? 'border-sky-500' : 'border-sky-950'} text-center py-4`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-sky-500' : 'text-sky-950'}`}>
                    <FontAwesomeIcon icon={faCopyright} className="mr-2" />
                    <span> AVi studios. All rights reserved </span>
                </p>
                <br />
                <a href="https://github.com/AVenturi98" className="hover:underline">
                    <p className="text-gray-500">Create by <span className={theme === 'dark' ? 'text-sky-500' : "text-sky-950"}>AVi</span></p>
                </a>

            </div>
        </>
    )
}