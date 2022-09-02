import { useNavigate } from "react-router-dom";

const FormLogin = () => {
    let navigate = useNavigate();
    return (
        <div>
            <div>
                <label>ID</label>
                <input></input>
            </div>
            <div>
                <label>PW</label>
                <input></input>
            </div>
            <div>
                <button onClick={()=>{navigate("/")}}>로그인</button>
                <button onClick={()=>{navigate("/signup")}}>회원가입</button>
            </div>
        </div>
    )
}
export default FormLogin;