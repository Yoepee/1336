import Header from "../components/header/Header"
import Manage from "../components/manage/Manage"

//관리자 페이지 (유저에게 포인트 제공 기능)
const Admin = () => {
    return (
        <>
        <Header/>
        <Manage/>
        <div>나는 관리자페이지입니다.</div>
        </>
    )
}

export default Admin;