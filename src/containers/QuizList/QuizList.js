import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Spinner from 'components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import { fetchQuizes } from 'store/actions/quiz'
import classes from './QuizList.module.scss'

class QuizList extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchQuizes()
  }

  renderQuizList() {
    const { quizes } = this.props
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
    const { loading, quizes } = this.props
    return (
      <div className={classes.QuizList}>
        <h1>Cписок тестов</h1>
        {loading && quizes.length !== 0 ? (
          <Spinner />
        ) : (
          <ul>{this.renderQuizList()}</ul>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return { fetchQuizes: () => dispatch(fetchQuizes()) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizList)
