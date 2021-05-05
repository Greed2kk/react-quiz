import React from 'react'
import { Collapse, Tag } from 'antd'
import WithClasses from '../../hoc/withClasses'
import classes from './ResultDetails.module.scss'
import 'antd/dist/antd.css'

const { Panel } = Collapse

const ResultDetails = ({ quiz, results }) => (
  <>
    <Collapse>
      <Panel
        header="Подробнее"
        key="1"
        className="site-collapse-custom-panel"
      >
        <ul>
          {quiz.map(quizItem => {
            const style =
              results[quizItem.id - 1] === 'Right'
                ? {
                    background: 'rgba(183, 249, 152, 0.87)',
                  }
                : { background: 'rgba(194, 81, 81, 0.87)' }

            return (
              <li key={quizItem.id} style={style}>
                <span>
                  <strong>
                    <Tag color="geekblue">
                      {quizItem.id} Вопрос:
                    </Tag>
                  </strong>
                </span>
                {quizItem.question}

                <br />
                <strong>
                  {' '}
                  <Tag color="green">
                    Правильный ответ:&nbsp;
                  </Tag>
                </strong>
                {
                  quizItem.answers[
                    quizItem.correctAnswerId - 1
                  ].text
                }
              </li>
            )
          })}
        </ul>
      </Panel>
    </Collapse>
  </>
)

export default WithClasses(
  ResultDetails,
  classes.ResultDetails
)
