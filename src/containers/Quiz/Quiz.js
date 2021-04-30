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
      answerState: null,
      rightAnswers: 0,
      quiz: quizData,
    }
    this.onAnswerClickHandler = this.onAnswerClickHandler.bind(
      this
    )
  }

  /**
   * @todo Пофиксить баг с быстрым прокликиванием, добавить debounce
   */
  onAnswerClickHandler(answerId) {
    const { activeQuestion, quiz } = this.state
    const currentQuestion = quiz[activeQuestion]

    if (!this.finishedQuiz()) {
      if (currentQuestion.correctAnswerId === answerId) {
        this.setState(pervState => ({
          rightAnswers: pervState.rightAnswers + 1,
          answerState: { [answerId]: 'Right' },
        }))
      } else {
        this.setState({
          answerState: { [answerId]: 'Wrong' },
        })
      }
      const delayAnswerCheck = setTimeout(() => {
        this.setState(pervState => ({
          activeQuestion: ++pervState.activeQuestion,
          answerState: null,
        }))
        clearTimeout(delayAnswerCheck)
      }, 1500)
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
      answerState,
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
              answerState={answerState}
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
