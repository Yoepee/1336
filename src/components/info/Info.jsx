import { useNavigate } from "react-router-dom";

const Info = () => {
    let navigate = useNavigate();
    return (
        <div>
            <div>
                <p>ID :</p>
            </div>
            <div>
                <p>닉네임 :</p>
            </div>
            <div>
                <p>보유코인 :</p>
            </div>
            <div>
                <button onClick={()=>{navigate("/login")}}>회원탈퇴</button>
            </div>
        </div>
    )
}

export default Info;