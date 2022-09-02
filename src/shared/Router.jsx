import {Routes, Route} from "react-router-dom"
import { useNavigate } from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import User from "../pages/User"
import Ranking from "../pages/Ranking"
import Game from "../pages/Game"
import Admin from "../pages/Admin"

import Counter from "../components/game/counter/Counter"
import Oddeven from "../components/game/oddeven/Oddeven"
import Dice from "../components/game/dice/Dice"
import Lotto from "../components/game/lotto/Lotto"

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
        </div>
        <Routes>
            <Route path ="/" exact element={<Home/>}/>
            <Route path ="/login" exact element={<Login/>}/>
            <Route path ="/signup" exact element={<Signup/>}/>
            <Route path ="/user/:id" exact element={<User/>}/>
            <Route path ="/ranking" exact element={<Ranking/>}/>
            <Route path ="/game" exact element={<Game/>}>
                <Route path ="counter" exact element={<Counter/>}/>
                <Route path ="oddeven" exact element={<Oddeven/>}/>
                <Route path ="dice" exact element={<Dice/>}/>
                <Route path ="lotto" exact element={<Lotto/>}/>
            </Route>
            <Route path ="/admin/:id" exact element={<Admin/>}/>
            <Route path ="*" element={<div>404 Not Found</div>}/>
        </Routes>
        </>
    )
}

export default Router;