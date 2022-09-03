import { useState, useEffect } from "react";

const Counter = () => {
    let [count, setCount] = useState(0);
    let [timer, setTimer] = useState(30);
    let [start, setStart] = useState(false);
    let [bet, setBet] = useState("")

    useEffect(() => {
        if(start){
            if (timer > 0) {
                setTimeout(() => {
                    setTimer(timer - 1);
                }, 1000);
            }else if(timer=0){
                setStart(false)
            }
        }
    }, [timer, start])
    return (
        <div>
            <p>카운터</p>
            <p>{count}</p>
            {timer <= 10 ? <p style={{ color: "red" }}>남은 시간: {timer}초</p> : <p>남은 시간: {timer}초</p>}
            <button onClick={()=>{setStart(true)}}>시작</button>
            <div>
                <input placeholder="배팅금액"
                    onChange={(e) => { setBet(e.target.value) }}
                    name="bet"
                    value={bet}
                    type="text" />
                <button>배팅하기</button>
            </div>
            <div>
            <button onClick={() => {
                if (timer > 0) { setCount(count + 1) }
            }}>나를 눌러줘</button>
            <button onClick={() => timer === 0 ? alert(`${count}점 등록되었습니다. `) : null}>점수 처리</button>
            <button onClick={() => {
                if (timer === 0) { setTimer(30); setCount(0); setStart(true); }
            }}>재시작</button>
            </div>
        </div>
    )
}

export default Counter;