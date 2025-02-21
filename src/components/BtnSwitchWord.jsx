import { useState } from "react";

/**
 * 
 * @param {testo primo btn} text1
 * @param {testo secondo btn} text2
 * @param {testo terzo btn} text3
 * @param {cambiamento primo btn} set1 
 * @param {cambiamento second btn} set2 
 * @param {cambiamento terzo btn} set3
 * @param {stile btn selzionato} styleSelected
 * @param {className} class
 * 
 * 
 * 
 * 
 *  
 * @returns 
 */

export default function BtnSwitchWord({ text1, text2, text3, length1, length2, length3, set1, set2, set3, styleSelected, flex }) {
    const [selectedWord, setSelectedWord] = useState(text1);

    const handleClick = (word) => {
        setSelectedWord(word);
    };

    return (
        <div className={`${flex}`}>
            <button
                className={`cursor-pointer py-2 px-4 text-lg rounded-md uppercase transition-all duration-300 ${selectedWord === text1
                    ? `${styleSelected} scale-101`
                    : "bg-transparent  hover:bg-gray-400"
                    }`}
                onClick={() => { handleClick(text1), set1() }}
            >
                {length1 ? text1 + ' (' + length1 + ')' : text1}
            </button>
            <button
                className={`cursor-pointer py-2 px-4 text-lg rounded-md uppercase transition-all duration-300 ${selectedWord === text2
                    ? `${styleSelected} scale-101`
                    : "bg-transparent  hover:bg-gray-400"
                    }`}
                onClick={() => { handleClick(text2), set2() }}
            >
                {length2 ? text2 + ' (' + length2 + ')' : text2}
            </button>

            {text3 &&
                <button
                    className={`cursor-pointer py-2 px-4 text-lg rounded-md uppercase transition-all duration-300 ${selectedWord === text3
                        ? `${styleSelected} scale-101`
                        : "bg-transparent  hover:bg-gray-400"
                        }`}
                    onClick={() => { handleClick(text3), set3() }}
                >
                    {length3 ? text3 + ' (' + length3 + ')' : text3}
                </button>
            }
        </div>
    );
}