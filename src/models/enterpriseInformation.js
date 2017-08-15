import { query, remove, send_mail, enable_enterprise, update_enterprise,
	add_enterprise, disable_enterprise, get_enterprise, get_treeview }
from '../services/enterpriseInformation';
import { message } from 'antd';
import { parse } from 'qs';

export default {
  namespace: 'enterpriseInformation',/*企业信息*/
  state: {
    list: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => '共'+total+'条',
      current: 1,
      total: null,
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/dashboard/enterpriseInformation') {
        	let data={
        		keyword:'',
        		pagingQuery:{
        			pageIndex:1,
        			pageSize:10
        		}
        	};
          dispatch({
            type: 'defaul_query',
            payload: {data:data,location:location},
          })
        }
      })
    },
  },
  effects: {
  	/*默认查询*/
  	*defaul_query ({ payload }, { call, put }) {
      const {data} = yield call(query, parse(payload.data))
      debugger;
      if (data.success) {
      	console.log(data);
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.models,
            pagination:{
            	total:data.paging ? data.paging.total:null,
            	current:payload.location.query.page ||1
            },
          },
        })
      }
   },
  	/*查询*/
    *query({ payload }, { call, put }) {
    	debugger;
      const {data} = yield call(query, parse(payload))
      debugger;
      if (data.success) {
      	console.log(data);
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.models,
            pagination:{
            	total:data.paging ? data.paging.total:null,
            	current:payload.pagingQuery.pageIndex
            },
          },
        })
      }
    },
    /*编辑：获取企业详情*/
    *editItem ({ payload }, { call, put }) {
    	debugger;
      const {data} = yield call(get_enterprise, payload.id)
      debugger;
      if (data && data.success) {
        yield put({
          type: 'editload',
          payload: {
            currentItem: data.model,
            modalVisible:true,
            modalType:"edit"
          },
        })
      }
    },
    /*编辑：修改企业详情*/
    *sendeditItem({ payload }, { call, put }){
    	const {data} = yield call(update_enterprise, payload.parms)
      if (data && data.success) {
      	const dataQuery = yield call(query, parse(payload.Date));/*修改成功后，立刻再次请求列表数据*/
      	if(dataQuery.data.success){
      		yield put({
	          type: 'querySuccess',
	          payload: {
	            list: dataQuery.data.models,
	            pagination:{
	            	total:dataQuery.data.paging.total,
	            	current:payload.Date.pagingQuery.pageIndex
	            },
	          },
	        })
         /* yield put({
            type: 'hideModal',
            payload: {},
        });*/
      	}
      }
    },
    /*增加：方式增加数据*/
    *sendAddItem({ payload }, { call, put }){
    	yield put({
          	type: 'hideModal',
          	payload: {},
      	});
    	const {data} = yield call(add_enterprise, payload.parms)
      if (data && data.success) {
      	const dataQuery = yield call(query, parse(payload.Date));/*修改成功后，立刻再次请求列表数据*/
      	if(dataQuery.data.success){
      		yield put({
	          type: 'querySuccess',
	          payload: {
	            list: dataQuery.data.models,
	            pagination:{
	            	total:dataQuery.data.paging.total,
	            	current:payload.Date.pagingQuery.pageIndex
	            },
	          },
	       });
      	}
      }
    },
    /*新增企业信息*/
    *add({ payload }, { call, put }){
        yield put({
          type: 'editload',
          payload: {
            currentItem: {},
            modalVisible:true,
            modalType:"create"
          },
        })
    },
    /*启用*/
    *stateEnable({ payload }, { call, put }){
        const {data} = yield call(enable_enterprise, { id: payload.state.id })
        if(data && data.success){
        	message.success('启用成功');
        }else{
        	message.error('启用失败');
        }
        
    },
    /*禁用*/
    *stateDisable({ payload }, { call, put }){
        const {data} = yield call(disable_enterprise, { id: payload.state.id })
        if(data && data.success){
        	message.success('禁用成功');
        }else{
        	message.error('禁用失败');
        }
    },
    /*发送注册邮件*/
   *sendMail({ payload }, { call, put }){
        const {data} = yield call(send_mail, { id: payload.id })
        if(data && data.success){
        	if(data.message){//有message就读，没有就读默认的
        		message.success(data.message);
        	}else{
        		message.success('注册邮件发送成功');
        	}
        }else if(data && !data.success){
        	if(data.message){//有message就读，没有就读默认的
        	}else{
        		message.error('注册邮件发送失败');
        	}
        }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
          },
        })
      }
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      const data = yield call(create, payload)
      if (data && data.success) {
      	message.success('添加成功');
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
          },
        })
      }
    },
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
      const id = yield select(({ users }) => users.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data && data.success) {
      	message.success('更新成功');
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
          },
        })
      }
    },
    *switchIsMotion ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchIsMotion',
      })
    },
  },

  reducers: {
    querySuccess (state, action) {
      const { list, pagination } = action.payload
      debugger;
      return { ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    editload (state, action){
    	debugger;
    	return { ...state, ...action.payload}
    },
    showModal (state, action) {
 			
      return { ...state, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    handleSwitchIsMotion (state) {
      localStorage.setItem('antdAdminUserIsMotion', !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },

}
