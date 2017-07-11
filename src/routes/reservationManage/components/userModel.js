import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal, DatePicker, Checkbox} from 'antd'
import moment from 'moment';
const FormItem = Form.Item
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  visible,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      debugger;
     data.epd=new Date(data.epd._d).getTime();
      onOk(data)
    })
  }

  const modalOpts = {
    title: "审核申请",
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="申请人：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('applicant', {
            initialValue: item.applicant,
            rules: [
              {
                required: true,
                message: '姓名未填写',
              },
            ],
          })(<Input disabled={true} />)}
        </FormItem>
        <FormItem label="手机：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phoneNumber', {
            initialValue: item.phoneNumber,
            rules: [
              {
                required: true,
                message: '手机号未填写',
              },
            ],
          })(<Input disabled={true} />)}
        </FormItem>
        <FormItem label="邮箱：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                message: '邮箱未填写',
              },
            ],
          })(<Input disabled={true} />)}
        </FormItem>
        <FormItem label="公司名称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('enterpriseName', {
            initialValue: item.enterpriseName,
            rules: [
              {
                required: true,
                message: '企业名称未填写',
              },
            ],
          })(<Input disabled={true} />)}
        </FormItem>
        <FormItem label="状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('auditResult', {
          	initialValue: Number(item.auditResult),
            rules: [
              {
                required: true,
                type: 'number',
                message: '状态未填写',
              },
            ],
          })(
            <RadioGroup>
            <Radio value={1}>待审核</Radio>
			        <Radio value={2}>审核通过</Radio>
			        <Radio value={3}>审核拒绝</Radio>
			      </RadioGroup>,
          )}
        </FormItem>
        <FormItem label="演示人：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('demonstrator', {
            initialValue: item.demonstrator,
            rules: [
              {
                required: true,
                message: '演示人未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="演示时间：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('epd', {
            initialValue: moment(new Date(item.epd),'YYYY-MM-DD'),
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<DatePicker defaultValue={item.epd ? moment(new Date(item.epd),'YYYY-MM-DD'):''} />)}
        </FormItem>
        <FormItem label="备注：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
