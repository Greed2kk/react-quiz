import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Drawer.module.scss'
import BackDrop from '../../UI/BackDrop/BackDrop'

const links = [
  { to: '/', label: 'Список Quiz', exact: true, id: 1 },
  {
    to: '/auth',
    label: 'Авторизация',
    exact: false,
    id: 2,
  },
  {
    to: '/quiz-creator',
    label: 'Создать Quiz',
    exact: false,
    id: 3,
  },
]

class Drawer extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  clickHandler = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onClose()
  }

  renderLinks() {
    return links.map(link => (
      <li key={link.id}>
        <NavLink
          to={link.to}
          exact={link.exact}
          activeClassName={classes.active}
          onClick={this.clickHandler}
        >
          {link.label}
        </NavLink>
      </li>
    ))
  }

  render() {
    const { isOpen, onClose } = this.props
    const cls = [classes.Drawer]
    if (!isOpen) {
      cls.push(classes.close)
    }
    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {isOpen ? <BackDrop onClose={onClose} /> : null}
      </>
    )
  }
}

export default Drawer
