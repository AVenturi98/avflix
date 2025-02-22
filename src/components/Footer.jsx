import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopyright } from "@fortawesome/free-solid-svg-icons"

export default function Footer() {
    return (
        <>
            <div className="border-t-4 border-sky-950 text-center py-4">
                <p className="text-sm text-sky-950">
                    <FontAwesomeIcon icon={faCopyright} className="mr-2" />
                    <span> AV studios. All rights reserved </span>
                </p>
                <br />
                <a href="https://github.com/AVenturi98" className="hover:underline">
                    <p className="text-gray-500">Made to <span className="text-sky-950">AV</span></p>
                </a>

            </div>
        </>
    )
}