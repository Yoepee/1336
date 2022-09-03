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
        <Routes>
            <Route path ="/" exact element={<Home/>}/>
            <Route path ="/login" exact element={<Login/>}/>
            <Route path ="/signup" exact element={<Signup/>}/>
            <Route path ="/user/:id" exact element={<User/>}/>
            <Route path ="/chart" exact element={<Ranking/>}/>
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