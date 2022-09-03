import { useNavigate } from "react-router-dom";
const Choice = () => {
    let navigate = useNavigate();
    return (
        <div>
            <div>
                {/* 메인화면에서 랭킹과 관리자로 연결되는 부분(아직 미정) */}
                <p>전체게임</p>
                <button onClick={() => { navigate("/chart") }}> 랭킹보기 </button>
                <button onClick={() => { navigate("/admin/:id") }}> 관리자 </button>
            </div>
            <div>
                {/* 버튼클릭시 게임페이지 경로로 이동 */}
                <button onClick={() => { navigate("/game/counter") }}> 카운터 </button>
                <button onClick={() => { navigate("/game/oddeven") }}> 홀짝 </button>
                <button onClick={() => { navigate("/game/dice") }}> 주사위 </button>
                <button onClick={() => { navigate("/game/lotto") }}> 로또 </button>
            </div>
        </div>
    )
}

export default Choice;