import { request } from '../utils'

/*企业信息查询*/
export async function query (params) {
  return request('/data/bms/enterprise/query', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	},
	body: JSON.stringify(params)
  })
}
/*删除企业信息*/
export async function remove (params) {
  return request('/data/bms/enterprise/delete', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	},
	body: JSON.stringify(params)
  })
}
/*发送注册邮件*/
export async function send_mail (params) {
  return request('/data/bms/enterprise/send-mail', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	},
	body: JSON.stringify(params)
  })
}
/*启用企业*/
export async function enable_enterprise (params) {
  return request('/data/bms/enterprise/enable', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	},
	body: JSON.stringify(params)
  })
}
/*更新企业信息*/
export async function update_enterprise (params) {
  return request('/data/bms/enterprise/update', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	},
	body: JSON.stringify(params)
  })
}
/*添加企业信息*/
export async function add_enterprise (params) {
  return request('/data/bms/enterprise/add', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	},
	body: JSON.stringify(params)
  })
}
/*禁用企业*/
export async function disable_enterprise (params) {
  return request('/data/bms/enterprise/disable', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	},
	body: JSON.stringify(params)
  })
}
/*获取企业详情*/
export async function get_enterprise (id) {
  return request('/data/bms/enterprise/get/'+id, {
    method: 'get',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	}
  })
}
/*获取企业详情*/
export async function get_treeview (code) {
  return request(`/data/bms/region/treeview/${code}`, {
    method: 'get',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	}
  })
}