import { useNavigate } from "react-router-dom";
const Choice = () => {
    let navigate = useNavigate();
    return (
        <div>
            <div>
                <p>전체게임</p>
                <button onClick={() => { navigate("/chart") }}> 랭킹보기 </button>
                <button onClick={() => { navigate("/admin/:id") }}> 관리자 </button>
            </div>
            <div>
                <button onClick={() => { navigate("/game/counter") }}> 카운터 </button>
                <button onClick={() => { navigate("/game/oddeven") }}> 홀짝 </button>
                <button onClick={() => { navigate("/game/dice") }}> 주사위 </button>
                <button onClick={() => { navigate("/game/lotto") }}> 로또 </button>
            </div>
        </div>
    )
}

export default Choice;