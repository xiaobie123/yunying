import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Radio, Modal, DatePicker, Checkbox, Tabs, Switch,Cascader } from 'antd';
import moment from 'moment';
import styles from './userModel.less';
import  city  from '../../../utils/allCity.js'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
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
  modalType,
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
  	console.log({
        ...getFieldsValue(),
        id: item.id,
      });
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      debugger;
      /*修改数据结构*/
     data.province=data.cityName[0];
     data.city=data.cityName[1];
     data.area=data.cityName[2];
     delete data.cityName;
      onOk(data)
    })
  }
function onChangeCascader (value) {
  console.log(value);
}
  const modalOpts = {
    title: modalType=="create" ? "添加企业信息":"更新企业信息",
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
  console.log(modalType);
  return (
    <Modal {...modalOpts} className={styles.modal}>
      <Form layout="horizontal">
      	{/*<Tabs type="card">
		   <TabPane tab="企业信息" key="1">*/}
	        <FormItem label="企业名称：" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('name', {
	            initialValue: item.name,
	            rules: [
	              {
	                required: true,
	                message: '企业名称未填写',
	              },
	            ],
	          })(<Input  placeholder="请输入企业名称" />)}
	        </FormItem>
	        <FormItem label="企业简称：" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('nameAbbr', {
	            initialValue: item.nameAbbr,
	            rules: [
	              {
	                required: true,
	                message: '企业简称未填写',
	              },
	            ],
	          })(<Input  placeholder="请输入企业简称" />)}
	        </FormItem>
	        <FormItem label="企业编码：" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('entNo', {
	            initialValue: item.entNo,
	            rules: [
	              {
	                required: true,
	                message: '企业编码未填写',
	              },
	            ],
	          })(<Input placeholder="请输入企业编码" />)}
	        </FormItem>
	        
	        {/*</TabPane>
	        <TabPane tab="联系人信息" key="2">*/}
	        <FormItem label="联系人名称：" hasFeedback  {...formItemLayout}>
	          {getFieldDecorator('contactPerson', {
	            initialValue: item.contactPerson,
	            rules: [
	              {
	                required: true,
	                message: '联系人名称未填写',
	              },
	            ]
	          })(<Input  placeholder="请输入联系人名称" />)}
	        </FormItem>
	        <FormItem label="联系人电话：" hasFeedback  {...formItemLayout}>
	          {getFieldDecorator('contactNumber', {
	            initialValue: item.contactNumber,
	            rules: [
	              {
	                required: true,
	                message: '联系人电话未填写',
	              },
	            ]
	          })(<Input placeholder="请输入联系人电话" />)}
	        </FormItem>
	        <FormItem label="联系人手机：" hasFeedback  {...formItemLayout}>
	          {getFieldDecorator('telephone', {
	            initialValue: item.telephone,
	            rules: [
	              {
	                required: true,
	                message: '联系人手机未填写',
	              },
	            ]
	          })(<Input placeholder="请输入联系人手机" />)}
	        </FormItem>
	        <FormItem label="联系人邮箱：" hasFeedback  {...formItemLayout}>
	          {getFieldDecorator('email', {
	            initialValue: item.email,
	            rules: [
	              {
	                required: true,
	                message: '联系人邮箱未填写',
	              },
	            ]
	          })(<Input placeholder="请输入联系人邮箱" />)}
	        </FormItem>
	        <FormItem label="所在地区：" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('cityName', {
	            initialValue: item.province?[item.province,item.city,item.area]:'',
	            valuePropName:'defaultValue',
	            rules: [
	              {
	                required: true,
	                message: '企业名称未填写',
	              },
	            ],
	          })(<Cascader options={city} onChange={onChangeCascader} placeholder="请选择" />)}
	        </FormItem>
	        <FormItem label="详细地址" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('address', {
	          	initialValue: item.address,
	            rules: [
	              {
	                required: true,
	                message: '详细地址未填写',
	              },
	            ],
	          })(
	            <Input type="textarea" rows={4} />
	          )}
	        </FormItem>
	       {/* </TabPane>
        </Tabs>*/}
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
  modalType:PropTypes.string,
}

export default Form.create()(modal)
