import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { auth } from 'store/actions/auth'
import classes from './Auth.module.scss'
import MyButton from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import validateEmail from '../../utils/emailValidation'
import WithClasses from '../../components/hoc/withClasses'

// eslint-disable-next-line react/prefer-stateless-function
class Auth extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      isFormValid: false,
      formControls: {
        email: {
          id: 1,
          value: '',
          type: 'email',
          label: 'Email',
          errorMessage: 'Невалидный Email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true,
          },
        },
        password: {
          id: 2,
          value: '',
          type: 'password',
          label: 'Password',
          errorMessage: 'Ненадежный пароль',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6,
          },
        },
      },
    }
    this.#API_KEY = process.env.REACT_APP_AUTH_TOKEN
    this.emailInput = createRef()
  }

  componentDidMount() {
    this.emailInput.current.focus()
  }

  loginHandler = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { email, password } = this.state.formControls
    const { auth } = this.props
    auth(email.value, password.value, true, this.#API_KEY)
  }

  registerHandler = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { email, password } = this.state.formControls
    const { auth } = this.props
    auth(email.value, password.value, false, this.#API_KEY)
  }

  submitHandler = e => {
    e.preventDefault()
  }

  onChangeHandler = (e, controlName) => {
    let isFormValid = true
    const { formControls } = this.state

    this.setState(prevState => ({
      formControls: (prevState.formControls = {
        ...prevState.formControls,
        ...{
          [controlName]: {
            ...prevState.formControls[controlName],
            ...{
              value: e.target.value,
              touched: true,
              valid: this.validateControl(
                e.target.value,
                prevState.formControls[controlName]
                  ?.validation
              ),
            },
          },
        },
      }),
      isFormValid: prevState.isFormValid,
    }))

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    this.setState({ isFormValid })
  }

  validateControl(value, validation) {
    let isValid = true

    if (!validation) {
      return true
    }
    const { required, email, minLength } = validation

    if (required) {
      isValid = value.trim() !== '' && isValid
    }
    if (email) {
      isValid = validateEmail(value) && isValid
    }
    if (minLength) {
      isValid = value.length >= minLength && isValid
    }

    return isValid
  }

  #API_KEY

  renderInputs() {
    const { formControls } = this.state
    return Object.keys(formControls).map(name => {
      const {
        id,
        type,
        value,
        valid,
        touched,
        label,
        errorMessage,
        validation,
      } = formControls[name]
      return (
        <Input
          key={id}
          type={type}
          value={value}
          valid={valid}
          touched={touched}
          label={label}
          shouldValidate={!!validation}
          errorMessage={errorMessage}
          ref={label === 'Email' ? this.emailInput : null}
          onChange={e => this.onChangeHandler(e, name)}
        />
      )
    })
  }

  render() {
    const { isFormValid } = this.state
    return (
      <div>
        <h1>Авторизация</h1>
        <form
          onSubmit={this.submitHandler}
          className={classes.AuthForm}
        >
          {this.renderInputs()}
          <MyButton
            type="success"
            submitType="submit"
            onClick={this.loginHandler}
            disabled={!isFormValid}
          >
            Войти
          </MyButton>
          <MyButton
            type="primary"
            onClick={this.registerHandler}
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </MyButton>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLoggedIn, apiKey) =>
      dispatch(auth(email, password, isLoggedIn, apiKey)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(WithClasses(Auth, classes.Auth))
