import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// 달력을 위한 라이브러리 생성 (yarn add react-calendar || npm install react-calendar)
import Calendar from 'react-calendar'
// 기본으로 제공하는 달력 css 적용
import 'react-calendar/dist/Calendar.css';
// 현재날짜를 위한 라이브러리 생성 (yarn add moment || npm install moment)
import moment from 'moment';
import { useDispatch } from "react-redux";
import styled from "styled-components";

// 리덕스에서 필요한 함수 소환 (데이터베이스 연결후 내용변경될 예정)
import { createMember,__chkName, __chkId, __signUp, __chkAdult } from "../../../redux/modules/member";

const FormSignup = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [check, setCheck] = useState(false);
    const [date, setDate] = useState(new Date());
    let initialState = {
        id: "",
        nickname: "",
        password: "",
        birthDate: moment(date).format("YYYYMMDD")
    }
    let [pw, setPw] = useState("")
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
        // dispatch(createMember(member));
        dispatch(__signUp(member));
        // 값을 보낸 후에는 초기값으로 초기화
        setMember(initialState);
        // 로그인이 완료 되었으면 로그인페이지로 이동
        // 회원가입 성공여부를 받아서 메세지로 띄워주면 끝날듯
      };

      useEffect(()=>{
        setCheck(false);
      },[date]) 
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
                 onClick={()=>{
                    dispatch(__chkId({id:member.id}))
                    console.log(member.id)
                }}>중복확인</CkButton>
            </Label>
            </div>
            <div>
                <Label>
                <Input placeholder="비밀번호"
                    onChange={onChangeHandler}
                    name="password"
                    value={member.password}
                    type="password" />
                </Label>

            </div>
            <div>
            <Label>
                <Input placeholder="비밀번호 확인"
                    onChange={(e)=>setPw(e.target.value)}
                    name="passwordConfirm"
                    value={pw}
                    type="password" />
             </Label>
            </div>
            <div>
            <Label>
                <Input placeholder="닉네임"
                    onChange={onChangeHandler}
                    name="nickname"
                    value={member.nickname}
                    type="text" />
                <CkButton type="button" 
                onClick={()=>{
                    dispatch(__chkName({nickname:member.nickname}));
                    console.log(member.nickname)
                }}>중복확인</CkButton>
          </Label>
            </div>
            <div>
            <Label>
                <Input placeholder="생년월일"
                    onChange={onChangeHandler}
                    onClick={()=>{setCheck(true);}}
                    name="birthDate"
                    value={moment(date).format("YYYY-MM-DD")}
                    type="text" readOnly />

                {/* form 내부에서 버튼 type은 submit으로 누르면 새로고침 기능동작 */}
                {/* type="button"으로 지정해주면 새로고침 동작x */}
                <CkButton type="button" onClick={() => { 
                    setMember({ ...member, birthDate: moment(date).format("YYYYMMDD") });
                    dispatch(__chkAdult({birthDate: moment(date).format("YYYYMMDD")}))
                    }}>성인인증</CkButton>
                </Label>
                {check?
                <div>
                    <Calendar onChange={setDate} value={date} name="birthDate" />
                </div>
                :null
                }
            </div>
            
            <div>
                
                <Button>회원가입</Button>
            </div>
        </form>
        </AddInputGroup>
    )
}
export default FormSignup;

const AddInputGroup = styled.div `
width:450px;
margin: 0 auto;
margin-top: 4rem;
border : 4px solid #eee;
border-radius: 12px;
padding:12px 24px 24px 24px;
background-size: 240px;

`;

const Label = styled.label `
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

const Button = styled.button `
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