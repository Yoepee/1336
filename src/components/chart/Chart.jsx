import { useState, useEffect } from "react"
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux/";

import { __getTable } from "../../redux/modules/table";

const Chart = () => {
    const dispatch = useDispatch();
    const [check, setCheck] = useState(false)
    const [title, setTitle] = useState("포인트 랭킹");
    const [desc, setDesc] = useState("전체");
    const { isLoading, error, data } = useSelector((state) => state.table);
    let [arr,setArr] = useState(new Array(30).fill(""));
    

    useEffect(() => {
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
    }, [dispatch, check])
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
    if (isLoading) {
        return <div>로딩 중....</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }
    return (
        <div>
            <div>
                <p>랭킹리스트</p>
                <button onClick={() => setCheck(true)}>갱신하기</button>
            </div>
            <div>
                <button onClick={() => setTitle("포인트 랭킹")}>포인트 랭킹</button>
                <button onClick={() => setTitle("승리 랭킹")}>승리 랭킹</button>
            </div>
            <div>
                <button onClick={() => setDesc("전체")}>전체</button>
                <button onClick={() => setDesc("카운터")}>카운터</button>
                <button onClick={() => setDesc("홀짝")}>홀짝</button>
                <button onClick={() => setDesc("주사위")}>주사위</button>
                <button onClick={() => setDesc("로또")}>로또</button>
            </div>
            <div>
                <h4>{title}</h4>
                <p>{desc}</p>
                <Table>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>이름</th>
                            {title === "포인트 랭킹"? <th>점수</th>:<th>승리</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {arr.map((a,i) => {
                            return (
                                    <tr key={i+1}>
                                        <td>{i+1}</td>
                                        <td>{a}</td>
                                        <td>Otto</td>
                                    </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Chart;