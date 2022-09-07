
import styled from "styled-components";
import { Form } from 'react-bootstrap';
import {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";

import { __lotto, __myresult, __lottoresult } from "../../../redux/modules/game/lotto";

const Lotto = () => {
    let dispatch = useDispatch();
    let {data} = useSelector((state)=>state.lotto)
    // es6문법 숫자배열 만들기
    let range = [...Array(20)].map((v, i) => i);
    // var range2 = [...Array(5).keys()].map(i => i);
    // var range3 = Array.from({length: 5}, (v,i) => i);
    let [check, setCheck] = useState(0);
    let [result,setResult] = useState(false);
    let [arr, setArr] = useState([]);
    // 체크박스 제한걸기
    const countChecked = (e) => {
        // 6개까지 체크여부 확인
        if(check>5){
            // 해당인자가 있는지 확인
            let index= arr.findIndex((a) => a === e.target.value)
            // 체크된 값을 눌렀을 때 제한결과값이 아닌 체크해제 적용하기 위함.
            if(index === -1){
                e.preventDefault()
                alert("최대 6개까지 선택 가능합니다.")
            }
        }
        // 체크확인을 위한 count (몇개 찍었는지 보는내용)
        if(e.target.checked){
            if(check<6){
                setCheck(check+1);
                // 선택한 체크박스를 배열형식으로 저장
                setArr([...arr,e.target.value])
            }
        // 체크를 눌렀다가 해제했을 때 동작하는 내용
        }else{
            setCheck(check-1)
            // 배열형식으로 저장된 내용을 수정하는 부분 (체크 해제된 내용을 찾아서 배열에서 제거)
            let index= arr.findIndex((a) => a === e.target.value)
            let copy = arr;
            console.log(copy.splice(index,1))
        }
    }
    const sellLotto = (e) => {
        if(check!==6)
            alert("6개를 선택해주세요.")
        else{
            // 보내주는 형태에 맞게 전송
            dispatch(__lotto({num1:Number(arr[0]), num2: Number(arr[1]), num3: Number(arr[2]), num4: Number(arr[3]), num5: Number(arr[4]), num6: Number(arr[5])}))
        }
    }
    useEffect(()=>{
        // 랜더링이 되면 본인의 최근 당첨결과를 불러오는 액션 동작
        dispatch(__myresult())
    },[dispatch])

    return (
        
        <div>
        <LogoBox>
        <Title_logo src="https://blog.kakaocdn.net/dn/Wflzc/btrLu3dFy68/qop9TRah6EMP9r3U8tj3Wk/img.gif"></Title_logo>
        </LogoBox>
        
            <Form>
            <StForm>
                <LottoBox src="">
                <Boxchk>
                {/* 맵함수를 통한 체크박스 복사 */}
                {['checkbox'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        {range.map((num,i) => {
                            return (
                                <StLotto key={i}>
                                <Form.Check
                                    inline
                                    label={num+1}
                                    name="group1"
                                    type={type}
                                    value={num+1}
                                    id={`inline-${type}-2`}
                                    onClick={countChecked}
                                />
                                </StLotto>
                            )
                        })}
                    </div>
                ))}
                </Boxchk>
                </LottoBox>

                
                <InfoBox src="">
               

                {/* 본인의 당첨번호 클릭을 누르면 나오는 부분 */}

                {result?
               
               <HaHa>
                <Label>
                <p>회차 : {data?.data[0]?.no} </p>
                </Label>
                <Label>
                {data?.data[0]?.luckyNum ==="아직 실행되지않은 회차입니다."?<p>당첨번호 : {data?.data[0]?.luckyNum} </p>
                :<p>당첨번호 : {data?.data[0]?.luckyNum[0]}, {data?.data[0]?.luckyNum[1]}, {data?.data[0]?.luckyNum[2]}, {data?.data[0]?.luckyNum[3]}, {data?.data[0]?.luckyNum[4]}, {data?.data[0]?.luckyNum[5]}</p>}
                </Label>
                <Label>
                <p>보너스 번호 : {data?.data[0]?.bonusNum} </p>
                </Label>
                <Label>
                <p>나의 번호 : {data?.data[0]?.myNum[0]}, {data?.data[0]?.myNum[1]}, {data?.data[0]?.myNum[2]}, {data?.data[0]?.myNum[3]}, {data?.data[0]?.myNum[4]}, {data?.data[0]?.myNum[5]}</p>
                </Label>
                <Label>
                {data?.data[0]?.rank==="아직 실행되지않은 회차입니다."?<p>당첨 등수 : {data?.data[0]?.rank} </p>
                :<p>당첨 등수 : {data?.data[0]?.rank} </p>}
                </Label>
                <Label>
                <p>획득 점수 : {data?.data[0]?.earnPoint} </p>
                </Label>
                </HaHa>
                :null}
                
                </InfoBox>
                </StForm>
                <ButtonBox>
                <div>
                <GoButton type="button" onClick={()=>{dispatch(__lotto({num1:0, num2: 0, num3: 0, num4: 0, num5: 0, num6: 0}))}}>랜덤로또</GoButton>
                <GoButton type="button" onClick={()=>{sellLotto()}}>로또구매</GoButton>
                </div>
                <div>
                <GoButton type="button" onClick={()=>{dispatch(__lottoresult())}}>당첨번호조회</GoButton>
                <GoButton type="button" onClick={()=>{dispatch(__myresult())
                if(result) {setResult(false)} else {setResult(true)}}}>당첨결과</GoButton>
                </div>
                </ButtonBox>
            </Form>
            
        </div>
    )
}

