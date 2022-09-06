import { configureStore } from '@reduxjs/toolkit'
import comment from "./modules/comment/comment"
// import lotto from "./modules/lotto"
import member from "./modules/member"
import login from "./modules/login"
import admin from './modules/admin'

import id from './modules/check/id'
import name from './modules/check/name'
import adult from './modules/check/adult'

import image from './modules/img'

import ranking from './modules/ranking'
import game from './modules/game/game'

// import값을 .reducer로 넘겨줄시에는 밑에 리듀서에 .reducer적지 말 것
export default configureStore({
    reducer: { 
        //comment : 댓글, lotto : 생성예정, member : 유저 정보 , table : 랭킹 차트
        // lotto : lotto.reducer,
        game: game.reducer,

        comment : comment.reducer,
        member : member.reducer,
        login : login.reducer,
        admin : admin.reducer,

        id : id.reducer,
        name : name.reducer,
        adult : adult.reducer,

        ranking: ranking.reducer,

        image: image.reducer
    }
})