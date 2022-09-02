import { useState, useEffect } from "react";

const Counter = () => {
    let [count, setCount] = useState(0);
    let [timer, setTimer] = useState(30);

    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        }
    }, [timer])
    return (
        <div>
            <p>카운터</p>
            <p>{count}</p>
            {timer <= 10 ? <p style={{ color: "red" }}>남은 시간: {timer}초</p> : <p>남은 시간: {timer}초</p>}
            <button onClick={() => {
                if (timer > 0) { setCount(count + 1) }
            }}>나를 눌러줘</button>
            <button onClick={() => alert(`${count}점 등록되었습니다. `)}>점수 처리</button>
            <button onClick={() => {
                if (timer === 0) { setTimer(30); setCount(0) }
            }}>재시작</button>
        </div>
    )
}

export default Counter;