import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getComment, createComment, removeComment, updateComment } from "../../redux/modules/comment/comment";
import styled from "styled-components";
import axios from "axios";
//import { BsPencilFill, BsFillEraserFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Comment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // url경로값을 받아오기 위한 내용 (받아오고 "/" 기준으로 값을 나눠서 배열 형식으로 저장)
    let a = window.location.href.split('/')
    // 배열의 마지막 값만 있으면 되서 이렇게작성
    let game = a[a.length-1];
    // 게임 종류와 댓글 내용을 추가함 (게임종류는 url을 통한 고정값)
    const initialState = {
        content: "",
        game: game
    }
    // 데이터베이스에 보내주기위한 인자 설정
    const [comment,setComment] = useState(initialState);
    // 데이터 받아오기
    const { isLoading, error, data } = useSelector((state) => state.comment);
    // useEffect를 통한 불필요한 비동기 동작 제어
    useEffect(() => {
        if(localStorage.getItem("token1")===null){
            navigate("/login")
        }
        if(localStorage.getItem("token2")===null){
            navigate("/login")
        }else{
            dispatch(__getComment(game));
        }
    }, [dispatch]);
     //isLoading이 true이면 컴포넌트의 return값 변경
     if (isLoading) {
        return <div>로딩 중....</div>;
    }
    //error이 true이면 컴포넌트의 return값 변경
    if (error) {
        return <div>{error.message}</div>;
    }
    const copy = data?.data
    // 조건문에 넣었을 때 false가 되는 경우를 찾아보시면 좋을듯 (ex> null, undefined 등)
    return (
        <>
        <AddInputGroup>

            <Label>
                <Input placeholder="내용"
                    onChange={(e)=>{setComment({...comment,content:e.target.value})}}
                    name="comment"
                    value={comment.content}
                    type="text" />
                <CkButton onClick={async()=>{
                            let a = await axios.post(`http://3.34.5.30:8080/api/comment?gameId=${game}`, comment, {
                                headers: {
                                    Authorization: localStorage.getItem('token1'),
                                    RefreshToken: localStorage.getItem('token2'),
                              }});
                              dispatch(createComment(a.data.data));
                        }}>댓글 작성</CkButton>
            </Label>
            </AddInputGroup>
            <AddInputGroup>
            <div>
                {copy?.map((review,i)=>{
                    return (
                        <ReplyBox key={i}>
                        <Replier>{review.nickName} </Replier>
                        <Reply>{review.content}</Reply>
                        <EdButton onClick={async()=>{
                            let change = prompt('수정할 내용을 입력해주세요.');
                             await axios.patch(`http://3.34.5.30:8080/api/comment?id=${review.id}`, {content: change}, {
                                headers: {
                                    Authorization: localStorage.getItem('token1'),
                                    RefreshToken: localStorage.getItem('token2'),
                              }});
                              dispatch(updateComment({...review,content:change}))
                        }}></EdButton>
                        <DeButton onClick={async()=>{
                             await axios.delete(`http://3.34.5.30:8080/api/comment?id=${review.id}`, {
                                headers: {
                                    Authorization: localStorage.getItem('token1'),
                                    RefreshToken: localStorage.getItem('token2'),
                              }});
                              dispatch(removeComment(review.id))
                        }}></DeButton>
                        </ReplyBox>   
                    )
                })}
            </div>
            </AddInputGroup>
        </>
    )
}

export default Comment;

const Input = styled.input`
    width: 75%;
    height: 40px;
    line-height: 28px;
    padding: 0px 0px 2px 7px;
    border: 0 none;
    color: #8F8F91;
    
`;
const AddInputGroup = styled.div `
width:500px;
margin: 0 auto;
margin-top: 1rem;
margin-bottom: 2rem;

border : 4px solid transparent;
padding:12px 24px 12px 12px;
background-size: 300px;
`;

const Label = styled.label `
    overflow: hidden;
    margin-top: 1rem;
    display: block;
    width: 100%;
    text-align: left;
    margin: 0 0 8px 0;
    border: 1px solid #eee;
    color: #8F8F91;
`;

const CkButton = styled.button`
    border: 1px;
    margin: 15px 10px 15px;
    display: inline-block;
    text-align: center;
    vertical-align: baseline;
    box-sizing: border-box;
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
    width: 20%;
    text-align: left;
    font-weight: 400;
    font-size: 18px;
`
const Reply = styled.div`
    width: 80%;
    text-align: left;
    font-weight: 400;
    font-size: 18px;
`

const EdButton = styled.button`
width: 30px;
height: 30px;
background: none;
background-image: url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmnuSj%2FbtrLzESBOTR%2FJaHDiIBq3ugrEF07d1JnyK%2Fimg.png);
border : 4px solid transparent; 
display: flex;
flex-direction: row;
align-items: center;
margin: 15px 5px 15px;
background-repeat: no-repeat;
`;

const DeButton = styled.button`
width: 30px;
height: 30px;
background: none;
background-image: url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FObzhp%2FbtrLDP6mFdx%2FZsSu7Y0tgSdtSXqKj32iU0%2Fimg.png);
border : 4px solid transparent; 
display: flex;
flex-direction: row;
align-items: center;
margin: 15px 5px 15px;
background-repeat: no-repeat;
`;





