import {Routes, Route} from "react-router-dom"

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
    return (
        <>
        {/* Routes, Route를 이용한 경로지정 */}
        <Routes>
            <Route path ="/" exact element={<Home/>}/>
            <Route path ="/login" exact element={<Login/>}/>
            <Route path ="/signup" exact element={<Signup/>}/>
            <Route path ="/user" exact element={<User/>}/>
            <Route path ="/chart" exact element={<Ranking/>}/>
            {/* 중첩 라우터 nested route 기능 (검색해보시면 좋을듯) */}
            <Route path ="/game" exact element={<Game/>}>
                {/* /game/counter 이런식으로 경로를 이어서 들어갈 수 있음 */}
                <Route path ="counter" exact element={<Counter/>}/>
                <Route path ="oddeven" exact element={<Oddeven/>}/>
                <Route path ="dice" exact element={<Dice/>}/>
                <Route path ="lotto" exact element={<Lotto/>}/>
            </Route>
            <Route path ="/admin/:id" exact element={<Admin/>}/>
            {/* 예외처리 (경로 지정 외 페이지들에 나오는 값 생성) */}
            <Route path ="*" element={<div>404 Not Found</div>}/>
        </Routes>
        </>
    )
}

export default Router;