import React, { Component } from 'react'
import classes from './Drawer.module.scss'
import BackDrop from '../../UI/BackDrop/BackDrop'

const links = [1, 2, 3]

class Drawer extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  renderLinks() {
    return links.map((link, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Link: {link}</a>
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
