import Header from "../components/header/Header"
import Chart from "../components/chart/Chart"
// 순위 출력 페이지
const Ranking = () => {
    return (
        <>
        {/* 로그인 유무 검사 헤더 */}
        <Header/>
        {/* 랭킹 목록 선택 및 랭킹 목록 */}
        <Chart/>
        </>
    )
}

export default Ranking;