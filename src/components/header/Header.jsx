import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import bg from "../../img/HeaderImg.jpg"

// 상세페이지, 로그아웃 연결되는 페이지
const Header = () => {
    // navigate를 통한 경로지정
    let navigate = useNavigate();
    return (
        <div>
            <div>
            <HeaderBox>
             <Title_logo src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fs9yqx%2FbtrLkuA8r9v%2Fvd5HwKxEMOtvcuv1w2xiMK%2Fimg.png" onClick={() => { navigate("/") }}></Title_logo>
                <div>
                <StHeadbtn onClick={() => { navigate("/user/:id") }}>마이페이지</StHeadbtn>
                <StHeadbtn onClick={() => { navigate("/login") }}>로그아웃</StHeadbtn>
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
