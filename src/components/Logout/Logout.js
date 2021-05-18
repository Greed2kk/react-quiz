import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from 'store/actions/auth'

class Logout extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.logout()
  }

  render() {
    return <Redirect to="/auth" />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(null, mapDispatchToProps)(Logout)
