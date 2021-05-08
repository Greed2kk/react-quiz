import React from 'react'
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
        {options.map(({ option }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <option value={value} key={value + index}>
            {value + index}
          </option>
        ))}
      </select>
    </>
  )
}

export default WithClasses(Select, classes.Select)
