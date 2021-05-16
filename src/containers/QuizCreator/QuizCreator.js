import React, { Component } from 'react'
import WithClasses from 'components/hoc/withClasses'
import MyButton from 'components/UI/Button/Button'
import Input from 'components/UI/Input/Input'
import Select from 'components/UI/Select/Select'

import ModalInput from 'components/UI/Modal/Modal'
import {
  createFormControls,
  validateControl,
  validateForm,
} from 'utils/formFramework'
import { connect } from 'react-redux'
import {
  createQuizQuestion,
  finishCreateQuiz,
  modalInputTitle,
} from 'store/actions/create'
import classes from './QuizCreator.module.scss'

// eslint-disable-next-line react/prefer-stateless-function
class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
    modalState: false,
  }

  componentDidMount() {
    this.setState({
      modalState: true,
    })
  }

  onChangeHandler(value, controlName) {
    this.setState(prevState => ({
      formControls: (prevState.formControls = {
        ...prevState.formControls,
        ...{
          [controlName]: {
            ...prevState.formControls[controlName],
            ...{
              value,
              touched: true,
              valid: validateControl(
                value,
                prevState.formControls[controlName]
                  ?.validation
              ),
            },
          },
        },
      }),
      isFormValid: validateForm(prevState.formControls),
    }))
  }

  submitHandler = e => {
    e.preventDefault()
  }

  addQuestionHandler = e => {
    e.preventDefault()
    const { quiz, createQuizQuestion } = this.props
    const { formControls, rightAnswerId } = this.state
    const {
      question,
      options1,
      options2,
      options3,
      options4,
    } = formControls

    const questionItem = {
      question: question.value,
      id: quiz.questions.length + 1,
      correctAnswerId: rightAnswerId,
      answers: [
        {
          text: options1.value,
          id: options1.id,
        },
        {
          text: options2.value,
          id: options2.id,
        },
        {
          text: options3.value,
          id: options3.id,
        },
        {
          text: options4.value,
          id: options4.id,
        },
      ],
    }

    createQuizQuestion(questionItem)

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    })
  }

  createQuizHandler = e => {
    const { finishCreateQuiz } = this.props
    e.preventDefault()

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    })
    finishCreateQuiz()
  }

  selectChangeHandler = e => {
    this.setState({ rightAnswerId: +e.target.value })
  }

  onModalInput = title => {
    const { modalInputTitle } = this.props
    modalInputTitle(title)
  }

  renderControls() {
    const { formControls } = this.state
    return Object.keys(formControls).map((name, index) => {
      const {
        value,
        valid,
        touched,
        label,
        errorMessage,
        validation,
      } = formControls[name]
      return (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index + 1}>
          {/* eslint-disable */}
          <Input
            key={index}
            id={index}
            value={value}
            valid={valid}
            touched={touched}
            label={label}
            shouldValidate={!!validation}
            errorMessage={errorMessage}
            onChange={e =>
              this.onChangeHandler(e.target.value, name)
            }
          />
          {/* eslint-enable */}
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      )
    })
  }

  render() {
    const {
      rightAnswerId,
      isFormValid,
      modalState,
      formControls,
    } = this.state
    const { title, quiz } = this.props
    const {
      options1,
      options2,
      options3,
      options4,
    } = formControls
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          {
            text: options1,
            value: 1,
          },
          {
            text: options2,
            value: 2,
          },
          {
            text: options3,
            value: 3,
          },
          {
            text: options4,
            value: 4,
          },
        ]}
      />
    )

    return (
      <div>
        {modalState ? (
          <ModalInput onModalInput={this.onModalInput} />
        ) : null}
        <h1>{title}</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderControls()}
          {select}
          <MyButton
            disabled={!isFormValid}
            type="primary"
            onClick={this.addQuestionHandler}
          >
            Добавить вопрос
          </MyButton>
          <MyButton
            disabled={quiz.length === 0}
            type="success"
            onClick={this.createQuizHandler}
          >
            Создать тест
          </MyButton>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
    title: state.create.quiz.title,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item =>
      dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    modalInputTitle: title =>
      dispatch(modalInputTitle(title)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithClasses(QuizCreator, classes.QuizCreator))
