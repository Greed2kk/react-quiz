import React from 'react'
import uuid from 'react-uuid'
import classes from './Select.module.scss'
import WithClasses from '../../hoc/withClasses'

const Select = ({ label, value, onChange, options }) => {
  const htmlFor = `${label}-${Math.random()}`
  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          // eslint-disable-next-line react/no-array-index-key
          <option value={option.value} key={uuid()}>
            {option.value}
          </option>
        ))}
      </select>
    </>
  )
}

export default WithClasses(Select, classes.Select)
