import Header from "../components/header/Header"
import Manage from "../components/manage/Manage"

//관리자 페이지 (유저에게 포인트 제공 기능)
const Admin = () => {
    return (
        <>
        {/* 로그인 유무 검사 헤더 */}
        <Header/>
        {/* 유저목록 및 포인트 지급 컴포넌트 */}
        <Manage/>
        </>
    )
}

export default Admin;