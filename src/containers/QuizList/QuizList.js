import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios/axios-quiz'
import openNotification from 'components/UI/Notification/Notification'
import Spinner from 'components/UI/Spinner/Spinner'
import classes from './QuizList.module.scss'

// eslint-disable-next-line react/prefer-stateless-function
class QuizList extends Component {
  state = {
    quizes: [],
    loading: true,
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/quizes.json')
      const quizes = []
      Object.keys(response.data).forEach(key => {
        quizes.push({
          id: key,
          name: `Quiz: ${response.data[key].title}`,
        })
      })
      this.setState({ quizes, loading: false })
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
    const { loading } = this.state
    return (
      <div className={classes.QuizList}>
        <h1>Cписок тестов</h1>
        {loading ? (
          <Spinner />
        ) : (
          <ul>{this.renderQuizList()}</ul>
        )}
      </div>
    )
  }
}

export default QuizList
