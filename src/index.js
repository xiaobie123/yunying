import dva from 'dva';
import {createLogger} from 'redux-logger';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';
import './index.html';
import './index.css';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  onError(e) {
  	console.error(e.message)
  },
  onAction: createLogger(),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/app'))

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
