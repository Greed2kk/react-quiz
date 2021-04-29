import React from 'react'
import classes from './AnswersLisy.module.scss'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = ({ answers, onAnswerClick }) => (
  <ul className={classes.AnswersList}>
    {answers.map((answer, index) => (
      <AnswerItem
        answer={answer}
        index={index}
        key={answer.id}
        onAnswerClick={onAnswerClick}
      />
    ))}
  </ul>
)

export default AnswersList
