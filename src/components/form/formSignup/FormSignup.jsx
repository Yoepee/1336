import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { useDispatch } from "react-redux";
import styled from "styled-components";

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

        <AddInputGroup>
        <form onSubmit={onSubmitHandler} className="add-form">
            <div>
            <Label>
                <Input placeholder="아이디"
                    onChange={onChangeHandler}
                    name="id"
                    value={member.id}
                    type="text" />
                <CkButton>중복확인</CkButton>
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
                    onChange={onChangeHandler}
                    name="passwordConfirm"
                    value={member.passwordConfirm}
                    type="password" />
             </Label>
            </div>
            <div>
            <Label>
                <Input placeholder="닉네임"
                    onChange={onChangeHandler}
                    name="nickName"
                    value={member.nickName}
                    type="text" />
                <CkButton>중복확인</CkButton>
          </Label>
            </div>
            <div>
            <Label>
                <Input placeholder="생년월일"
                    onChange={onChangeHandler}
                    name="birthDate"
                    value={moment(date).format("YYYY-MM-DD")}
                    type="text" readOnly />
                <Button type="button" onClick={() => { setMember({ ...member, birthDate: moment(date).format("YYYYMMDD") }) }}>성인인증</Button>
                </Label>
                <div>
                    <Calendar onChange={setDate} value={date} name="birthDate" />
            
                </div>
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