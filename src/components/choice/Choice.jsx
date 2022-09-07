import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Choice = () => {
    let navigate = useNavigate();
    return (
        <div>
            {/* img 로고 경로지정 */}
                <Chart_logo src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLHzXN%2FbtrLxZHXxbQ%2FFQL1KdYmGgo7ImbcxuxdC0%2Fimg.png" onClick={() => { navigate("/chart") }}></Chart_logo>
            <div>

            </div>
            <div>
                {/* 버튼클릭시 게임페이지 이동 */}
            <GameBox>
                <Button onClick={() => { navigate("/game/4") }}> 카운터 </Button>
                <Button onClick={() => { navigate("/game/1") }}> 홀짝 </Button>
                <Button onClick={() => { navigate("/game/2") }}> 주사위 </Button>
                <Button onClick={() => { navigate("/game/3") }}> 로또 </Button>
            </GameBox>

            </div>
        </div>
    )
}

export default Choice;

const GameBox = styled.div `
display: flex;
margin-top: 1rem;
padding:12px 24px 24px 24px;
background-size: 240px;

`;

const Chart_logo = styled.img`
height:120px;

`

const Button = styled.button `
    border: 1px solid #333;
    background: #333;
    color: #fff;
    font-size: 19px;
    padding: 13px 0;
    margin: 15px 15px 15px;
    width: 400px;
    display: inline-block;
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
`;

const StButton = styled.button `
    outline: none;
    border-width: 1px;
    border-style: solid;
    box-sizing: border-box;
    border-radius: 4px;
    line-height: 1;
    font-weight: 500;
    transition: background-color 0.3s ease 0s, border-color 0.3s ease 0s;
    text-decoration: none;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    user-select: none;
    white-space: nowrap;
    max-width: 100%;
    height: 42px;
    font-size: 15px;
    padding: 0px 22px;
    min-width: 64px;
    background-color: transparent;
    border-color: transparent;
    color: rgb(48, 52, 65);
    margin-right: 16px;
    `
