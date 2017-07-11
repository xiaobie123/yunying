import React, { PropTypes } from 'react'
import { Table, Modal, Switch } from 'antd'
import moment from 'moment';
import styles from './UserList.less'
import classnames from 'classnames'


const confirm = Modal.confirm

function list ({ loading, dataSource, pagination, onPageChange, onDeleteItem, onEditItem, isMotion, location }) {
	let uti={
		nullReplace(value){
			if(value==null||value==""){
				return "- -";
			}else{
				return value;
			}
		},
	}
  function getcategoryCode (){
  	var models=window.model.get_all.models;
  	if(dataSource[0]){
  		let statusCategoryCode=dataSource[0].statusCategoryCode;
  		for(var i=0;i<models.length;i++){
  			if(models[i].categoryCode==statusCategoryCode){
  			return models[i].itemList;
  			}
  		}
  	}
  }
  function onChange(checked) {
  console.log(`switch to ${checked}`);
}
  //var categoryCode=getcategoryCode();
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'enterpriseName',
      key: 'enterpriseName',
      sorter: true,
    }, {
      title: '申请人名称',
      dataIndex: 'applicant',
      key: ' applicant',
      sorter: true,
    }, {
      title: '联系方式',
      dataIndex: 'phoneNumber',
      key: ' phoneNumber',
      sorter: true,
    },{
      title: '联系邮箱',
      dataIndex: 'email',
      key: ' email',
      sorter: true,
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (text, record) => {
      	 var state;
      	 console.log(record.statusCode);
      	 if(record.statusCode==2){
      	 	state=true;
      	 }
      	 if(record.statusCode==3){
      	 	state=false;
      	 }
      	 if(record.statusCode==1){
      	 	return <span className={styles.xin}>新申请</span>
      	 }
        return <Switch checked={state} onChange={onChange} checkedChildren={'演示'} unCheckedChildren={'拒绝'} />
      },
      
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      sorter: true,
      render: (text, record) => {
        return uti.nullReplace(text);
      },
    }, {
      title: '演示人',
      dataIndex: 'demonstrator',
      key: 'demonstrator',
      sorter: true,
      render: (text, record) => {
        return uti.nullReplace(text);
      },
    }, {
      title: '预计演示日期',
      dataIndex: 'epd',
      key: 'epd',
      sorter: true,
      render: (text, record) => {
      	if(!record.epd==''){
      		
      		return moment(new Date(record.epd)).format('YYYY-MM-DD');
      	}else{
      		return uti.nullReplace(text);
      	}
        
      },
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
      	
        return <a style={{}} onClick={(e)=>{
        	e.preventDefault();
        	onEditItem(record)}
        }>审核</a>
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
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default list
