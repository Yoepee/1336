import { Outlet } from "react-router-dom";
import Header from "../components/header/Header"
import Comment from "../components/comment/Comment"

// 게임으로 연결되는 페이지
const Game = () => {
    return (
        <>
        {/* 로그인 유무 검사 헤더 */}
        <Header/>
        {/* Outlet을 통해 중첩라우터에 대한 내용을 담을 위치 지정 */}
        <Outlet></Outlet>
        {/* 게임 아래쪽에 댓글 작성 컴포넌트 */}
        <Comment/>
        </>
    )
}

export default Game;