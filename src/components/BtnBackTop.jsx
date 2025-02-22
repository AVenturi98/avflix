import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export default function BtnBackTop() {

    const [scroll, setScroll] = useState(false)

    window.onscroll = function () { functionScroll() }

    function functionScroll() {
        if (document.documentElement.scrollTop <= 500) {
            btn_top.style.display = 'none'
        } else if (document.documentElement.scrollTop >= 500) {
            btn_top.style.display = 'block'
        }
    }

    function ScrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    return (
        <div id="btn_top" className={`${scroll ? 'block' : ''} hidden fixed bottom-10 right-10 text-4xl cursor-pointer text-sky-950 hover:text-green-50`} onClick={ScrollToTop}>
            <FontAwesomeIcon icon={faArrowAltCircleUp} className="bg-green-500 rounded-full" />
        </div>
    )
}