import React, { useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { useHistory } from 'react-router-dom'

const CollectionCreateForm = ({ handleOk }) => {
  const [form] = Form.useForm()

  React.useEffect(() => {
    form.setFieldsValue({
      title: 'Мой первый квиз!',
    })
  }, [])

  const onFinish = value => {
    handleOk(value)
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Введите название quiz'a"
        rules={[
          {
            required: true,
            message: 'Название не можеть быть пустым!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="Finish">
          Далее
        </Button>
      </Form.Item>
    </Form>
  )
}

const ModalInput = ({ onModalInput }) => {
  const history = useHistory()
  const [isModalVisible, setIsModalVisible] = useState(true)
  const handleOk = values => {
    onModalInput(values.title)
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
    history.push('/')
  }

  return (
    <>
      <Modal
        title="Название Quiz'a"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <CollectionCreateForm handleOk={handleOk} />
      </Modal>
    </>
  )
}

export default ModalInput
