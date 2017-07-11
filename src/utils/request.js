/*import Ajax from 'robe-ajax'

export default function request (url, options) {
debugger;
  const { method = 'get' } = options
  return Ajax.ajax({
    url,
    method,
    headers: {
        ajax:true
    },
    data: options.data ||{},
    processData: method === 'get',
    dataType: 'JSON',
  }).done((data) => {
  	debugger;
    return data
  })
}*/
import fetch from 'dva/fetch';
import { prefixUrl } from '../constants.js';
import { message } from 'antd';
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function errorPrompt(data) {//全局失败请求过滤（仅仅是失败提示）
	if(!data.success && data.message){
		message.error(data.message);
	}
  return {data};
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
	url=prefixUrl+url;
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(errorPrompt)
    .catch(err => ({ err }));
}