import { configureStore } from '@reduxjs/toolkit'
import comment from "./modules/comment"
import lotto from "./modules/lotto"
import member from "./modules/member"

export default configureStore({
    reducer: { 
        comment : comment.reducer,
        lotto : lotto.reducer,
        member : member.reducer
    }
})