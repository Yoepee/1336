import FormLogin from "../components/form/formLogin/FormLogin"
import LoginHeader from "../components/header/LoginHeader";
// 로그인 페이지
const Login = () => {
    return (
        <div>
            {/* 로그인 유무 검사기능 없는 헤더 */}
            <LoginHeader/>
            {/* 로그인 컴포넌트 */}
            <FormLogin />
        </div>
    )
}

export default Login;