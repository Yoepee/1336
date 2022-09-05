const Table = ({title, a}) => {
    return <tr>
        <td>1</td>
        <td>{a?.nickName}</td>
        {title === "포인트 랭킹" ?
            <td>{a?.totalPoint}</td> :
            <td>{a?.totalWinCount}</td>
        }
    </tr>
}

export default Table;