import React from 'react'
import classes from './MenuToggle.module.scss'
import { arrow, burger } from '../../../utils/icons'

const MenuToggle = ({ onToggle, isOpen }) => {
  const cls = [classes.MenuToggle]
  let icon = burger
  if (isOpen) {
    icon = arrow
    cls.push(classes.open)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
    <i className={cls.join(' ')} onClick={onToggle}>
      {icon}
    </i>
  )
}

export default MenuToggle
