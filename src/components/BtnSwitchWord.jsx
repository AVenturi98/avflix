import { useState } from "react";

export default function BtnSwitchWord({ text1, text2, set1, set2, styleSelected, flex }) {
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
                {text1}
            </button>
            <button
                className={`cursor-pointer py-2 px-4 text-lg rounded-md uppercase transition-all duration-300 ${selectedWord === text2
                    ? `${styleSelected} scale-101`
                    : "bg-transparent  hover:bg-gray-400"
                    }`}
                onClick={() => { handleClick(text2), set2() }}
            >
                {text2}
            </button>
        </div>
    );
}