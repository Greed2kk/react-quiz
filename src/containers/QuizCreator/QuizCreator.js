import React, { Component } from 'react'
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

// eslint-disable-next-line react/prefer-stateless-function
class QuizCreator extends Component {
  state = {
    isFormValid: false,
    quiz: [],
    rightAnswerId: 1,
    formControls: createFormControls(),
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
      }
    })
  }

  /**
   * @todo Add server save
   */
  createQuizHandler = e => {
    e.preventDefault()
    // eslint-disable-next-line no-console,react/destructuring-assignment
    console.log(this.state.quiz)
  }

  selectChangeHandler = e => {
    this.setState({ rightAnswerId: +e.target.value })
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
    const { rightAnswerId, isFormValid, quiz } = this.state
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          {
            text: 1,
            value: 1,
          },
          {
            text: 2,
            value: 2,
          },
          {
            text: 3,
            value: 3,
          },
          {
            text: 4,
            value: 4,
          },
        ]}
      />
    )

    return (
      <div>
        <h1>Create quiz</h1>
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
