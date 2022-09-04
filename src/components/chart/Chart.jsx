import { useState, useEffect } from "react"
// 부트스트랩 사용법 검색해보면 좋을 것 같습니다 (리액트 부트스트랩)
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux/";

import { __getTable } from "../../redux/modules/table";
import styled from "styled-components";

const Chart = () => {
    //module 함수선언을 위한 dispatch
    const dispatch = useDispatch();
    // check = 갱신버튼을 활용하여 데이터를 받아오기 위함
    const [check, setCheck] = useState(false)
    // 점수, 승리, 게임종류 (홀짝, 주사위, 카운터, 로또)를 state변화 감지로 출력하는 내용
    const [title, setTitle] = useState("포인트 랭킹");
    const [desc, setDesc] = useState("전체");
    // database에 접근하여 가져옴 (redux랑 연결)
    const { isLoading, error, data } = useSelector((state) => state.table);
    // 현재 ""이 들어가 있는 30칸 짜리 배열 생성
    let [arr,setArr] = useState(new Array(30).fill(""));
    
    //값에 따라 필요한 함수를 통해 필요한 내용만 받아오도록... (현재 이걸 통해 작업하면 새로고침되는듯) (백엔드랑 연결하고 조치필요)
    useEffect(() => {
        //if문과 switch문으로 나누어서 랭킹중에서도 세부사항을 나눠서 고르도록 설정
        //default는 종합 랭킹 공개
        if(title === "포인트 랭킹"){
            switch(desc){
                case "카운터" : dispatch(__getTable()); break;
                case "홀짝": dispatch(__getTable()); break;
                case "주사위" : dispatch(__getTable()); break;
                case "로또" : dispatch(__getTable()); break;
                default: dispatch(__getTable()); break;
            }
        }
        if(title === "승리 랭킹"){
            switch(desc){
                case "카운터" : dispatch(__getTable()); break;
                case "홀짝": dispatch(__getTable()); break;
                case "주사위" : dispatch(__getTable()); break;
                case "로또" : dispatch(__getTable()); break;
                default: dispatch(__getTable()); break;
            }
        }
        //dispatch와 갱신 버튼 변동일 때만 반응
    }, [dispatch, check])
    // 버튼을 눌렀을 때 자연스럽게 나오도록 따로 작성 (백엔드랑 연결하고 조치필요) - 
    useEffect(() => {
        if(title === "포인트 랭킹"){
            switch(desc){
                case "카운터" :setArr(new Array(30).fill("b")); break;
                case "홀짝":setArr(new Array(30).fill("c")); break;
                case "주사위" : setArr(new Array(30).fill("d")); break;
                case "로또" : setArr(new Array(30).fill("e")); break;
                default: setArr(new Array(30).fill("a")); break;
            }
        }
        if(title === "승리 랭킹"){
            switch(desc){
                case "카운터" : setArr(new Array(30).fill("bb"));break;
                case "홀짝": setArr(new Array(30).fill("cc")); break;
                case "주사위" : setArr(new Array(30).fill("dd")); break;
                case "로또" : setArr(new Array(30).fill("ee")); break;
                default: setArr(new Array(30).fill("aa")); break;
            }
        }
    }, [title, desc])
    //isLoading이 true이면 컴포넌트의 return값 변경
    if (isLoading) {
        return <div>로딩 중....</div>;
    }
    //error이 true이면 컴포넌트의 return값 변경
    if (error) {
        return <div>{error.message}</div>;
    }
    // 조건문에 넣었을 때 false가 되는 경우를 찾아보시면 좋을듯 (ex> null, undefined 등)
    return (
        <div>
            <GameBox>
            <div>
                {/* 버튼을 누르면 포인트, 승리에 따라 출력하도록 변경 */}
                <CkButton onClick={() => setTitle("포인트 랭킹")}>포인트 랭킹</CkButton>
                <RsButton onClick={() => setCheck(true)}> | 갱신하기 |</RsButton>
                <CkButton onClick={() => setTitle("승리 랭킹")}>승리 랭킹</CkButton>
                
            </div>
            </GameBox>
            <div>
            <GameBox>
                {/* 게임 세부종목을 볼 수 있음 */}
                <Button onClick={() => setDesc("전체")}>전체</Button>
                <Button onClick={() => setDesc("카운터")}>카운터</Button>
                <Button onClick={() => setDesc("홀짝")}>홀짝</Button>
                <Button onClick={() => setDesc("주사위")}>주사위</Button>
                <Button onClick={() => setDesc("로또")}>로또</Button>
            </GameBox>
            </div>
            <div>
                <Group>
                <h4>{title}</h4>
                <p>{desc}</p>
                {/* 부트스트랩을 통한 테이블 생성 */}
                <Table>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>이름</th>
                            {title === "포인트 랭킹"? <th>점수</th>:<th>승리</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {/* map함수를 통한 차트 내용 출력 */}
                        {arr.map((a,i) => {
                            return (
                                    <tr key={i+1}>
                                        <td><div></div>🏆{i+1}</td>
                                        <td>{a}</td>
                                        <td>Otto</td>
                                    </tr>
                            )
                        })}
                    </tbody>
                </Table>
                </Group>
            </div>
        </div>
    )
}

export default Chart;


const Button = styled.button `
    border: 3px solid #333;
    background-color: #fff;
    border-radius: 8px;
    color: #333;
    font-size: 22px;
    padding: 13px 0;
    margin: 15px 15px 15px;
    width: 120px;
    display: inline-block;
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
   
`;


const GameBox = styled.div `
display: flex;
//flex,justify,align-item  많이쓰는세트
margin-top: 4rem;
padding:12px 12px 24px auto;
background-size: 240px;
justify-content: center;
margin-top: 1rem;
//border:1px solid red

`;

const Group = styled.div `
width:450px;
margin: 0 auto;
margin-top: 4rem;
justify-content: space-between;
border : 4px solid #eee;
border-radius: 12px;
padding:12px 24px 24px 24px;
background-size: 240px;

`;

const CkButton = styled.button`
    border: 1px solid #333;
    background:#333;
    color: #fff;
    border-radius: 10px;
    font-size: 19px;
    padding: 13px 0;
    margin: 15px 15px 15px;
    width: 200px;
    display: inline-block;
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
   
`;
    
const RsButton = styled.button`
    border: 1px solid #c90a0a;
    background:#c90a0a;
    color: #fff;
    border-radius: 10px;
    font-size: 19px;
    padding: 13px 0;
    margin: 15px 15px 15px;
    width: 200px;
    display: inline-block;
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
   
`;
    