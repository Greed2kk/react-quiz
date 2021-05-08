import React, { Component } from 'react'
import WithClasses from '../../components/hoc/withClasses'
import classes from './QuizCreator.module.scss'
import MyButton from '../../components/UI/Button/Button'
import { createFormControls } from '../../utils/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'

// eslint-disable-next-line react/prefer-stateless-function
class QuizCreator extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    quiz: [],
    rightAnswerId: 1,
    formControls: createFormControls(),
  }

  onChangeHandler(value, controlName) {}

  submitHandler = e => {
    e.preventDefault()
  }

  addQuestionHandler = () => {}

  createQuizHandler = () => {}

  selectChangeHandler = e => {
    // eslint-disable-next-line no-debugger
    debugger
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
        <>
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
    const { rightAnswerId } = this.state
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
