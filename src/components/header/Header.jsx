import { useNavigate } from "react-router-dom";

const Header = () =>{
    let navigate = useNavigate();
    return (
        <>
        <div onClick={()=>{navigate("/")}}> 나는 헤더입니다. </div>
        </>
    )
}

export default Header;