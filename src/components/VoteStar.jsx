import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as full } from "@fortawesome/free-solid-svg-icons"
import { faStar as empty } from "@fortawesome/free-regular-svg-icons"

export default function VoteStar({ vote = 0 }) {

    vote = Math.ceil(vote / 2)

    const stars = Array(5)

    for (let i = 0; i < stars.length; i++) {
        stars[i] = <FontAwesomeIcon key={i} icon={i < vote ? full : empty} style={{
            color: " #FFD43B ",
        }} />
    }

    return (
        <div>{stars}</div>
    )
}