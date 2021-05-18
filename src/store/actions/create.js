import {
  ADD_QUIZ_TITLE,
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
} from 'store/actions/actionTypes'
import openNotification from 'components/UI/Notification/Notification'
import axios from 'axios/axios-quiz'

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  }
}

export function resetQuizCreation(quizId) {
  return { type: RESET_QUIZ_CREATION, quizId }
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        '/quizes.json',
        getState().create.quiz
      )
      openNotification('success', response.statusText)
      dispatch(resetQuizCreation(response.data.name))
    } catch (error) {
      openNotification(error.name, error.message)
      console.error(error)
    }
  }
}

export function modalInputTitle(title) {
  return {
    type: ADD_QUIZ_TITLE,
    title,
  }
}
