import React from 'react'
import classes from './ActiveQuiz.module.scss'
import WithClasses from '../hoc/withClasses'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = ({
  answers,
  question,
  onAnswerClick,
  answerNumber,
  quizLength,
  answerState,
}) => (
  <>
    <p>
      <span>
        <strong>{answerNumber}.</strong>
        &nbsp; {question}
      </span>
      <small>
        {answerNumber} из {quizLength}
      </small>
    </p>

    <ul>
      <AnswersList
        answerState={answerState}
        answers={answers}
        onAnswerClick={onAnswerClick}
      />
    </ul>
  </>
)

export default WithClasses(ActiveQuiz, classes.ActiveQuiz)
