import React, { Component } from 'react'
import WithClasses from '../../components/hoc/withClasses'
import classes from './QuizCreator.module.scss'
import MyButton from '../../components/UI/Button/Button'
import { createFormControls } from '../../utils/formFramework'
import Input from '../../components/UI/Input/Input'

// eslint-disable-next-line react/prefer-stateless-function
class QuizCreator extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    quiz: [],
    formControls: createFormControls(),
  }

  onChangeHandler(value, controlName) {}

  submitHandler = e => {
    e.preventDefault()
  }

  addQuestionHandler = () => {}

  createQuizHandler = () => {}

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
        <>
          {' '}
          <Input
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
        </>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Create quiz</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderControls()}
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <select />
          <MyButton
            type="primary"
            onClick={this.addQuestionHandler}
          >
            Добавить вопрос
          </MyButton>
          <MyButton
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
