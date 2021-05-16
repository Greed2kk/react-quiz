import React, { Component } from 'react'
import WithClasses from 'components/hoc/withClasses'
import ActiveQuiz from 'components/ActiveQuiz/ActiveQuiz'
import ResultQuiz from 'components/ResultQuiz/ResultQuiz'
import { throttle } from 'utils/throttle'
import Spinner from 'components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import {
  fetchQuizById,
  quizAnswerClick,
  restartQuiz,
} from 'store/actions/quiz'
import classes from './Quiz.module.scss'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  componentDidMount() {
    const { fetchQuizById, match } = this.props
    fetchQuizById(match.params.id)
  }

  componentWillUnmount() {
    const { restartQuiz } = this.props
    restartQuiz()
  }

  render() {
    const {
      quiz,
      activeQuestion,
      rightAnswers,
      answerState,
      isFinished,
      results,
      loading,
      quizAnswerClick,
      title,
      restartQuiz,
    } = this.props
    const totalQuestions = quiz.length
    return (
      <>
        {isFinished || !quiz ? (
          <ResultQuiz
            rightAnswers={rightAnswers}
            totalQuestions={totalQuestions}
            results={results}
            quiz={quiz}
            onRestartHandler={restartQuiz}
          />
        ) : (
          <>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <h1>Quiz: {title}</h1>
                <ActiveQuiz
                  answers={quiz[activeQuestion].answers}
                  question={quiz[activeQuestion].question}
                  onAnswerClick={throttle(
                    quizAnswerClick,
                    1000
                  )}
                  quizLength={totalQuestions}
                  answerNumber={activeQuestion + 1}
                  answerState={answerState}
                />
              </>
            )}
          </>
        )}
      </>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFinished,
    activeQuestion,
    answerState,
    results,
    rightAnswers,
    title,
    quiz,
    loading,
  } = state.quiz
  return {
    loading,
    isFinished,
    activeQuestion,
    answerState,
    results,
    rightAnswers,
    title,
    quiz,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId =>
      dispatch(quizAnswerClick(answerId)),
    restartQuiz: () => dispatch(restartQuiz()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithClasses(Quiz, classes.Quiz))
