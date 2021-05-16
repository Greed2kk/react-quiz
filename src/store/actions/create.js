import {
  ADD_QUIZ_TITLE,
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
} from 'store/actions/actionTypes'
import openNotification from 'components/UI/Notification/Notification'
import axios from 'axios/axios-quiz'
import { useHistory } from 'react-router-dom'

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  }
}

export function resetQuizCreation() {
  return { type: RESET_QUIZ_CREATION }
}

export function finishCreateQuiz() {
  const history = useHistory()
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        '/quizes.json',
        getState().create.quiz
      )
      history.push('/home')
      this.props.history.push('/main')
      openNotification('success', response.statusText)
      dispatch(resetQuizCreation())
    } catch (error) {
      history.push('/home')
      this.props.history.push('/main')
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
