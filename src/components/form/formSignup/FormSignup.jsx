import { useNavigate } from "react-router-dom";
import { useState } from "react";
// 달력을 위한 라이브러리 생성 (yarn add react-calendar || npm install react-calendar)
import Calendar from 'react-calendar'
// 기본으로 제공하는 달력 css 적용
import 'react-calendar/dist/Calendar.css';
// 현재날짜를 위한 라이브러리 생성 (yarn add moment || npm install moment)
import moment from 'moment';
import { useDispatch } from "react-redux";

// 리덕스에서 필요한 함수 소환 (데이터베이스 연결후 내용변경될 예정)
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
    // 수정되는 내용과 member이 가진 값을 매칭하여 state변경
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setMember({ ...member, [name]: value });
    };
    // form을 통한 제줄이라 submit
    const onSubmitHandler = (event) => {
        event.preventDefault();
        //member을 데이터베이스에 보내줘야하는 동작과 동일하게 전달 (api참조)
        dispatch(createMember(member));
        // 값을 보낸 후에는 초기값으로 초기화
        setMember(initialState);
        // 로그인이 완료 되었으면 로그인페이지로 이동
        // 회원가입 성공여부를 받아서 메세지로 띄워주면 끝날듯
        navigate("/login");
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
                {/* form 내부에서 버튼 type은 submit으로 누르면 새로고침 기능동작 */}
                {/* type="button"으로 지정해주면 새로고침 동작x */}
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