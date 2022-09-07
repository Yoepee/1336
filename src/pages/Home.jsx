import Header from "../components/header/Header"
import Choice from "../components/choice/Choice"

// 로그인 시 연결되는 메인 페이지
const Home = () => {
    return (
        <>
        {/* 로그인 유무 검사 헤더 */}
        <Header/>
        {/* 메뉴선택 지원 컴포넌트 */}
        <Choice/>
        </>
    )
}

export default Home;