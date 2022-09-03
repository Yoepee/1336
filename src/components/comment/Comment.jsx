import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getComment, createComment } from "../../redux/modules/comment";

const Comment = () => {
    const dispatch = useDispatch();
    let a = window.location.href.split('/')
    console.log(a)
    let game = a[4];
    const initialState = {
        content: "",
        game: game
    }
    const [comment,setComment] = useState(initialState);

    const { isLoading, error, data } = useSelector((state) => state.comment);
    
    useEffect(() => {
        dispatch(__getComment());
    }, [dispatch]);

    if (isLoading) {
        return <div>로딩 중....</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

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