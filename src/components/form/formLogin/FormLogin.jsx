import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { __login} from "../../../redux/modules/login";



const FormLogin = () => {
    let result = useSelector((state)=>state.login)
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let initialState = {
        id: "",
        passWord: ""
    }
    let [member, setMember] = useState(initialState);
    // 수정되는 내용과 member이 가진 값을 매칭하여 state변경
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setMember({ ...member, [name]: value });
      };
    const onSubmit = ()=>{
        dispatch(__login(member));
    }
    useEffect(()=>{
        if (result.data.success) {
            navigate('/');
        }
    })
    return (
        <div>
            <StContainer>
            <div>
                <Form>
                <Input placeholder="아이디"
                    onChange={onChangeHandler}
                    name="id"
                    value={member.id}
                    type="text"/>
                </Form>
            </div>
            <div>
            <Form>
            <Input placeholder="비밀번호"
                    onChange={onChangeHandler}
                    name="passWord"
                    value={member.passWord}
                    type="password"/>
             </Form>
            </div>
            
            <div>

                {/* 현재 테스트용도로 navigate로 경로지정 */}
                <Button onClick={()=>{onSubmit()}}>로그인</Button>
                <Button onClick={()=>{navigate("/signup")}}>회원가입</Button>
               

            </div>
             </StContainer>
        </div>
    )
}
    
export default FormLogin;

const StContainer = styled.div `
width:450px;
margin: 0 auto;
margin-top: 4rem;
border : 4px solid #eee;
border-radius: 12px;
padding:12px 24px 24px 24px;
background-size: 240px;

`;

const Form = styled.div `
    overflow: hidden;
    display: block;
    width: 100%;
    margin: 0 0 8px 0;
    border: 1px solid #eee;
    color: #8F8F91;
`;

const Input = styled.input`
    width: 95%;
    height: 40px;
    line-height: 28px;
    padding: 2px 2px 2px 7px;
    border: 0 none;
    color: #8F8F91;
    vertical-align: middle;
`;
const Button = styled.button `
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