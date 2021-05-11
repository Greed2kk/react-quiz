import React from 'react'
import classes from './AnswerItem.module.scss'

const AnswerItem = ({
  answer,
  onAnswerClick,
  answerState,
}) => {
  const cls = [classes.AnswerItem]
  if (answerState) {
    cls.push(classes[answerState.toLowerCase()])
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <li
      className={cls.join(' ')}
      onClick={() => onAnswerClick(answer.id)}
    >
      {answer.text}
    </li>
  )
}

export default AnswerItem
