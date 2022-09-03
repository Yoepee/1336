import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import bg from "../../img/bg.jpg"

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
                <Headbtn onClick={() => { navigate("/user/:id") }}>마이페이지</Headbtn>
                <Headbtn onClick={() => { navigate("/login") }}>로그아웃</Headbtn>
            </div>
            <Title_bg className="main-bg" onClick={() => { navigate("/") }}/>
        </div>
    )
}

export default Header;