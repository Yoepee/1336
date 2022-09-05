import { configureStore } from '@reduxjs/toolkit'
import comment from "./modules/comment"
// import lotto from "./modules/lotto"
import member from "./modules/member"
import login from "./modules/login"

import id from './modules/id'
import name from './modules/name'
import adult from './modules/adult'

import ranking from './modules/ranking'

// import값을 .reducer로 넘겨줄시에는 밑에 리듀서에 .reducer적지 말 것
export default configureStore({
    reducer: { 
        //comment : 댓글, lotto : 생성예정, member : 유저 정보 , table : 랭킹 차트
        comment : comment.reducer,
        // lotto : lotto.reducer,
        member : member.reducer,
        login : login.reducer,

        id : id.reducer,
        name : name.reducer,
        adult : adult.reducer,

        ranking: ranking.reducer
    }
})