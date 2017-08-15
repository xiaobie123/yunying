import React, { PropTypes } from 'react'
import { Table, Modal, Switch ,Icon,Tooltip } from 'antd'
import moment from 'moment';
import styles from './UserList.less'
import classnames from 'classnames'


const confirm = Modal.confirm

function list ({ loading, dataSource, pagination, onPageChange,onSwitch,onSendMail, onDeleteItem, onEditItem,location }) {
	let uti={
		nullReplace(value){
			if(value==null||value==""){
				return "- -";
			}else{
				return value;
			}
		},
	}

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '企业编号',
      dataIndex: 'entNo',
      key: 'entNo',
    }, {
      title: '所在地',
      dataIndex: 'completeAddress',
      key: ' completeAddress',
    },{
      title: '联系人',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
      render: (text, record) => {
        return uti.nullReplace(text);
      },
    }, {
      title: '联系方式',
      dataIndex: 'contactNumber',
      key: 'contactNumber'
    },{
      title: '联系邮箱',
      dataIndex: 'email',
      key: ' email'
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
      	function onChange_switch(checked) {
		  	onSwitch({state:checked,id:record.id});
		}
      	 var state;
      	 if(text==1){
      	 	state=true;
      	 }
      	 if(text==0){
      	 	state=false;
      	 }
        return <Switch defaultChecked={state} onChange={onChange_switch} checkedChildren={'开通'} unCheckedChildren={'禁用'} />
      },

    },{
      title: '操作',
      key: 'operation',
      render: (text, record) => {

        return( <span>
        <Tooltip title="编辑">
	        <a onClick={(e)=>{
	        	e.preventDefault();
	        	onEditItem(record)}
	        }><Icon type="edit" style={{ fontSize: 16, color: '#08c' }} /></a>
        </Tooltip>
        <Tooltip title="发送注册邮件">
        <a onClick={(e)=>{
        	e.preventDefault();
        	onSendMail(record.id);
        }} style={{ marginLeft:20}}>
        <Icon type="mail" style={{ fontSize: 16, color: '#08c' }} /></a>
        </Tooltip>
        </span>)
      },
    },
  ]
  return (
    <div>
      <Table
        bordered/*是否展示外边框和列边框*/
        scroll={{ x: 1200 }}/*横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{{ x: true, y: 300 }}*/
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}/*分页、排序、筛选变化时触发*/
        pagination={pagination}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

list.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onEditItem: PropTypes.func,
  onSwitch:PropTypes.func,
  onSendMail:PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default list
