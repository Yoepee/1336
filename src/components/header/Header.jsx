import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import bg from "../../img/bg.jpg"

// 상세페이지, 로그아웃 연결되는 페이지
const Header = () => {
    // navigate를 통한 경로지정
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
// styled-components (아마 지우게 될ㄷ...)
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

export default Header;