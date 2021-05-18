import openNotification from 'components/UI/Notification/Notification'
import axios from 'axios/axios-quiz'
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

export function fetchQuizesStart() {
  return { type: FETCH_QUIZES_START }
}

export function fetchQuizesSuccess(quizes) {
  return { type: FETCH_QUIZES_SUCCESS, quizes }
}

export function fetchQuizesError(error) {
  openNotification(error.name, error.message)
  console.error(error)
  return { type: FETCH_QUIZES_ERROR, error }
}

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('/quizes.json')
      const quizes = []
      Object.keys(response.data).forEach(key => {
        quizes.push({
          id: key,
          name: `Quiz: ${response.data[key].title}`,
        })
      })
      dispatch(fetchQuizesSuccess(quizes))
    } catch (error) {
      dispatch(fetchQuizesError(error))
    }
  }
}

export function fetchQuizeSuccess(quiz) {
  return {
    type: FETCH_QUIZE_SUCCESS,
    quiz: quiz.questions,
    title: quiz.title,
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get(
        `/quizes/${quizId}.json`
      )
      const quiz = response.data
      dispatch(fetchQuizeSuccess(quiz))
    } catch (error) {
      dispatch(fetchQuizesError(error))
    }
  }
}

export function quizSetState(
  answerState,
  results,
  rightAnswers
) {
  return {
    type: QUIZ_SET_STATE,
    results,
    answerState,
    rightAnswers,
  }
}

export function finishQuiz() {
  return { type: FINISH_QUIZ }
}

export function quizNextQuestion(questionNumber) {
  return { type: QUIZ_NEXT_QUESTION, questionNumber }
}

function finishedQuiz(state) {
  const { quiz, activeQuestion } = state
  return quiz.length === activeQuestion + 1
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz
    const {
      activeQuestion,
      quiz,
      rightAnswers,
      results,
    } = state
    const currentQuestion = quiz[activeQuestion]

    const delayAnswerCheck = setTimeout(() => {
      if (finishedQuiz(state)) {
        dispatch(finishQuiz())
      } else {
        dispatch(quizNextQuestion(activeQuestion + 1))
        clearTimeout(delayAnswerCheck)
      }
    }, 1000)

    if (currentQuestion.correctAnswerId === answerId) {
      dispatch(
        quizSetState(
          {
            [answerId]: 'Right',
          },
          { ...results, [activeQuestion]: 'Right' },
          rightAnswers + 1
        )
      )
    } else {
      dispatch(
        quizSetState(
          { [answerId]: 'Wrong' },
          { ...results, [activeQuestion]: 'Wrong' },
          rightAnswers
        )
      )
    }
  }
}

export function restartQuiz() {
  return {
    type: QUIZ_RESTART,
  }
}
