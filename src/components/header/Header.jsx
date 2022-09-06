import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import bg from "../../img/HeaderImg.jpg"

import { logout } from "../../redux/modules/login";
import { __chkManager } from "../../redux/modules/check/manager";

// 상세페이지, 로그아웃 연결되는 페이지
const Header = () => {
    let dispatch = useDispatch();
    // navigate를 통한 경로지정
    const admin = useSelector((state=>state.manager))
    let navigate = useNavigate();
    useEffect(()=>{
        dispatch(__chkManager());
        if(localStorage.getItem("token1")===null){
            navigate("/login")
        }
        if(localStorage.getItem("token2")===null){
            navigate("/login")
        }
    },[dispatch])
    return (
        <div>
            <div>
            <HeaderBox>
             <Title_logo src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fs9yqx%2FbtrLkuA8r9v%2Fvd5HwKxEMOtvcuv1w2xiMK%2Fimg.png" onClick={() => { navigate("/") }}></Title_logo>
                <div>
                {localStorage.getItem("name")}님 반갑습니다.
                {admin?.data?.data === true? <StHeadbtn onClick={() => { navigate("/admin/:id") }}> 관리자 </StHeadbtn>:null}
                <StHeadbtn onClick={() => { navigate("/user") }}>마이페이지</StHeadbtn>
                <StHeadbtn onClick={() => { dispatch(logout()); }}>로그아웃</StHeadbtn>
                </div>
            </HeaderBox>
            </div>
            <Title_bg className="main-bg" />
        </div>
    )
}

const Title_bg = styled.div`
height:300px;
background-image: url(${bg});
background-size: contain;
background-position: center;
background-repeat: no-repeat;

`
const Title_logo = styled.img`
height:70px;

`
const Headbtn = styled.button`
position: static
`

export default Header;

const HeaderBox = styled.form`
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-between;
    margin: 15px 15px 15px;

`;

const StHeadbtn = styled.button `
outline: none;
    border-width: 1px;
    border-radius: 12px;
    border-style: solid;
    padding: 7px 17px;
    margin: 15px 15px 15px;
    border: 1px solid #333;
    background: #333;
    color: rgb(255, 255, 255);
`;
