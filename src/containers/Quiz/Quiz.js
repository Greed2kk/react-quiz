import React, { Component } from 'react'
import classes from './Quiz.module.scss'
import WithClasses from '../../components/hoc/withClasses'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import ResultQuiz from '../../components/ResultQuiz/ResultQuiz'
import quizData from '../../fixtures/react_questions'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      activeQuestion: 0,
      // eslint-disable-next-line react/no-unused-state
      answerState: null,
      rightAnswers: 0,
      quiz: quizData,
    }
    this.onAnswerClickHandler = this.onAnswerClickHandler.bind(
      this
    )
  }

  /**
   * @todo Пофиксить баг с быстрым прокликиванием
   */
  onAnswerClickHandler(answerId) {
    const { activeQuestion, quiz } = this.state
    const currentQuestion = quiz[activeQuestion]

    if (!this.finishedQuiz()) {
      if (currentQuestion.correctAnswerId === answerId) {
        this.setState(currentState => ({
          rightAnswers: currentState.rightAnswers + 1,
        }))
      }
      const delayAnswerCheck = setTimeout(() => {
        this.setState(currentState => ({
          activeQuestion: ++currentState.activeQuestion,
        }))
        clearTimeout(delayAnswerCheck)
      }, 500)
    }
  }

  finishedQuiz() {
    const { quiz, activeQuestion } = this.state
    return quiz.length === activeQuestion
  }

  render() {
    const {
      quiz,
      activeQuestion,
      rightAnswers,
    } = this.state
    const totalQuestions = quiz.length
    return (
      <>
        {!this.finishedQuiz() ? (
          <>
            {' '}
            <h1>Quiz: Как хорошо ты знаешь React</h1>
            <ActiveQuiz
              answers={quiz[activeQuestion].answers}
              question={quiz[activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={totalQuestions}
              answerNumber={activeQuestion + 1}
            />
          </>
        ) : (
          <ResultQuiz
            rightAnswers={rightAnswers}
            totalQuestions={totalQuestions}
          />
        )}
      </>
    )
  }
}

export default WithClasses(Quiz, classes.Quiz)
