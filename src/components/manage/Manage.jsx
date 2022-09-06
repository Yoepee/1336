import { useSelector, useDispatch } from "react-redux/";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { __getuser } from "../../redux/modules/admin";
// 관리자페이지 핵심 기능 (아이디, 포인트 작성 후 서버전달예정)
const Manage = () => {
    const dispatch = useDispatch();
    const [show,setShow] = useState(false);
    const user = useSelector((state=>state.admin));
    let initialState = {
        id: "",
        point: ""
    }
    let [member, setMember] = useState(initialState);
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setMember({ ...member, [name]: value });
      };
    
    useEffect(()=>{
        dispatch(__getuser());
    },[dispatch])
    return (
        <div>
            <InfoBox>
            <div>
                <Label>
                <Input placeholder="아이디"
                onChange={onChangeHandler}
                name="id"
                value={member.id}
                type="text"/>
                </Label>
            </div>
            <div>
            <Label>
                <Input placeholder="지급 포인트"
                onChange={onChangeHandler}
                name="point"
                value={member.point}
                type="text"/>
                </Label>
            </div>
            <div>
                <Button onClick={async()=>{
                             await axios.post(`http://3.34.5.30:8080/api/adminPage/${member.id}`, {point:member.point}, {
                                headers: {
                                    Authorization: localStorage.getItem('token1'),
                                    RefreshToken: localStorage.getItem('token2'),
                              }}).then(()=>{alert("지급이 완료되었습니다.")});
                        }}>지급하기</Button>
            </div>
            </InfoBox>
            <InfoBox>
            <div>
                {show === true?
                <>
                <ReplyBox>
                        <Replier>아이디</Replier>
                        <Reply>포인트</Reply>
                </ReplyBox>   
                {user?.data?.data?.map((people,i)=>{
                    return (
                        <ReplyBox key={i}>
                        <Replier>{people.id}</Replier>
                        <Reply>{people.point}</Reply>
                        </ReplyBox>   
                    )
                })}
                </>
                :null
                }
            </div>
            <Button onClick={()=>{show===true?setShow(false):setShow(true)}}>유저목록</Button>
            </InfoBox>
        </div>
    )
}
export default Manage;

const InfoBox = styled.div `
width:450px;
margin: 0 auto;
margin-top: 4rem;
border : 4px solid #eee;
border-radius: 12px;
padding:12px 24px 24px 24px;
background-size: 240px;

`;

const Input = styled.input`
    width: 95%;
    height: 40px;
    line-height: 28px;
    padding: 2px 2px 2px 7px;
    border: 0 none;
    color: #8F8F91;
    vertical-align: middle;
`
const Label = styled.label `
    overflow: hidden;
    display: block;
    width: 100%;
    margin: 0 0 8px 0;
    border: 1px solid #eee;
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
const ReplyBox = styled.div `
    display: flex;
    align-items: center;
    padding:10px 8px 10px 8px;
    width: 100%;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    color: #353535;
    vertical-align: middle;
    word-break: break-all;
    word-wrap: break-word;  
`
const Replier = styled.div`
    width: 75%;
    text-align: left;
    font-weight: 400;
    font-size: 18px;
`
const Reply = styled.div`
    width: 25%;
    text-align: left;
    font-weight: 400;
    font-size: 18px;
`