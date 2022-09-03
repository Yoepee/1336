import { useState } from "react"
import { Table } from 'react-bootstrap';

const Chart = () => {
    const [title, setTitle] = useState("포인트 랭킹");
    const [desc, setDesc] = useState("전체");

    return (
        <div>
            <div>
                <p>랭킹리스트</p>
            </div>
            <div>
                <button onClick={()=>setTitle("포인트 랭킹")}>포인트 랭킹</button>
                <button onClick={()=>setTitle("승리 랭킹")}>승리 랭킹</button>
            </div>
            <div>
                <button onClick={()=>setDesc("전체")}>전체</button>
                <button onClick={()=>setDesc("카운터")}>카운터</button>
                <button onClick={()=>setDesc("홀짝")}>홀짝</button>
                <button onClick={()=>setDesc("주사위")}>주사위</button>
                <button onClick={()=>setDesc("로또")}>로또</button>
            </div>
            <div>
                <h4>{title}</h4>
                <p>{desc}</p>
                <Table>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>이름</th>
                            <th>점수</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Chart;