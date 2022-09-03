import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import bg from "../../img/HeaderImg.jpg"

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

const Header = () => {
    let navigate = useNavigate();
    return (
        <div>
            <div>
            <HeaderBox>
                <StHeadbtn onClick={() => { navigate("/user/:id") }}>마이페이지</StHeadbtn>
                <StHeadbtn onClick={() => { navigate("/login") }}>로그아웃</StHeadbtn>
            </HeaderBox>
            </div>
            <Title_bg className="main-bg" onClick={() => { navigate("/") }}/>
        </div>
    )
}

export default Header;

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
