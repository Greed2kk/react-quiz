import React, { Component } from 'react'
import classes from './Layout.module.scss'
import WithClasses from '../withClasses'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    const { children } = this.props
    return <main>{children}</main>
  }
}

export default WithClasses(Layout, classes.Layout)
