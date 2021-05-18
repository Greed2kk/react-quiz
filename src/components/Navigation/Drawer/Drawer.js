import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Drawer.module.scss'
import BackDrop from '../../UI/BackDrop/BackDrop'

class Drawer extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  clickHandler = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onClose()
  }

  renderLinks(links) {
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
    const { isOpen, onClose, isAuth } = this.props
    const links = [
      { to: '/', label: 'Список Quiz', exact: true, id: 1 },
    ]

    if (isAuth) {
      links.push(
        {
          to: '/quiz-creator',
          label: 'Создать Quiz',
          exact: false,
          id: 3,
        },
        {
          to: '/logout',
          label: 'Выйти',
          exact: false,
          id: 4,
        }
      )
    } else {
      links.push({
        to: '/auth',
        label: 'Авторизация',
        exact: false,
        id: 2,
      })
    }

    const cls = [classes.Drawer]
    if (!isOpen) {
      cls.push(classes.close)
    }
    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {isOpen ? <BackDrop onClose={onClose} /> : null}
      </>
    )
  }
}

export default Drawer
