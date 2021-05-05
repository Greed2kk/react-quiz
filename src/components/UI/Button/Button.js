import React from 'react'
import classes from './Button.module.scss'

const MyButton = ({
  children,
  onClick,
  disabled,
  type,
}) => {
  const cls = [classes.Button, classes[type]]
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default MyButton
