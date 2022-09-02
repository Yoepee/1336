import { Outlet } from "react-router-dom";
import Header from "../components/header/Header"

const Game = () => {
    return (
        <>
        <Header/>
        <Outlet></Outlet>
        <div>나는 게임페이지입니다.</div>
        </>
    )
}

export default Game;