import React, { Component } from 'react'
import classes from './Quiz.module.scss'
import WithClasses from '../../components/hoc/withClasses'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import ResultQuiz from '../../components/ResultQuiz/ResultQuiz'
import quizData from '../../fixtures/react_questions'
import { throttle } from '../../utils/throttle'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      rightAnswers: 0,
      quiz: quizData,
    }
    this.onAnswerClickHandler = throttle(
      this.onAnswerClickHandler.bind(this),
      1000
    )
  }

  onAnswerClickHandler(answerId) {
    const {
      activeQuestion,
      quiz,
      rightAnswers,
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
        answerState: { [answerId]: 'Right' },
      })
    } else {
      this.setState({
        answerState: { [answerId]: 'Wrong' },
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
    } = this.state
    const totalQuestions = quiz.length
    return (
      <>
        {isFinished ? (
          <ResultQuiz
            rightAnswers={rightAnswers}
            totalQuestions={totalQuestions}
          />
        ) : (
          <>
            {' '}
            <h1>Quiz: Как хорошо ты знаешь React</h1>
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
    )
  }
}

export default WithClasses(Quiz, classes.Quiz)
