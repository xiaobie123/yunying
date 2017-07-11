import React from 'react';
import { Router } from 'dva/router';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
import App from './routes/app';
const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
        	registerModel(app, require('./models/reservationManage'))
          cb(null, { component: require('./routes/reservationManage/') })
        }, 'reservationManage')
      },
      childRoutes: [
        {
          path: '/dashboard/reservationManage',
          name: '/dashboard/reservationManage',
          getComponent (nextState, cb) {
            require.ensure([], require => {
            	registerModel(app, require('./models/reservationManage'))
              cb(null, require('./routes/reservationManage/'))
            },'dashboard-reservationManage')
          },
        },{
          path: '/dashboard/vichainUserManage',
          name: '/dashboard/vichainUserManage',
          getComponent (nextState, cb) {
            require.ensure([], require => {
            	registerModel(app, require('./models/vichainUserManage'))
              cb(null, require('./routes/vichainUserManage/'))
            },'dashboard-vichainUserManage')
          },
        },{
          path: '/dashboard/enterpriseInformation',
          name: '/dashboard/enterpriseInformation',
          getComponent (nextState, cb) {
            require.ensure([], require => {
            	registerModel(app, require('./models/enterpriseInformation'))
              cb(null, require('./routes/enterpriseInformation/'))
            },'dashboard-enterpriseInformation')
          },
        }
        ]
    },
    {
      path: '/users',
      name: 'UsersPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/IndexPage'));
        });
      },
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
