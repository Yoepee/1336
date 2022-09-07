import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __counter } from "../../../redux/modules/game/game";


const Counter = () => {
    const dispatch = useDispatch();
    let [count, setCount] = useState(0);
    let [timer, setTimer] = useState(30);
    let [start, setStart] = useState(false);
    // 타이머 기능 구현
    useEffect(() => {
        if(start){
            // 시간이 0보다 클때 타이머를 통해 state값 1씩 감소
            if (timer > 0) {
                setTimeout(() => {
                    setTimer(timer - 1);
                }, 1000);
            // 남은시간이 0이면 카운터감소 종료
            }else if(timer=0){
                setStart(false)
            }
        // 게임이 시작되지않으면 시간은 30으로 설정
        }else{
            setTimer(30);
        }
    }, [timer, start]);
    return (
        <div>
            <LogoBox>
            <Title_logo src="https://blog.kakaocdn.net/dn/ejBGoz/btrLzkyzUPt/ubqDQCLQx5dZUj69MT22V1/img.gif"></Title_logo>
            </LogoBox>
            <StContainer>
            <p>{count}</p>
            {/* 타이머의 시간이 10초 이내일때 빨간색으로 변경 */}
            {timer <= 10 ? <p style={{ color: "red" }}>남은 시간: {timer}초</p> : <p>남은 시간: {timer}초</p>}
            {/* 해당 버튼클릭으로 카운터 숫자 1씩 증가 (메인기능) */}
            <StButton onClick={() => {
                if (timer > 0&&start===true) { setCount(count + 1) }
            }}>나를 눌러줘</StButton>
            <div>
            <StButton onClick={()=>{setStart(true)}}>시작</StButton>
            <StButton onClick={() => timer === 0 ? (dispatch(__counter(count)), setCount(0)) : null}>점수 처리</StButton>
            <StButton onClick={() => {
                if (timer === 0) { setTimer(30); setCount(0); setStart(true); }
            }}>재시작</StButton>
            <StButton onClick={() => {
                setStart(false); setCount(0)
            }}>종료</StButton>
            
            </div>
            </StContainer>
        </div>
    )
}

export default Counter;


const StContainer = styled.div `
width:450px;
margin: 0 auto;
margin-top: 1rem;
border : 4px solid #eee;
border-radius: 12px;
padding:12px 24px 24px 24px;
background-size: 240px;

`;


const StButton = styled.button`
    padding: 8px 15px;
    font-size: 13px;
    border-radius: 5px;
    border: 1px solid #333;
    margin: 15px 8px 15px;
    background: #333;
    color: #fff;
    display: inline-block;
    line-height: normal;
    text-transform: uppercase;
    
    `

const LogoBox = styled.div `
width:450px;
margin: 0 auto;
margin-top: 4rem;
border : 4px solid transparent;

padding:12px 24px 24px 24px;
background-size: 240px; 


`
const Title_logo = styled.img`
display: inline-block;
max-width: 100%;
box-sizing: border-box;
margin-bottom: 1rem;

`
  