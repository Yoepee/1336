import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getComment, createComment } from "../../redux/modules/comment";

const Comment = () => {
    const dispatch = useDispatch();
    // url경로값을 받아오기 위한 내용 (받아오고 "/" 기준으로 값을 나눠서 배열 형식으로 저장)
    let a = window.location.href.split('/')
    // 배열의 마지막 값만 있으면 되서 이렇게작성
    let game = a[a.length-1];
    // 게임 종류와 댓글 내용을 추가함 (게임종류는 url을 통한 고정값)
    const initialState = {
        content: "",
        game: game
    }
    // 데이터베이스에 보내주기위한 인자 설정
    const [comment,setComment] = useState(initialState);
    // 데이터 받아오기
    const { isLoading, error, data } = useSelector((state) => state.comment);
    // useEffect를 통한 불필요한 비동기 동작 제어
    useEffect(() => {
        dispatch(__getComment());
    }, [dispatch]);
     //isLoading이 true이면 컴포넌트의 return값 변경
     if (isLoading) {
        return <div>로딩 중....</div>;
    }
    //error이 true이면 컴포넌트의 return값 변경
    if (error) {
        return <div>{error.message}</div>;
    }
    // 조건문에 넣었을 때 false가 되는 경우를 찾아보시면 좋을듯 (ex> null, undefined 등)
    let commentList = data?.filter((review)=>{
        return review.game === game;
      })
    return (
        <>
            <div>
                <input placeholder="내용"
                    onChange={(e)=>{setComment({...comment,content:e.target.value})}}
                    name="comment"
                    value={comment.content}
                    type="text" />
                <button onClick={()=>dispatch(createComment(comment))}>댓글 작성</button>
            </div>
            <div>
                {commentList?.map((review)=>{
                    return (
                        <div key={review.id}>
                            <p>작성자 :</p>
                            <p>내용: {review.content}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Comment;