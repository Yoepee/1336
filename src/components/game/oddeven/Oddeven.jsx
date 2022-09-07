import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __oddeven } from "../../../redux/modules/game/game";

const Oddeven = () => {
    const dispatch = useDispatch();
    let [choice, setChoice] = useState("");
    let [number, setNum] = useState(null)
    let [bet, setBet] = useState("");
    let [sum, setSum] = useState(false)
    // 숫자만 배팅금액으로 입력하도록 하는 유효성검사
    let reg = /^[0-9]+$/;
    // 숫자가 아니면 경고메세지가 출력되도록 조건문
    useEffect(()=>{
        if(!reg.test(bet)){
            setSum("true");
        }else{
            setSum("false");
        }
    }, [bet])

    return (
        <>
        <LogoBox>
        <Title_logo src="https://blog.kakaocdn.net/dn/beE3WF/btrLzRWXwk6/KrL0myPpLv7cs3nGBklCh1/img.gif"></Title_logo>
        </LogoBox>

        <StContainer>
            <div>
                <p>홀짝</p>
                <p>당신의 선택은 ? {choice}</p>
                <StButton onClick={() => { setChoice("홀"); setNum(1) }}>홀</StButton>
                <StButton onClick={() => { setChoice("짝"); setNum(2) }}>짝</StButton>
            </div>
            <div>
                <Label>
                <Input placeholder="배팅금액"
                    onChange={(e) => { setBet(e.target.value) }}
                    name="bet"
                    value={bet}
                    type="text" />
                </Label>
                {/* 배팅금액이 유효성검사에 걸리면 나오게 되는 경고문구 */}
                {sum === "true" && bet !==""?
                <p style={{color:"red"}}>숫자만 입력해주세요.</p>
                :null}
            <div>
            </div>
                <GoButton onClick={() => { if(choice==="")alert("번호를 골라주세요.");
                    else if(bet.trim()===""||sum==="true")alert("배팅금액을 입력해주세요.");
                    else{dispatch(__oddeven({point:bet,number:number}))} }}>도전</GoButton>
                
            
            </div>
            </StContainer>
        </>

    )
}

export default Oddeven;

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
    font-size: 18px;
    border-radius: 5px;
    border: 1px solid #c00a0a;
    background: #c90a0a;
    color : #fff;
    margin: 15px 8px 15px;
    
    `;

const GoButton = styled.button`
padding: 8px 15px;
font-size: 20px;
border-radius: 5px;
border: 1px solid ;
margin: 15px 8px 15px;
background: #ffcc01;
color: #c00a0a;
display: inline-block;
line-height: normal;
text-transform: uppercase;
`;

const Label = styled.label `
overflow: hidden;
display: block;
width: 100%;
margin: 0 0 8px 0;
border: 1px solid #eee;
color: #8F8F91;
`;

const Input = styled.input`
width: 75%;
height: 25px;
line-height: 28px;
text-align: center;
padding: 0px 0px 2px 5px;
border: 0 none;
color: #c00a0a;
`;

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