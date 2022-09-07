import FormSignup from "../components/form/formSignup/FormSignup";
import LoginHeader from "../components/header/LoginHeader";
// 회원가입 페이지
const Signup = () => {
    return (
        <div>
            {/* 로그인 유무 검사기능 없는 헤더 */}
            <LoginHeader/>
            {/* 회원가입 컴포넌트 */}
            <FormSignup />
           
        </div>
    )
}

export default Signup;

