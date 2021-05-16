import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import classes from './Spinner.module.scss'

const Spinner = () => (
  <div className={classes.Spinner}>
    <LoadingOutlined
      style={{ fontSize: 70, color: 'white' }}
      spin
    />
  </div>
)

export default Spinner
