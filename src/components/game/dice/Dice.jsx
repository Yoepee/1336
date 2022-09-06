import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __dice } from "../../../redux/modules/game/game";

const Dice = () => {
    const dispatch = useDispatch();
    let [count, setCount] = useState(Math.floor(Math.random() * 1000));
    let [choice, setChoice] = useState("");
    let [result, setResult] = useState("골라주세요.");
    let [check, setCheck] = useState(false);
    let [bet, setBet] = useState("");

    // const test = (choice) => {
    //     if (choice === "골라주세요.") return alert("번호를 골라주세요.");
    //     setCount(Math.floor(Math.random() * 1000));
    //     (count % 6) + 1 === choice ? setResult(`결과 : ${(count % 6) + 1} 정답입니다!!`)
    //         : setResult(`결과 : ${(count % 6) + 1} 틀렸습니다!`);
    //     setChoice("골라주세요.");
    //     setCheck(true);
    // }
    return (
        <> 
        <LogoBox>
        <Title_logo src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbbFMeH%2FbtrLiVsMoN5%2Fxe0tjUQkFRqxnLTDkDzVyk%2Fimg.jpg"></Title_logo>
        </LogoBox>
        <StContainer>
            <div>
            <Label>
                <p>주사위</p>
                {check ? <p>{result}</p> : null}
                <p>당신의 선택은 ? {choice}</p>
                </Label>
            </div>
            <div>
                {[1, 2, 3, 4, 5, 6].map((set) => {
                    return (<StButton onClick={() => {
                        setChoice(set);
                    }} key={set}>{set}</StButton>)
                })}
            </div>
            <div>
                <Label>
                <Input placeholder="배팅할 코인금액을 적어주세요"
                    onChange={(e) => { setBet(e.target.value) }}
                    name="bet"
                    value={bet}
                    type="text" />
                {/* <StButton>배팅하기</StButton> */}
                </Label>
            </div>
            <div>
                <GoButton onClick={() => { dispatch(__dice({point:bet,number:choice})) }}>도전</GoButton>
            </div>

            </StContainer> 
        </>
    )
}

export default Dice;

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
    border: 1px solid #c90a0a;
    margin: 15px 8px 15px;
    background: #c90a0a;
    color: #fff;
    display: inline-block;
    line-height: normal;
    text-transform: uppercase;
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
padding: 0px 0px 2px 5px;
text-align: center;
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
  