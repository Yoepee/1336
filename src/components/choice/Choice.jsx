import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Choice = () => {
    let navigate = useNavigate();
    return (
        <div>
                <StButton onClick={() => { navigate("/chart") }}> 랭킹보기 </StButton>
                <StButton onClick={() => { navigate("/admin/:id") }}> 관리자 </StButton>
            <div>

            </div>
            <div>
            <GameBox>
                <Button onClick={() => { navigate("/game/counter") }}> 카운터 </Button>
                <Button onClick={() => { navigate("/game/oddeven") }}> 홀짝 </Button>
                <Button onClick={() => { navigate("/game/dice") }}> 주사위 </Button>
                <Button onClick={() => { navigate("/game/lotto") }}> 로또 </Button>
            </GameBox>

            </div>
        </div>
    )
}

export default Choice;

const GameBox = styled.div `
display: flex;
//flex,justify,align-item  많이쓰는세트
margin-top: 1rem;
padding:12px auto 24px 24px;
background-size: 240px;
justify-content: center;
//border:1px solid red

`;

const Button = styled.button `
    border: 3px solid #333;
    background-color: #333;
    border-radius: 8px;
    color: #fff;
    font-size: 22px;
    padding: 13px 0;
    margin: 15px 15px 15px;
    width: 200px;
    display: inline-block;
    text-align: center;
    font-weight: 400;
    
   
   
`;

const StButton = styled.button `
    border-width: 1px;
    border-radius: 12px;
    border-style: solid;
    padding: 7px 17px;
    margin: 15px 15px 15px;
    border: 1px solid #c00a0a;
    background: #c00a0a;
    color: rgb(255, 255, 255);
`;
