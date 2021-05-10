import React, { Component } from 'react'
import axios from 'axios'
import WithClasses from '../../components/hoc/withClasses'
import classes from './QuizCreator.module.scss'
import MyButton from '../../components/UI/Button/Button'
import {
  createFormControls,
  validateControl,
  validateForm,
} from '../../utils/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import openNotification from '../../components/UI/Notification/Notification'
import ModalInput from '../../components/UI/Modal/Modal'

// eslint-disable-next-line react/prefer-stateless-function
class QuizCreator extends Component {
  state = {
    isFormValid: false,
    quiz: [],
    title: 'Мой quiz',
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
    const { formControls, quiz } = this.state
    const {
      question,
      options1,
      options2,
      options3,
      options4,
    } = formControls
    this.setState(prevState => {
      const id = quiz.length + 1
      return {
        quiz: (prevState.quiz = [
          ...prevState.quiz,
          {
            question: question.value,
            id,
            correctAnswerId: prevState.rightAnswerId,
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
          },
        ]),
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
        requestSend: false,
      }
    })
  }

  createQuizHandler = async e => {
    const { quiz, title } = this.state
    e.preventDefault()

    try {
      const response = await axios.post(
        'https://react-quiz-16737-default-rtdb.firebaseio.com/quizes.json',
        { title, questions: quiz }
      )
      openNotification('success', response.statusText)
      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
      })
    } catch (error) {
      openNotification(error.name, error.message)
      console.error(error)
    }
  }

  selectChangeHandler = e => {
    this.setState({ rightAnswerId: +e.target.value })
  }

  onModalInput = title => {
    this.setState({ title })
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
        <React.Fragment key={index + 1}>
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
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      )
    })
  }

  render() {
    const {
      rightAnswerId,
      isFormValid,
      quiz,
      modalState,
      formControls,
      title,
    } = this.state
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

export default WithClasses(QuizCreator, classes.QuizCreator)
