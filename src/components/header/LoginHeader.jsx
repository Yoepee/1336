import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import bg from "../../img/HeaderImg.jpg"

// 로그인, 회원가입 페이지의 헤더 (정보를 불러오는 기능이 제거)
const LoginHeader = () => {
    // navigate를 통한 경로지정
    let navigate = useNavigate();
    return (
        <div>
            <div>
            <HeaderBox>
            </HeaderBox>
            </div>
            <Title_bg className="main-bg"/>
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
const Headbtn = styled.button`
position: static
`

export default LoginHeader;

const HeaderBox = styled.form`
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
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
