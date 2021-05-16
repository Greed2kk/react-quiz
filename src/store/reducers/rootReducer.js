import { combineReducers } from 'redux'
import quizReducer from 'store/reducers/quiz'
import createReducer from 'store/reducers/create'

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
})
