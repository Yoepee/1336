import { configureStore } from '@reduxjs/toolkit'
import comment from "./modules/comment/comment"
// import lotto from "./modules/lotto"
import member from "./modules/member"
import login from "./modules/login"
import admin from './modules/admin'

import id from './modules/check/id'
import name from './modules/check/name'
import adult from './modules/check/adult'

import image from './modules/image'

import ranking from './modules/ranking'
import game from './modules/game/game'
import manager from './modules/check/manager'
import lotto from './modules/game/lotto'

// import값을 .reducer로 넘겨줄시에는 밑에 리듀서에 .reducer적지 말 것
export default configureStore({
    reducer: { 
        // 게임 기능 리듀서
        game: game.reducer,
        lotto: lotto.reducer,
        // 댓글 리듀서
        comment : comment.reducer,
        // 마이페이지 정보
        member : member.reducer,
        // 로그인 시행
        login : login.reducer,
        // 관리자 확인
        admin : admin.reducer,

        // 계정 중복검사
        id : id.reducer,
        // 닉네임 중복검사
        name : name.reducer,
        // 성인인증
        adult : adult.reducer,
        // 관리자 유무 체크
        manager:manager.reducer,
        // 랭킹 목록
        ranking: ranking.reducer,
        // 이미지정보 저장
        image: image.reducer
    }
})