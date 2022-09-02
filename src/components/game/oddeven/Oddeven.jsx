import { useState } from "react";

const Oddeven = () => {
    let [count, setCount] = useState(Math.random);
    let [choice, setChoice] = useState(0);
    let [result, setResult] = useState("");
    let [check, setCheck] = useState(false)

    const test = (choice) =>{
        setCount(Math.random);
        console.log(count%2);
        count%2 == choice? setResult("정답입니다!!"):setResult("틀렸습니다!");
        setCheck(true);
    }
    return (
        <div>
            <p>홀짝</p>
            {check? <p>{result}</p>:null}
            <button onClick={()=>{setChoice(1)}}>홀</button>
            <button onClick={()=>{setChoice(2)}}>짝</button>
            <button onClick={()=>{test(choice)}}>도전</button>
        </div>
    )
}

export default Oddeven;