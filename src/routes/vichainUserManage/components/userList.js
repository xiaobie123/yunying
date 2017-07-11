import React, { PropTypes } from 'react'
import { Table, Modal, Switch } from 'antd'
import moment from 'moment';
import styles from './UserList.less'
import classnames from 'classnames'


const confirm = Modal.confirm

function list ({ loading, dataSource, pagination, onPageChange,location }) {
	let uti={
		nullReplace(value){
			if(value==null||value==""){
				return "- -";
			}else{
				return value;
			}
		},
	}
  function onChange(checked) {
  console.log(`switch to ${checked}`);
}
  const columns = [
    {
      title: '社区名称',
      dataIndex: 'comName',
      key: 'comName',
      width:150,
      sorter: true,
    }, {
      title: '企业名称',
      dataIndex: 'entName',
      key: ' entName',
      width:150,
      sorter: true,
    }, {
      title: '用户名称',
      dataIndex: 'usrName',
      key: ' usrName',
      width:150,
      sorter: true,
    },{
      title: '用户账户',
      dataIndex: 'usrNo',
      key: ' usrNo',
      width:150,
      sorter: true,
    }, {
      title: '用户邮箱',
      dataIndex: 'usrMail',
      key: 'usrMail',
      width:150,
      sorter: true,
      
    }, {
      title: '明文密码',
      dataIndex: 'pwd',
      key: 'pwd',
      width:150,
      sorter: true,
    }, {
      title: '注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
      width:150,
      sorter: true,
      render: (text, record) => {
		if(!record.registerTime==''){
      		return moment(new Date(record.registerTime)).format('YYYY-MM-DD');
      	}else{
      		return "--";
      	}
      },
    }, {
      title: '是否是企业管理员',
      dataIndex: 'isEntAdmin',
      key: 'isEntAdmin',
      width:'230px',
      sorter: true,
      render: (text, record) => {
        if(record.isEntAdmin==1){
				return "是";
			}else{
				return "否";
			}
      },
    },{
      title: '是否社区管理员',
      key: 'isComAdmin',
      dataIndex: 'isComAdmin',
      width:230,
      sorter: true,
      render: (text, record) => {
		if(record.isComAdmin==1){
				return "是";
			}else{
				return "否";
			}
      },
    }, 
    {
      title: '创建人',
      key: 'createBy',
      dataIndex: 'createBy',
      width:150,
      sorter: true,
    },{
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      sorter: true,
      width:150,
      render: (text, record) => {
		if(!record.createTime==''){
      		return moment(new Date(record.registerTime)).format('YYYY-MM-DD');
      	}else{
      		return "--";
      	}
      },
    },{
      title: '是否已删除',
      key: 'isDelete',
      dataIndex: 'isDelete',
      sorter: true,
      width:200,
      render: (text, record) => {
      	console.log(record.isDelete);
			if(record.isDelete==1){
				return "是";
			}else{
				return "否";
			}
      },
    }
  ]
  return (
    <div>
      <Table
        bordered/*是否展示外边框和列边框*/
        scroll={{ x: 1300 }}/*横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{{ x: true, y: 300 }}*/
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
  location: PropTypes.object,
}

export default list
