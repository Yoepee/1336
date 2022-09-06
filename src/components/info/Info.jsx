import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux/";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import { __getMember } from "../../redux/modules/member";
//  유저 세부정보를 출력하는 페이지
const Info = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const amu = useRef();

    // 데이터받아오기
    const result= localStorage.getItem("name")
    const user = useSelector((state)=>state.member)
    // useEffect를 통한 불필요한 비동기 동작 제어
    useEffect(() => {
        dispatch(__getMember(result))
    }, [dispatch]);

    //  //isLoading이 true이면 컴포넌트의 return값 변경
    //  if (isLoading) {
    //     return <div>로딩 중....</div>;
    // }
    // //error이 true이면 컴포넌트의 return값 변경
    // if (error) {
    //     return <div>{error.message}</div>;
    // }
    // 조건문에 넣었을 때 false가 되는 경우를 찾아보시면 좋을듯 (ex> null, undefined 등)
    
    // params에서 제공하는 url id값과 데이터베이스에서 보내준 정보와 대조 (아마 연결하고나서는 다르게 써야할듯)
    // let info = data.find((user)=>{
    //     return String(user.id) === id
    // })
    const onImgChange = async (e)=>{
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const response = await axios.patch("http://3.34.5.30:8080/api/user/Image", formData,{
            headers: {
              Authorization: localStorage.getItem("token1"),
              RefreshToken: localStorage.getItem("token2")
          }});
    }
    // const a = (e) => {
    //     e.preventDefault();
    //     amu.current.click();
    // }
    return (
        <div>
            <div>
                <input 
                type="file" 
                accept="image/*" 
                name="file" 
                onChange={onImgChange}
                ref={amu}/>
                {/* <button onClick={()=>{a()}}>올려보자</button> */}
            </div>
            <InfoBox>
            <div>
           {/* 옵셔널 체이닝을 통한 없는 데이터 나올 때 페이지 에러가 나지않도록함 */}
                <Label>
                <p>ID : {user?.data?.data?.id}</p>
                </Label>
            </div>
            <div>
            <Label>
             {/* 옵셔널 체이닝을 통한 없는 데이터 나올 때 페이지 에러가 나지않도록함 */}
                <p>닉네임 : {user?.data?.data?.nickName}</p>
            </Label>

            </div>
            <div>
            <Label>
                <p>보유코인 : {user?.data?.data?.point}</p></Label>
            </div>
            <div>
            <Label>
                <p>홀짝 승리 수 : {user?.data?.data?.winCountOfOddEven}</p></Label>
                <Label>
                <p>주사위 승리 수 : {user?.data?.data?.winCountOfDice}</p></Label>
                <Label>
                <p>로또 획득포인트 : {user?.data?.data?.earnPointOfLotto}</p></Label>
                <Label>
                <p>최대 카운트  : {user?.data?.data?.highestCountOfCounter}</p></Label>
            </div>
            <div>
                <Button onClick={()=>{navigate("/login")}}>회원탈퇴</Button>
            </div>
            </InfoBox>
        </div>
    )
}

export default Info;

const InfoBox = styled.div `
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