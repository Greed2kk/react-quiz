import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Logout from 'components/Logout/Logout'
import { autoLogin } from 'store/actions/auth'
import Layout from './components/hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'
import QuizList from './containers/QuizList/QuizList'

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  componentDidMount() {
    const { autoLogin } = this.props
    autoLogin()
  }

  render() {
    const { isAuth } = this.props
    return (
      <Layout>
        <Switch>
          {isAuth ? (
            <Route path="/logout" component={Logout} />
          ) : (
            <Route path="/auth" component={Auth} />
          )}
          {isAuth ? (
            <Route
              path="/quiz-creator"
              component={QuizCreator}
            />
          ) : null}
          <Route path="/quiz/:id" component={Quiz} />
          {isAuth ? (
            <Route path="/logout" component={Logout} />
          ) : (
            <Route path="/auth" component={Auth} />
          )}
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuth: Boolean(state.auth.token),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
