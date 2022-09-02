import { useNavigate } from "react-router-dom";
const Choice = () => {
    let navigate = useNavigate();
    return (
        <div>
            <div>
                <p>전체게임</p>
            </div>
            <div>
                <div onClick={()=>navigate("/game/a")}>게임1</div>
                <div onClick={()=>navigate("/game/b")}>게임2</div>
                <div onClick={()=>navigate("/game/c")}>게임3</div>
                <div onClick={()=>navigate("/game/d")}>게임4</div>
            </div>
        </div>
    )
}

export default Choice;