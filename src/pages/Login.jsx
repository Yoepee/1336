import FormLogin from "../components/form/formLogin/FormLogin"
import LoginHeader from "../components/header/LoginHeader";
// 로그인 페이지
const Login = () => {
    return (
        <div>
            <LoginHeader/>
            <FormLogin />
        </div>
    )
}

export default Login;