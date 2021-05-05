import React from 'react'
import classes from './BackDrop.module.scss'

const BackDrop = ({ onClose }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div
    className={classes.BackDrop}
    onClick={() => onClose()}
  />
)

export default BackDrop
