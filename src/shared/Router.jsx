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
        <div onClick={()=>{navigate("/")}}> 나는 헤더입니다. </div>
        <Routes>
            <Route path ="/" exact element={<Home/>}/>
            <Route path ="/login" exact element={<Login/>}/>
            <Route path ="/signup" exact element={<Signup/>}/>
            <Route path ="/user/:id" exact element={<User/>}/>
            <Route path ="/ranking" exact element={<Ranking/>}/>
            <Route path ="/game" exact element={<Game/>}/>
            <Route path ="/admin/:id" exact element={<Admin/>}/>
            <Route path ="*" element={<div>404 Not Found</div>}/>
        </Routes>
        </>
    )
}

export default Router;