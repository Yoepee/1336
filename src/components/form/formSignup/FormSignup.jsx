import { useNavigate } from "react-router-dom";

const FormSignup = () => {
    let navigate = useNavigate();
    return (
        <div>
            <div>
                <label>ID</label>
                <input></input>
                <button>중복확인</button>
            </div>
            <div>
                <label>PW</label>
                <input></input>
            </div>
            <div>
                <label>PW확인</label>
                <input></input>
            </div>
            <div>
                <label>닉네임</label>
                <input></input>
                <button>중복확인</button>
            </div>
            <div>
                <label>생년월일</label>
                <input></input>
                <button>성인인증</button>
            </div>
            <div>
                <button onClick={()=>{navigate("/login")}}>회원가입</button>
            </div>
        </div>
    )
}
export default FormSignup;