import { useState } from "react";
import styled from "styled-components";

const Oddeven = () => {
    let [count, setCount] = useState(Math.random);
    let [choice, setChoice] = useState("");
    let [number, setNum] = useState(null)
    let [result, setResult] = useState("골라주세요.");
    let [check, setCheck] = useState(false);
    let [bet, setBet] = useState("");

    // 홀짝을 골라서 정답이 나오는지 알 수 있는 알고리즘
    const test = (choice) => {
        if (number === null) return alert("홀, 짝을 골라주세요.");
        setCount(Math.floor(Math.random() * 1000));
        console.log(count)
        count % 2 === number ? setResult("정답입니다!!") : setResult("틀렸습니다!");
        setChoice("골라주세요.");
        setNum(null)
        setCheck(true);
    }
    return (
        <>
        <LogoBox>
        <Title_logo src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FclYy2e%2FbtrLqcfSSqY%2F5fobM3ap99PubvzjagNSNk%2Fimg.jpg"></Title_logo>
        </LogoBox>

        <StContainer>
            <div>
                <p>홀짝</p>
                {check ? <p>{result}</p> : null}
                <p>당신의 선택은 ? {choice}</p>
                <StButton onClick={() => { setChoice("홀"); setNum(1) }}>홀</StButton>
                <StButton onClick={() => { setChoice("짝"); setNum(0) }}>짝</StButton>
            </div>
            <div>
                <Label>
                <Input placeholder="배팅금액"
                    onChange={(e) => { setBet(e.target.value) }}
                    name="bet"
                    value={bet}
                    type="text" />
                <StButton>배팅하기</StButton>
                </Label>
            </div>
            <div>
                <GoButton onClick={() => { test(choice) }}>도전</GoButton>
                
            
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