import { request } from '../utils'
export async function query (params) {/*查询*/
  return request('/data/bms/apply/query', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	},
	body: JSON.stringify(params)
  })
}

export async function Switch (params) {/*状态更改的开关*/
  return request('/api/users', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	},
    data: params,
  })
}
export async function getAll () {/*获取状态的字典吗*/
  return request('/data/bms/dict/get-all', {
    method: 'get',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	}
  })
}
export async function operationAudit (params) {/*操作审核弹框*/
	debugger;
  return request('/data/bms/apply/load-audit-info/'+params.id, {
    method: 'get',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	}
  })
}
export async function sendoperationAudit (params) {/*提交操作审核弹框*/
	debugger;
  return request('/data/bms/apply/audit', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	},
  	body: JSON.stringify(params)
  })
}
export async function create (params) {
  return request('/api/users', {
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request('/api/users', {
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request('/api/users', {
    method: 'put',
    data: params,
  })
}
