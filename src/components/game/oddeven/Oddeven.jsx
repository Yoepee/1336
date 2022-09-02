import { useState } from "react";

const Oddeven = () => {
    let [count, setCount] = useState(Math.random);
    let [choice, setChoice] = useState("");
    let [num, setNum] = useState(null)
    let [result, setResult] = useState("골라주세요.");
    let [check, setCheck] = useState(false)

    const test = (choice) => {
        if (num === null) return alert("홀, 짝을 골라주세요.");
        setCount(Math.floor(Math.random() * 1000));
        console.log(count)
        count % 2 === num ? setResult("정답입니다!!") : setResult("틀렸습니다!");
        setChoice("골라주세요.");
        setNum(null)
        setCheck(true);
    }
    return (
        <>
            <div>
                <p>홀짝</p>
                {check ? <p>{result}</p> : null}
                <p>당신의 선택은 ? {choice}</p>
                <button onClick={() => { setChoice("홀"); setNum(1) }}>홀</button>
                <button onClick={() => { setChoice("짝"); setNum(0) }}>짝</button>
            </div>
            <div>
                <button onClick={() => { test(choice) }}>도전</button>
            </div>
        </>
    )
}

export default Oddeven;