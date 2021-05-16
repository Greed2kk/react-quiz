import {
  FETCH_QUIZE_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RESTART,
  QUIZ_SET_STATE,
} from 'store/actions/actionTypes'
import quizData from 'fixtures/react_questions'

const initialState = {
  quizes: [],
  loading: false,
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  results: {},
  rightAnswers: 0,
  title: quizData.title,
  quiz: quizData.questions,
}

export default function quizReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return { ...state, loading: true }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: true,
        error: action.error,
      }
    case FETCH_QUIZE_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
        title: action.title,
      }
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
        rightAnswers: action.rightAnswers,
      }
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true,
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestion: action.questionNumber,
      }
    case QUIZ_RESTART:
      return {
        ...state,
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        rightAnswers: 0,
        results: {},
      }
    default:
      return state
  }
}
