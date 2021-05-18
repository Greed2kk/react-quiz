import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './Layout.module.scss'
import WithClasses from '../withClasses'
import MenuToggle from '../../Navigation/MenuToggle/MenuToggle'
import Drawer from '../../Navigation/Drawer/Drawer'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = { menu: false }
  }

  toggleMenuHandler = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    this.setState({ menu: !this.state.menu })
  }

  menuCloseHandler = () => {
    this.setState({ menu: false })
  }

  render() {
    const { children, auth } = this.props
    const { menu } = this.state
    return (
      <>
        <Drawer
          isOpen={menu}
          onClose={this.menuCloseHandler}
          isAuth={auth}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={menu}
        />
        <main>{children}</main>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: Boolean(state.auth.token),
  }
}

export default connect(mapStateToProps)(
  WithClasses(Layout, classes.Layout)
)
