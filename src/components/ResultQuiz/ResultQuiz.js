import React from 'react'
import { UndoOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import classes from './ResultQuiz.module.scss'
import WithClasses from '../hoc/withClasses'
import ResultDetails from './ResultDetails/ResultDetails'
import MyButton from '../UI/Button/Button'

const ResultQuiz = ({
  rightAnswers,
  totalQuestions,
  onRestartHandler,
  quiz,
  results,
}) => (
  <>
    <h1>Ваш результат!</h1>
    <p>
      Вы ответили правильно на {rightAnswers} из{' '}
      {totalQuestions} вопросов
    </p>
    <Tooltip title="Пройти заново">
      <Button
        type="primary"
        shape="circle"
        size="large"
        onClick={() => onRestartHandler()}
        icon={<UndoOutlined />}
      />
    </Tooltip>
    <MyButton type="primary">Другие тесты</MyButton>
    <ResultDetails quiz={quiz} results={results} />
  </>
)

export default WithClasses(ResultQuiz, classes.ResultQuiz)
