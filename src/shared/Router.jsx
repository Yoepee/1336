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
        <button onClick={()=>{navigate("/")}}> 나는 메인입니다. </button>
        <button onClick={()=>{navigate("/login")}}> 나는 로그인입니다. </button>
        <button onClick={()=>{navigate("/signup")}}> 나는 가입입니다. </button>
        <button onClick={()=>{navigate("/user/:id")}}> 나는 정보입니다. </button>
        <button onClick={()=>{navigate("/ranking")}}> 나는 랭킹입니다. </button>
        <button onClick={()=>{navigate("/game")}}> 나는 게임입니다. </button>
        <button onClick={()=>{navigate("/admin/:id")}}> 나는 관리자페이지입니다. </button>
        </div>
        <Routes>
            <Route path ="/" exact element={<Home/>}/>
            <Route path ="/login" exact element={<Login/>}/>
            <Route path ="/signup" exact element={<Signup/>}/>
            <Route path ="/user/:id" exact element={<User/>}/>
            <Route path ="/ranking" exact element={<Ranking/>}/>
            <Route path ="/game" exact element={<Game/>}>
                <Route path ="a" exact element={<Game/>}/>
                <Route path ="b" exact element={<Game/>}/>
                <Route path ="c" exact element={<Game/>}/>
                <Route path ="d" exact element={<Game/>}/>
            </Route>
            <Route path ="/admin/:id" exact element={<Admin/>}/>
            <Route path ="*" element={<div>404 Not Found</div>}/>
        </Routes>
        </>
    )
}

export default Router;