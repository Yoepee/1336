import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux/";
import { useEffect } from "react";

import { __getMember } from "../../redux/modules/member";

const Info = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let {id} = useParams();
    const { isLoading, error, data } = useSelector((state) => state.member);
    
    useEffect(() => {
        dispatch(__getMember());
    }, [dispatch]);

    if (isLoading) {
        return <div>로딩 중....</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }
    let info = data.find((user)=>{
        return String(user.id) == id
    })
    return (
        <div>
            <div>
                <p>ID : {info?.id}</p>
            </div>
            <div>
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