import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux/";
import { useEffect } from "react";
import styled from "styled-components";

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
        return String(user.id) === id
    })
    return (
        <div>
            <InfoBox>
            <div>
                <Label>
                <p>ID : {info?.id}</p></Label>
            </div>
            <div>
            <Label>
                <p>닉네임 : {info?.nickName}</p></Label>
            </div>
            <div>
            <Label>
                <p>보유코인 : (받을 예정)</p></Label>
            </div>
            <div>
            <Label>
                <p>승리 수 : (받을 예정)</p></Label>
            </div>
            <div>
                <Button onClick={()=>{navigate("/login")}}>회원탈퇴</Button>
            </div>
            </InfoBox>
        </div>
    )
}

export default Info;

const InfoBox = styled.div `
width:450px;
margin: 0 auto;
margin-top: 4rem;
border : 4px solid #eee;
border-radius: 12px;
padding:12px 24px 24px 24px;
background-size: 240px;

`;
const Label = styled.label `
    overflow: hidden;
    display: block;
    width: 100%;
    margin: 0 0 8px 0;
    border: 1px solid #eee;
    color: #8F8F91;
`;

const Button = styled.button `
    border: 1px solid #333;
    background: #333;
    color: #fff;
    font-size: 17px;
    padding: 13px 0;
    margin: 15px 0 0;
    width: 400px;
    display: inline-block;
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
`;