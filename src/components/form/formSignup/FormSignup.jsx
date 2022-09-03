import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { useDispatch } from "react-redux";

import { createMember } from "../../../redux/modules/member";

const FormSignup = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    let initialState = {
        id: "",
        password: "",
        passwordConfirm: "",
        nickName: "",
        birthDate: moment(date).format("YYYYMMDD")
    }
    let [member, setMember] = useState(initialState);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setMember({ ...member, [name]: value });
    };
    const onSubmitHandler = (event) => {
        event.preventDefault();
        // if (post.writer.trim() === "" || post.title.trim() === "" || post.body.trim() === "") return alert('비었다.');
        dispatch(createMember(member));
        setMember(initialState);
        navigate("/login");
        console.log(member)
      };
    return (
        <form onSubmit={onSubmitHandler} className="add-form">
            <div>
                <input placeholder="아이디"
                    onChange={onChangeHandler}
                    name="id"
                    value={member.id}
                    type="text" />
                <button>중복확인</button>
            </div>
            <div>
                <input placeholder="비밀번호"
                    onChange={onChangeHandler}
                    name="password"
                    value={member.password}
                    type="password" />
            </div>
            <div>
                <input placeholder="비밀번호 확인"
                    onChange={onChangeHandler}
                    name="passwordConfirm"
                    value={member.passwordConfirm}
                    type="password" />
            </div>
            <div>
                <input placeholder="닉네임"
                    onChange={onChangeHandler}
                    name="nickName"
                    value={member.nickName}
                    type="text" />
                <button>중복확인</button>
            </div>
            <div>
                <input placeholder="생년월일"
                    onChange={onChangeHandler}
                    name="birthDate"
                    value={moment(date).format("YYYY-MM-DD")}
                    type="text" readOnly />
                <button type="button" onClick={() => { setMember({ ...member, birthDate: moment(date).format("YYYYMMDD") }) }}>성인인증</button>
                <div>
                    <Calendar onChange={setDate} value={date} name="birthDate" />
                </div>
            </div>
            <div>
                <button>회원가입</button>
            </div>
        </form>
    )
}
export default FormSignup;