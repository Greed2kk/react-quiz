import React from 'react'
import classes from './ResultQuiz.module.scss'
import WithClasses from '../hoc/withClasses'

const ResultQuiz = ({ rightAnswers, totalQuestions }) => (
  <>
    <h1>Ваш результат!</h1>
    <p>
      Вы ответили на {rightAnswers} из {totalQuestions}{' '}
    </p>
  </>
)

export default WithClasses(ResultQuiz, classes.ResultQuiz)
