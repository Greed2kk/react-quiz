import {
  ADD_QUIZ_TITLE,
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
} from 'store/actions/actionTypes'

const initialState = {
  quiz: { title: 'Мой квиз', questions: [] },
}

export default function createReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: {
          ...state.quiz,
          questions: [...state.quiz.questions, action.item],
        },
      }
    case ADD_QUIZ_TITLE:
      return {
        ...state,
        quiz: {
          ...state.quiz,
          title: action.title,
        },
      }

    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quizId: action.quizId,
        quiz: {
          questions: [],
          title: '',
        },
      }

    default:
      return state
  }
}
