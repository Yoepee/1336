import { useState } from "react";

const Counter = () => {
    let [count, setCount] = useState(0);
    return (
        <div>
            <p>카운터</p>
            <p>{count}</p>
            <button onClick={()=>{setCount(count+1)}}>나를 눌러줘</button>
        </div>
    )
}

export default Counter;