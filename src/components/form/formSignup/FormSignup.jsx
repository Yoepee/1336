import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// 달력을 위한 라이브러리 생성 (yarn add react-calendar || npm install react-calendar)
import Calendar from 'react-calendar'
// 기본으로 제공하는 달력 css 적용
import 'react-calendar/dist/Calendar.css';
// 현재날짜를 위한 라이브러리 생성 (yarn add moment || npm install moment)
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// 리덕스에서 필요한 함수 소환 (데이터베이스 연결후 내용변경될 예정)

import { __signUp } from "../../../redux/modules/member";
import { __chkId } from "../../../redux/modules/check/id"
import { __chkName } from "../../../redux/modules/check/name"
import { __chkAdult } from "../../../redux/modules/check/adult";


const FormSignup = () => {
    const userid = useSelector((state) => state.id);
    const username = useSelector((state) => state.name);
    const useradult = useSelector((state) => state.adult);

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [check, setCheck] = useState(false);
    const [pw, setPw] = useState("")
    const [date, setDate] = useState(new Date());

    const [chkid, setChkid] = useState(false);
    const [chkpw, setChkpw] = useState(false);
    const [chkname, setChkname] = useState(false);

    let regId = /^[0-9a-z]+$/;
    let regPw = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/
    let regName = /^[0-9가-힣a-zA-Z]+$/;;

    let initialState = {
        id: "",
        nickName: "",
        passWord: "",
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
        // 아이디 닉네임 비밀번호 유효성검사 (한글, 숫자, 영어, 특수문자, 글자길이 등)
        if (!chkid && !chkname && !chkpw) {
            // 중복검사 및 성인인증 성공여부 유효성검사
            if (userid.data.success && username.data.success && useradult.data.success) {
                //member을 데이터베이스에 보내줘야하는 동작과 동일하게 전달 (api참조)
                // dispatch(createMember(member));
                //if(password === passwordConfirm)

                dispatch(__signUp(member));
                // 값을 보낸 후에는 초기값으로 초기화
                setMember(initialState);
                navigate("/login")
                // 로그인이 완료 되었으면 로그인페이지로 이동
                // 회원가입 성공여부를 받아서 메세지로 띄워주면 끝날듯
            }
            else {
                alert("중복확인 및 성인인증을 해주세요.");
            }
        }else{
            alert("양식에 맞는 정보인지 확인해주세요.");
        }

    };
    // 아이디의 state가 변할때마다 유효성검사 시행
    useEffect(() => {
        if (member.id !== "" && !regId.test(member.id))
            setChkid(true);
        else
            setChkid(false);
    }, [member.id])
    // 닉네임의 state가 변할때마다 유효성검사 시행
    useEffect(() => {
        if (member.nickName !== "" && !regName.test(member.nickName))
            setChkname(true);
        else
            setChkname(false);
    }, [member.nickName])
    // 패스워드의 state가 변할때마다 유효성검사 시행
    useEffect(() => {
        if (pw !== "" && member.passWord !== "" && member.passWord !== pw)
            setChkpw(true);
        else {
            if (!regPw.test(pw))
                setChkpw(true);
            if (!regPw.test(member.passWord))
                setChkpw(true);
            setChkpw(false);
        }
    }, [pw])
    // 달력 체크 후 달력사라지기
    useEffect(() => {
        setCheck(false);
    }, [date])

    return (
        <AddInputGroup>
            <form onSubmit={onSubmitHandler} className="add-form">
                <div>
                    <Label>
                        <Input placeholder="아이디"
                            onChange={onChangeHandler}
                            name="id"
                            value={member.id}
                            type="text" />
                        <CkButton type="button"
                            onClick={() => {
                                dispatch(__chkId({ id: member.id }));
                                console.log(member.id);
                            }}>중복확인</CkButton>
                    </Label>
                    {/* 유효성검사에서 걸리면 해당 구문 출력하도록 설정 */}
                    {chkid ?
                        <p style={{ color: "red" }}>아이디를 확인해주세요.(영문,숫자)</p> : null}
                </div>
                <div>
                    <Label>
                        <Input placeholder="비밀번호"
                            onChange={onChangeHandler}
                            name="passWord"
                            value={member.passWord}
                            type="password" />
                    </Label>
                </div>
                <div>
                    <Label>
                        <Input placeholder="비밀번호 확인"
                            onChange={(e) => { setPw(e.target.value) }}
                            name="passwordConfirm"
                            value={pw}
                            type="password" />
                    </Label>
                    {/* 유효성검사에서 걸리면 해당 구문 출력하도록 설정 */}
                    {chkpw ?
                        <p style={{ color: "red" }}>패스워드를 확인해주세요.</p>
                        : null}
                </div>
                {

                }
                <div>
                    <Label>
                        <Input placeholder="닉네임"
                            onChange={onChangeHandler}
                            name="nickName"
                            value={member.nickName}
                            type="text" />
                        <CkButton type="button"
                            onClick={() => {
                                dispatch(__chkName({ nickName: member.nickName }));
                                console.log(member.nickName)
                            }}>중복확인</CkButton>
                    </Label>
                    {/* 유효성검사에서 걸리면 해당 구문 출력하도록 설정 */}
                    {chkname ?
                        <p style={{ color: "red" }}>닉네임을 확인해주세요.(한글,영문,숫자)</p> : null}
                </div>
                <div>
                    <Label>
                        <Input placeholder="생년월일"
                            onChange={onChangeHandler}
                            onClick={() => { setCheck(true); console.log(check); }}
                            name="birthDate"
                            value={moment(date).format("YYYY-MM-DD")}
                            type="text" readOnly />

                        {/* form 내부에서 버튼 type은 submit으로 누르면 새로고침 기능동작 */}
                        {/* type="button"으로 지정해주면 새로고침 동작x */}

                        <CkButton type="button" onClick={() => {
                            setMember({ ...member, birthDate: moment(date).format("YYYYMMDD") });
                            dispatch(__chkAdult({ birthDate: moment(date).format("YYYYMMDD") }));
                        }}>성인인증</CkButton>
                    </Label>
                    {check ?
                        <div>
                            <CalenderForm>
                                <Calendar onChange={setDate} value={date} name="birthDate" />
                            </CalenderForm>
                        </div>
                        : null
                    }
                </div>

                <div>
                    <Button>회원가입</Button>
                    <Button type="button" onClick={() => { navigate("/login") }}>취소</Button>
                </div>
            </form>
        </AddInputGroup>
    )
}
export default FormSignup;

const AddInputGroup = styled.div`
width:450px;
margin: 0 auto;
margin-top: 4rem;
border : 4px solid #eee;
border-radius: 12px;
padding:12px 24px 24px 24px;
background-size: 240px;

`;

const CalenderForm = styled.div`
margin: 0 auto;
margin-top: 2rem;
padding:4px 24px 12px 24px;
    
`

const Label = styled.label`
    overflow: hidden;
    display: block;
    width: 100%;
    margin: 0 0 8px 0;
    border: 1px solid #eee;
    color: #8F8F91;
`;

const Input = styled.input`
    width: 75%;
    height: 40px;
    line-height: 28px;
    padding: 0px 0px 2px 7px;
    border: 0 none;
    color: #8F8F91;
    
`;

const Button = styled.button`
    border: 1px solid #333;
    background: #333;
    color: #fff;
    font-size: 17px;
    padding: 13px 0;
    margin: 15px 0 0;
    width: 400px;
    display: inline-block;
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
`;

const CkButton = styled.button`
    border: 1px;
    margin: 15px 0 0;
    display: inline-block;
    text-align: center;
    vertical-align: baseline;
    box-sizing: border-box;
    text-transform: uppercase;
`