export default Lotto;

const StForm = styled.div`
width:800px;
height:500px;
margin: 0 auto;
margin-top: 2rem;
margin-bottom: 1rem;
border : 4px solid transparent;
padding:12px 12px 12px 12px;
background-size: 240px;
background-color: #fff;
display: flex;
border-radius: 8px;
`;

const HaHa = styled.div`
width: 300px;
height: 240px;
margin-top: 7rem;
justify-content: left;
align-content:left; 
    
`


const LogoBox = styled.div `
width:450px;
margin: 0 auto;
margin-top: 4rem;
border : 4px solid transparent;
padding:12px 24px 24px 24px;
background-size: 240px; 
`;
const Title_logo = styled.img`
display: inline-block;
max-width: 100%;
box-sizing: border-box;
margin-bottom: 1rem;
`;

const LottoBox = styled.div `
   width: 400px;
   height: 500px;
   background-image: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcc6PEY%2FbtrLukfDTE7%2FENpAWcpuOL68elVc4SQov1%2Fimg.png");
   display: flex;
   justify-content: center;
   align-items: center;
`;

const StLotto = styled.div`
    padding: 4px 6px;
    font-size: 15px;
    border-radius: 15px;
    border: 1px solid #E04F5C;
    margin: 15px 8px 15px;
    background: #fff;
    text-align: center;
    color: #E04F5C;
    display: inline-block;
    line-height: normal;
    text-transform: uppercase;
    `;

    const GoButton = styled.button`
    padding: 8px 15px;
    font-size: 20px;
    border-radius: 5px;
    border: 1px solid transparent;
    margin: 15px 8px 15px;
    background: #ffcc01;
    color: #c00a0a;
    display: inline-block;
    line-height: normal;
    text-transform: uppercase;
    `;

    const Boxchk = styled.div `
    width:480px;
    margin: 0 auto;
    margin-top: 4rem;
    border : 4px solid transparent;
    padding:12px 24px 24px 24px;
    background-size: 240px; 
    `;

const InfoBox = styled.div `
width:350px;
height: 470px;
margin-top: 2rem;
border : 4px solid #fff;
background-image: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbyObGD%2FbtrLAqlWNVl%2FbeGeZjgyMXTxEy5PcFXkhK%2Fimg.png");
background-repeat: no-repeat;
padding:12px 12px 12px 12px;
background-size: 350px;

`;
const Label = styled.label `

    overflow: hidden;
    height: 35px;
    display: block;
    width: 290px;
    display: inline-block;
    justify-content: center;
    margin:  2px 6px 4px 10px;
    border: 1px solid transparent;
    color: black;
    text-align: left;
    font-family :'Song Myung', serif;
    font-size: 22px;
`;

const ButtonBox = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`