import React from 'react'
import classes from './Input.module.scss'

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

const Input = React.forwardRef(
  (
    {
      type,
      label,
      value,
      onChange,
      errorMessage,
      ...validateProps
    },
    ref
  ) => {
    const inputType = type || 'text'
    const cls = [classes.Input]
    const htmlFor = `${inputType}-${Math.random()}`
    if (isInvalid(validateProps)) {
      cls.push(classes.invalid)
    }
    return (
      <div className={cls.join(' ')}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={htmlFor}>{label}</label>
        <input
          ref={ref}
          type={inputType}
          id={htmlFor}
          value={value}
          onChange={onChange}
        />
        {isInvalid(validateProps) ? (
          <span>
            {errorMessage || 'Введите корректные данные'}
          </span>
        ) : null}
      </div>
    )
  }
)

export default Input
