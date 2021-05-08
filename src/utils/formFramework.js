export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
  }
}

export function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: 'Ответ не может быть пустым',
      id: number,
    },
    { required: true }
  )
}

export function createFormControls() {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      { required: true }
    ),
    options1: createOptionControl(1),
    options2: createOptionControl(2),
    options3: createOptionControl(3),
    options4: createOptionControl(4),
  }
}

export function validateControl(value, validation = null) {
  if (!validation) {
    return true
  }

  let isValid = true

  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }
  return isValid
}

export function validateForm(formControls) {
  let isFormValid = true

  // eslint-disable-next-line no-restricted-syntax,guard-for-in
  for (const control in formControls) {
    // eslint-disable-next-line no-prototype-builtins
    if (formControls.hasOwnProperty(control)) {
      isFormValid =
        formControls[control].valid && isFormValid
    }
  }
  return isFormValid
}
