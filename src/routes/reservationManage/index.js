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
var Date={
		isOnlyShowNew:0,
		keyword:'',
		orderBy:[],
		pagingQuery:{
			pageIndex:1,
			pageSize:10
		}
  };
function ReservationManage ({ location, dispatch, reservationManage, loading }) {
	NProgress.done();
	const { list, pagination, currentItem, modalVisible, modalType} = reservationManage
	console.log(reservationManage);
  const userFilterProps = {
    onSearch (data) {
    	Date={...Date,...data};
    	Date.pagingQuery={
    		pageIndex:1,
				pageSize:10
    	};
    	debugger;
    	dispatch({
        type: 'reservationManage/queryCom',
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
        type: 'reservationManage/queryCom',
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
        type: 'reservationManage/queryCom',
        payload:Date,
      })
    	console.log(Date);
    },
    onEditItem (item) {
    	console.log(item);
      dispatch({
        type: 'reservationManage/editItem',
        payload: {
          id: item.id,
        },
      })
    },
  }
  const userModalProps = {
    item: currentItem,
    visible: modalVisible,
    onOk (data) {
    	debugger;
    	var parms={
    		auditResult:data.auditResult,
    		demonstrator:data.demonstrator,
    		epd:data.epd,
    		id:data.id,
    		remark:data.remark
    	};
    	dispatch({
        type: 'reservationManage/sendeditItem',
        payload:{parms:parms,Date:Date}
     })
    },
    onCancel () {
    	debugger;
      dispatch({
        type: 'reservationManage/hideModal',
      })
    },
  }
  const UserModalGen = () =>
    <UserModal {...userModalProps} />
  return (
    <div className="content-inner">
    <UserFilter {...userFilterProps} />
    <UserList {...userListProps}/>
    <UserModalGen />
    </div>
  )
}
ReservationManage.propTypes = {
  reservationManage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}
export default connect(({ reservationManage, loading }) => ({ reservationManage, loading: loading.models.users }))(ReservationManage)
