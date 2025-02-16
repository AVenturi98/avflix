import { FlagIcon } from "react-flag-kit"

export default function Flags({ lang }) {

    // Control Languages
    function languages(language) {
        if (language === "en") return language = "GB"
        if (language === "ja") return language = "JP"
        if (language === "ko") return language = "KR"
        if (language === "cs") return language = "CZ"
        if (language === "zh") return language = "CN"
        if (language === "el") return language = "GR"
        if (language === "hi") return language = "US"
        if (language === "te") return language = "TG"
        if (language === "ta") return language = "IN"

        return language.toUpperCase()
    }

    return (
        <FlagIcon code={languages(lang)} />
    )
}