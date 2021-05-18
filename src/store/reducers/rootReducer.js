import { combineReducers } from 'redux'
import quizReducer from 'store/reducers/quiz'
import createReducer from 'store/reducers/create'
import authReducer from 'store/reducers/auth'

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer,
})
