import React from 'react'
import classes from './MenuToggle.module.scss'
import { ReactComponent as Arrow } from '../../../scss/pictograms/arrow.svg'
import { ReactComponent as Burger } from '../../../scss/pictograms/burger.svg'

const MenuToggle = ({ onToggle, isOpen }) => {
  const cls = [classes.MenuToggle]
  let Icon = Burger
  if (isOpen) {
    Icon = Arrow
    cls.push(classes.open)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
    <i className={cls.join(' ')} onClick={onToggle}>
      <Icon />
    </i>
  )
}

export default MenuToggle
