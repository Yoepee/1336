import { useState } from "react";

const Dice = () => {
    let [count, setCount] = useState(0);
    let [choice, setChoice] = useState("");
    return (
        <div>
            <p>주사위</p>
            <button>잘되는지</button>
        </div>
    )
}

export default Dice;