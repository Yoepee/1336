import { useState } from "react";

const Dice = () => {
    let [count, setCount] = useState(Math.floor(Math.random() * 1000));
    let [choice, setChoice] = useState("");
    let [result, setResult] = useState("골라주세요.");
    let [check, setCheck] = useState(false)

    const test = (choice) => {
        if (choice === "골라주세요.") return alert("번호를 골라주세요.");
        setCount(Math.floor(Math.random() * 1000));
        (count % 6) + 1 === choice ? setResult(`결과 : ${(count % 6) + 1} 정답입니다!!`)
            : setResult(`결과 : ${(count % 6) + 1} 틀렸습니다!`);
        setChoice("골라주세요.");
        setCheck(true);
    }
    return (
        <>
            <div>
                <p>주사위</p>
                {check ? <p>{result}</p> : null}
                <p>당신의 선택은 ? {choice}</p>
            </div>
            <div>
                {[1, 2, 3, 4, 5, 6].map((set) => {
                    return (<button onClick={() => {
                        setChoice(set);
                    }} key={set}>{set}</button>)
                })}
            </div>
            <div>
                <button onClick={() => { test(choice) }}>도전</button>
            </div>
        </>
    )
}

export default Dice;