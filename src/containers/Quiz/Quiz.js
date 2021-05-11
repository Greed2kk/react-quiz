import React, { Component } from 'react'
import WithClasses from 'components/hoc/withClasses'
import ActiveQuiz from 'components/ActiveQuiz/ActiveQuiz'
import ResultQuiz from 'components/ResultQuiz/ResultQuiz'
import quizData from 'fixtures/react_questions'
import { throttle } from 'utils/throttle'
import axios from 'axios/axios-quiz'
import Spinner from 'components/UI/Spinner/Spinner'
import classes from './Quiz.module.scss'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      results: {},
      rightAnswers: 0,
      title: quizData.title,
      quiz: quizData.questions,
      loading: true,
    }
    this.onAnswerClickHandler = throttle(
      this.onAnswerClickHandler.bind(this),
      1000
    )
  }

  async componentDidMount() {
    const { match } = this.props
    try {
      const response = await axios.get(
        `/quizes/${match.params.id}.json`
      )
      this.setState({
        quiz: response.data.questions,
        loading: false,
        title: response.data.title,
      })
    } catch (error) {
      console.warn(error)
    }
  }

  onAnswerClickHandler(answerId) {
    const {
      activeQuestion,
      quiz,
      rightAnswers,
      results,
    } = this.state
    const currentQuestion = quiz[activeQuestion]

    const delayAnswerCheck = setTimeout(() => {
      if (this.finishedQuiz()) {
        this.setState({ isFinished: true })
      } else {
        this.setState(prevState => ({
          activeQuestion: ++prevState.activeQuestion,
          answerState: null,
        }))
        clearTimeout(delayAnswerCheck)
      }
    }, 1000)

    if (currentQuestion.correctAnswerId === answerId) {
      this.setState({
        rightAnswers: rightAnswers + 1,
        answerState: {
          [answerId]: 'Right',
        },
        results: { ...results, [activeQuestion]: 'Right' },
      })
    } else {
      this.setState({
        answerState: { [answerId]: 'Wrong' },
        results: { ...results, [activeQuestion]: 'Wrong' }, // check here
      })
    }
  }

  finishedQuiz() {
    const { quiz, activeQuestion } = this.state
    return quiz.length === activeQuestion + 1
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
      title,
    } = this.state
    const totalQuestions = quiz.length
    return (
      <>
        {isFinished ? (
          <ResultQuiz
            rightAnswers={rightAnswers}
            totalQuestions={totalQuestions}
            results={results}
            quiz={quiz}
            onRestartHandler={() =>
              this.setState({
                isFinished: false,
                activeQuestion: 0,
                answerState: null,
                rightAnswers: 0,
                results: {},
              })
            }
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
                  onAnswerClick={this.onAnswerClickHandler}
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

export default WithClasses(Quiz, classes.Quiz)
