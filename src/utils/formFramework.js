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
