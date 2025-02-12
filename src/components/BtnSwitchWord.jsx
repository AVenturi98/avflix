import { useState } from "react";

export default function BtnSwitchWord({ text1, text2, set1, set2 }) {
    const [selectedWord, setSelectedWord] = useState(text1);

    const handleClick = (word) => {
        setSelectedWord(word);
    };

    return (
        <div className="flex justify-center gap-10 p-10">
            <span
                className={`cursor-pointer py-2 px-4 text-lg rounded-md uppercase transition-all duration-300 ${selectedWord === text1
                    ? "bg-green-500 text-white scale-110"
                    : "bg-transparent text-white hover:bg-gray-400"
                    }`}
                onClick={() => { handleClick(text1), set1() }}
            >
                {text1}
            </span>
            <span
                className={`cursor-pointer py-2 px-4 text-lg rounded-md uppercase transition-all duration-300 ${selectedWord === text2
                    ? "bg-green-500 text-white scale-110"
                    : "bg-transparent text-white hover:bg-gray-400"
                    }`}
                onClick={() => { handleClick(text2), set2() }}
            >
                {text2}
            </span>
        </div>
    );
}