import { request } from '../utils'

export async function login (params) {
  return request('/data/bms/user/login', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true
  	},
	  body: JSON.stringify(params)
  })
}

export async function logout (params) {
  return request('/api/logout', {
    method: 'post',
    data: params,
  })
}

export async function userInfo (params) {
  return request('/api/userInfo', {
    method: 'get',
    data: params,
  })
}
