import { notification } from 'antd'

const openNotification = (typeNoty, message) => {
  notification[typeNoty.toLowerCase()]({
    message: typeNoty,
    description: message,
    placement: 'bottomRight',
  })
}

export default openNotification
