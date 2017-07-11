import {query} from '../services/vichainUserManage'
import { parse } from 'qs'

let date={
	
}
export default {
  namespace: 'vichainUserManage',/*预约演示用户管理*/
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    }
  },
  subscriptions: {
    setup ({ dispatch, history }) {
    	history.listen(location => {
      	debugger;
        if (location.pathname === '/dashboard/vichainUserManage') {
        	let data={
    		keyword:'',
    		orderBy:[],
    		pagingQuery:{
    			pageIndex:1,
    			pageSize:10
    		}
        };
          dispatch({
            type: 'query',
            payload: {data:data,location:location},
          })
        }
      })
      
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
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
            	current:1
            },
          },
        })
      }
    },
    *queryCom({ payload }, { call, put }) {
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
    }
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
    }
  },

}
