import { Outlet } from "react-router-dom";
import Header from "../components/header/Header"
import Comment from "../components/comment/Comment"

const Game = () => {
    return (
        <>
        <Header/>
        <Outlet></Outlet>
        <Comment/>
        <div>나는 게임페이지입니다.</div>
        </>
    )
}

export default Game;