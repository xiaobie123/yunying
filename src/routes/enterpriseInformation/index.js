import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import UserFilter from './components/UserFilter'
import UserList from './components/userList'
import UserModal from './components/userModel'
const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}
/*保存查询信息*/
var Date={
		keyword:'',
		orderBy:[],
		pagingQuery:{
			pageIndex:1,
			pageSize:10
		}
  };
var index_tem=0;
let Modal_ref=null;
function EnterpriseInformation ({ location, dispatch, enterpriseInformation, loading }) {
	NProgress.done();
	const { list, pagination, currentItem, modalVisible, modalType} = enterpriseInformation;
	debugger;
	console.log(enterpriseInformation);
  const userFilterProps = {
    onSearch (data) {
    	Date={...Date,...data};
    	Date.pagingQuery={
    		pageIndex:1,
				pageSize:10
    	};
    	debugger;
    	dispatch({
        type: 'enterpriseInformation/query',
        payload:Date,
      })
      console.log(Date);
    },
    add(){
    	/*dispatch({
        type: 'enterpriseInformation/add',
        payload:{},
     });

*/      debugger;
    //UserModal.show();
      Modal_ref.refs.wrappedComponent.refs.formWrappedComponent.show();
    },
  }
  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    onPageChange (page,filters,sorter) {
    	debugger;
    	Date.pagingQuery={
    		pageIndex:page.current,
				pageSize:page.pageSize
    	};
    	if(sorter.field){
					Date.orderBy=[{
	    		field:sorter.field,
					order:sorter.order=="descend" ? 0 : 1,
	    	}];
    	}else{
    		Date.orderBy=[];
    	}
    	dispatch({
        type: 'enterpriseInformation/query',
        payload:Date,
      })
    	console.log(Date);
    },
    onEditItem (item) {
    	console.log(item);
      dispatch({
        type: 'enterpriseInformation/editItem',
        payload: {
          id: item.id,
        },
      })
    },
    onSwitch(state){/*状态更改*/
   	debugger;
    	if(state.state){
    		dispatch({
	        type: 'enterpriseInformation/stateEnable',/*启用*/
	        payload: {
	          state: state,
	        },
	      })
    	}else{
    		dispatch({
	        type: 'enterpriseInformation/stateDisable',/*禁用*/
	        payload: {
	          state: state,
	        },
	      })
    	}
    },
    onSendMail(id){/*发送注册邮件*/
    	dispatch({
	        type: 'enterpriseInformation/sendMail',/*禁用*/
	        payload: {
	          id:id,
	        },
	    })
    }
  }
  const userModalProps = {
    item: currentItem,
    visible: modalVisible,
    modalType,
    loading,
    onOk (data) {
    	debugger;
    	if(modalType=="create"){
    		dispatch({
	        type: 'enterpriseInformation/sendAddItem',
	        payload:{parms:data,Date:Date}
	     })
    	}else{
    		dispatch({
	        type: 'enterpriseInformation/sendeditItem',
	        payload:{parms:data,Date:Date}
	     })
    	}

    },
    onCancel () {
    	debugger;
      dispatch({
        type: 'enterpriseInformation/hideModal',
      })
    },
  }
  return (
    <div className="content-inner">
	<div>{index_tem++}</div>
    <UserFilter {...userFilterProps} />
    <UserList {...userListProps}/>
    <UserModal  {...userModalProps} ref={(modal) => { Modal_ref = modal; }} />
    </div>
  )
}
EnterpriseInformation.propTypes = {
  enterpriseInformation: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}
export default connect(({ enterpriseInformation, loading }) => ({ enterpriseInformation, loading: loading.models.enterpriseInformation }))(EnterpriseInformation)
