import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import classes from './QuizList.module.scss'
import openNotification from '../../components/UI/Notification/Notification'

// eslint-disable-next-line react/prefer-stateless-function
class QuizList extends Component {
  state = {
    quizes: [],
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://react-quiz-16737-default-rtdb.firebaseio.com/quizes.json'
      )
      const quizes = []
      Object.keys(response.data).forEach(key => {
        quizes.push({
          id: key,
          name: `Quiz: ${response.data[key].title}`,
        })
      })
      this.setState({ quizes })
    } catch (error) {
      openNotification(error.name, error.message)
      console.error(error)
    }
  }

  renderQuizList() {
    const { quizes } = this.state
    return quizes.map(quiz => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={quiz.id}>
        <NavLink to={`/quiz/${quiz.id}`}>
          {quiz.name}
        </NavLink>
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
