import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux/";
import { useEffect } from "react";

import { __getMember } from "../../redux/modules/member";
//  유저 세부정보를 출력하는 페이지
const Info = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    // 경로를 통해 id값을 받아옴 (아마 토큰을 통해 권한 설정기능 필요하게 될 듯)
    let {id} = useParams();
    // 데이터받아오기
    const { isLoading, error, data } = useSelector((state) => state.member);
    // useEffect를 통한 불필요한 비동기 동작 제어
    useEffect(() => {
        dispatch(__getMember());
    }, [dispatch]);

    if (isLoading) {
        return <div>로딩 중....</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }
    // params에서 제공하는 url id값과 데이터베이스에서 보내준 정보와 대조 (아마 연결하고나서는 다르게 써야할듯)
    let info = data.find((user)=>{
        return String(user.id) === id
    })
    // 아이디, 닉네임, 보유코인, 승리횟수, 탈퇴기능까지 연결 (프로필 사진과 정보수정 기능 추가 예정?)
    return (
        <div>
            <div>
                {/* 옵셔널 체이닝을 통한 없는 데이터 나올 때 페이지 에러가 나지않도록함 */}
                <p>ID : {info?.id}</p>
            </div>
            <div>
                {/* 옵셔널 체이닝을 통한 없는 데이터 나올 때 페이지 에러가 나지않도록함 */}
                <p>닉네임 : {info?.nickName}</p>
            </div>
            <div>
                <p>보유코인 : (받을 예정)</p>
            </div>
            <div>
                <p>승리 수 : (받을 예정)</p>
            </div>
            <div>
                <button onClick={()=>{navigate("/login")}}>회원탈퇴</button>
            </div>
        </div>
    )
}

export default Info;