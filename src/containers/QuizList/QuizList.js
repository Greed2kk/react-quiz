import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.scss'

// eslint-disable-next-line react/prefer-stateless-function
class QuizList extends Component {
  renderQuizList() {
    return [1, 2, 3].map((quiz, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index}>
        <NavLink to={`/quiz/${quiz}`}>Тест: {quiz}</NavLink>
      </li>
    ))
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <h1>Cписок тестов</h1>
        <ul>{this.renderQuizList()}</ul>
      </div>
    )
  }
}

export default QuizList
