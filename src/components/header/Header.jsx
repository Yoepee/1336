import { useNavigate } from "react-router-dom";

const Header = () =>{
    let navigate = useNavigate();
    return (
        <>
        <div>
            <button onClick={()=>{navigate("/user/:id")}}>마이페이지</button>
            <button onClick={()=>{navigate("/login")}}>로그아웃</button>
        </div>
        <div onClick={()=>{navigate("/")}}> 나는 헤더입니다. </div>
        </>
    )
}

export default Header;