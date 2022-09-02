import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { mockComponent } from "react-dom/test-utils";
import moment from 'moment';

const FormSignup = () => {
    let navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    let initialState = {
        id: "",
        password: "",
        passwordConfirm: "",
        nickName: "",
        birthDate:moment(date).format("YYYYMMDD")
    }
    let [member, setMember] = useState(initialState);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setMember({ ...member, [name]: value });
        console.log(member)
      };
      console.log(member);
    return (
        <form>
            <div>
            <input placeholder="아이디"
                    onChange={onChangeHandler}
                    name="id"
                    value={member.id}
                    type="text"/>
                <button>중복확인</button>
            </div>
            <div>
            <input placeholder="비밀번호"
                    onChange={onChangeHandler}
                    name="password"
                    value={member.password}
                    type="password"/>
            </div>
            <div>
            <input placeholder="비밀번호 확인"
                    onChange={onChangeHandler}
                    name="passwordConfirm"
                    value={member.passwordConfirm}
                    type="password"/>
            </div>
            <div>
            <input placeholder="닉네임"
                    onChange={onChangeHandler}
                    name="nickName"
                    value={member.nickName}
                    type="text"/>
                <button>중복확인</button>
            </div>
            <div>
            <input placeholder="생년월일"
                    onChange={onChangeHandler}
                    name="birthDate"
                    value={moment(date).format("YYYY-MM-DD")}
                    type="text" readOnly/>
                <button onClick={()=>{setMember({ ...member, birthDate: moment(date).format("YYYYMMDD") })}}>성인인증</button>
            </div>
            <Calendar onChange={setDate} value={date} name="birthDate" />
            <div>
                <button onClick={()=>{navigate("/login")}}>회원가입</button>
            </div>
        </form>
    )
}
export default FormSignup;