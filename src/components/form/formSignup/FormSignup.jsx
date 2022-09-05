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

import { createMember, __signUp} from "../../../redux/modules/member";
import {__chkId} from "../../../redux/modules/id"
import {__chkName} from "../../../redux/modules/name"
import { __chkAdult } from "../../../redux/modules/adult";


const FormSignup = () => {
    const userid = useSelector((state) => state.id);
    const username = useSelector((state) => state.name);
    const useradult = useSelector((state) => state.adult);

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [check, setCheck] = useState(false);
    const [date, setDate] = useState(new Date());
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

        if(userid.data.success&&username.data.success&&useradult.data.success){
            //member을 데이터베이스에 보내줘야하는 동작과 동일하게 전달 (api참조)
            // dispatch(createMember(member));
            dispatch(__signUp(member));
            // 값을 보낸 후에는 초기값으로 초기화
            setMember(initialState);
            // 로그인이 완료 되었으면 로그인페이지로 이동
            // 회원가입 성공여부를 받아서 메세지로 띄워주면 끝날듯
        }
        else{
            alert(userid.data.data,username.data.data,useradult.data.data
        }

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
                    dispatch(__chkId({id:member.id}));
                    console.log(member.id);
                    if(userid.data.success)alert(userid.data.data)
                }}>중복확인</CkButton>
            </Label>
            {member.id.length<2 && member.id.trim()!==""?
                    <p style={{color:"red"}}>2자 이상 입력해주세요.</p>:null}
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
                    onChange={onChangeHandler}
                    name="passwordConfirm"
                    value={member.passwordConfirm}
                    type="password" />
             </Label>
             {pw.trim()!=="" && member.passWord.trim()!=="" && member.passWord !== pw?
                    <p style={{color:"red"}}>패스워드가 일치하지 않습니다.</p>:null}
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
                onClick={()=>{
                    dispatch(__chkName({nickName:member.nickName}));
                    console.log(member.nickName)
                    if(username.data.success)alert(username.data.data)
                }}>중복확인</CkButton>
          </Label>
            {member.nickName.length<2 && member.nickName.trim()!==""?
                    <p style={{color:"red"}}>2자 이상 입력해주세요.</p>:null}
            </div>
            <div>
            <Label>
                <Input placeholder="생년월일"
                    onChange={onChangeHandler}
                    onClick={()=>{setCheck(true);console.log(check);}}
                    name="birthDate"
                    value={moment(date).format("YYYY-MM-DD")}
                    type="text" readOnly />

                {/* form 내부에서 버튼 type은 submit으로 누르면 새로고침 기능동작 */}
                {/* type="button"으로 지정해주면 새로고침 동작x */}

                <CkButton type="button" onClick={() => { 
                    setMember({ ...member, birthDate: moment(date).format("YYYYMMDD") });
                    dispatch(__chkAdult({birthDate: moment(date).format("YYYYMMDD")}));
                    if(useradult.data.success)alert(useradult.data.data);
                    }}>성인인증</CkButton>
                </Label>
                {check?
                <div>
                    <CalenderForm>
                    <Calendar onChange={setDate} value={date} name="birthDate" />

                    </CalenderForm>


                </div>
                :null
                }
                <Button type="button" onClick={() => { 
                    setMember({ ...member, birthDate: moment(date).format("YYYYMMDD") });
                    }}>성인인증</Button>
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

const CalenderForm = styled.div `
margin: 0 auto;
margin-top: 2rem;
padding:4px 24px 12px 24px;
    
`

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