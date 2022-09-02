import {Routes, Route} from "react-router-dom"
import { useNavigate } from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import User from "../pages/User"
import Ranking from "../pages/Ranking"
import Game from "../pages/Game"
import Admin from "../pages/Admin"

const Router = () => {
    let navigate =useNavigate();
    return (
        <>
        <div>
        <button onClick={()=>{navigate("/")}}> 메인 </button>
        <button onClick={()=>{navigate("/login")}}> 로그인 </button>
        <button onClick={()=>{navigate("/signup")}}> 회원가입 </button>
        <button onClick={()=>{navigate("/user/:id")}}> 정보페이지 </button>
        <button onClick={()=>{navigate("/ranking")}}> 랭킹 페이지 </button>
        <button onClick={()=>{navigate("/admin/:id")}}> 관리자페이지 </button>
        <button onClick={()=>{navigate("/game/a")}}> 게임1 </button>
        <button onClick={()=>{navigate("/game/b")}}> 게임2 </button>
        <button onClick={()=>{navigate("/game/c")}}> 게임3 </button>
        <button onClick={()=>{navigate("/game/d")}}> 게임4 </button>
        </div>
        <Routes>
            <Route path ="/" exact element={<Home/>}/>
            <Route path ="/login" exact element={<Login/>}/>
            <Route path ="/signup" exact element={<Signup/>}/>
            <Route path ="/user/:id" exact element={<User/>}/>
            <Route path ="/ranking" exact element={<Ranking/>}/>
            <Route path ="/game" exact element={<Game/>}>
                <Route path ="a" exact element={<div>카운터</div>}/>
                <Route path ="b" exact element={<div>홀짝</div>}/>
                <Route path ="c" exact element={<div>주사위</div>}/>
                <Route path ="d" exact element={<div>로또</div>}/>
            </Route>
            <Route path ="/admin/:id" exact element={<Admin/>}/>
            <Route path ="*" element={<div>404 Not Found</div>}/>
        </Routes>
        </>
    )
}

export default Router;