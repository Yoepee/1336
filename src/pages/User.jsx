import Header from "../components/header/Header"
import Info from "../components/info/Info"
// 유저정보 페이지
const User = () => {
    return (
        <>
        {/* 로그인 유무 검사 헤더 */}
        <Header/>
        {/* 유저정보 컴포넌트 */}
        <Info/>
        </>
    )
}

export default User;