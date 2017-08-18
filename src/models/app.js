import { message} from 'antd';
import { login, userInfo, logout } from '../services/app'
import { getAll } from '../services/reservationManage'
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
window.model={};/*缓存一些全局变量*/
export default {
  namespace: 'app',
  state: {
    login:sessionStorage.getItem('login') === 'true',
    user: {
      name: sessionStorage.getItem('username'),
    },
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]'),
  },
  subscriptions: {
    setup ({ dispatch,history }) {
      window.onresize = () => {
        dispatch({ type: 'changeNavbar' })
      }
      history.listen(location => {
        debugger;
        NProgress.start();
      })
    },
  },
  effects: {
    *login ({
      payload,
    }, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' })/*用于触发action*/
      console.log(parse(payload));
      const {data} = yield call(login, parse({pwd:payload.password,userName:payload.username}))
      console.log(data);
      if (data.success) {
      	sessionStorage.setItem('sid',data.model.sid);/*保存sid，因为没有ajax的请求都需要他*/
      	sessionStorage.setItem('username',payload.username);
      	const  getall=yield call(getAll);
      	if(getall.data.success){
      		window.model.get_all=getall.data;
      		yield put({
	          type: 'loginSuccess',
	          payload: {
	            user: {
	              name: payload.username,
	            },
	        } })
      		yield put(routerRedux.push('/dashboard/reservationManage'));
      	}
        
      } else {
      	message.error(data.message,3);
        yield put({
          type: 'loginFail',
        })
      }
    },
    *queryUser ({
      payload,
    }, { call, put }) {
      const data = yield call(userInfo, parse(payload))
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: data.username,
            },
          },
        })
      }
    },
    *logout ({
      payload,
    }, { call, put }) {
      //const data = yield call(logout, parse(payload))
      //if (data.success) {
        yield put({
          type: 'logoutSuccess',
        })
      //}
    },
    *switchSider ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchSider',
      })
    },
    *changeTheme ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleChangeTheme',
      })
    },
    *changeNavbar ({
      payload,
    }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
    *switchMenuPopver ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchMenuPopver',
      })
    },
  },
  reducers: {
    loginSuccess (state, action) {
    	sessionStorage.setItem('login','true');
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false,
      }
    },
    logoutSuccess (state) {
    	sessionStorage.setItem('sid',null);
    	sessionStorage.setItem('login','false');
      return {
        ...state,
        login: false,
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false,
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true,
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true,
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false,
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },
    handleNavOpenKeys (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
