import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import UserFilter from './components/UserFilter'
import UserList from './components/userList'
import UserModal from './components/userModel'
let ssss=1;
const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}
var Date={
		keyword:'',
		orderBy:[],
		pagingQuery:{
			pageIndex:1,
			pageSize:10
		}
  };
function VichainUserManage ({ location, dispatch, vichainUserManage, loading }) {
	const { list, pagination} = vichainUserManage
	console.log(vichainUserManage);
  const userFilterProps = {
    onSearch (data) {
    	Date={...Date,...data};
    	Date.pagingQuery={
    		pageIndex:1,
				pageSize:10
    	};
    	debugger;
    	dispatch({
        type: 'vichainUserManage/queryCom',
        payload:Date,
      })
      console.log(Date);
    },
    onOnlyNewApply (data){
    	Date={...Date,...data};
    	Date.pagingQuery={
    		pageIndex:1,
				pageSize:10
    	};
    	debugger;
    	dispatch({
        type: 'vichainUserManage/queryCom',
        payload:Date,
      })
    	console.log(Date);
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
        type: 'vichainUserManage/queryCom',
        payload:Date,
      })
    	console.log(Date);
    },
    onEditItem (item) {
    	console.log(item);
      dispatch({
        type: 'vichainUserManage/editItem',
        payload: {
          id: item.id,
        },
      })
    },
  }
  return (
    <div className="content-inner">
	<div>{ssss++}</div>
    <UserFilter {...userFilterProps} />
    <UserList {...userListProps}/>
    </div>
  )
}
VichainUserManage.propTypes = {
  vichainUserManage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}
export default connect(({ vichainUserManage, loading }) => ({ vichainUserManage, loading: loading.models.vichainUserManage }))(VichainUserManage)
