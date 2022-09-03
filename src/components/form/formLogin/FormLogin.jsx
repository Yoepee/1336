import { useNavigate } from "react-router-dom";
import {useState} from "react"

const FormLogin = () => {
    let navigate = useNavigate();
    let initialState = {
        id: "",
        password: ""
    }
    let [member, setMember] = useState(initialState);
    // 수정되는 내용과 member이 가진 값을 매칭하여 state변경
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setMember({ ...member, [name]: value });
      };
    return (
        <div>
            <div>
                <input placeholder="아이디"
                    onChange={onChangeHandler}
                    name="id"
                    value={member.id}
                    type="text"/>
            </div>
            <div>
            <input placeholder="비밀번호"
                    onChange={onChangeHandler}
                    name="password"
                    value={member.password}
                    type="password"/>
            </div>
            <div>
                {/* 현재 테스트용도로 navigate로 경로지정 */}
                <button onClick={()=>{navigate("/")}}>로그인</button>
                <button onClick={()=>{navigate("/signup")}}>회원가입</button>
            </div>
        </div>
    )
}
export default FormLogin;