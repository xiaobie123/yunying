import { request } from '../utils'
export async function query (params) {/*查询*/
  return request('/data/bms/vcuser/query', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "ajax":true,
    "sid":sessionStorage.getItem("sid"),
  	},
	body: JSON.stringify(params)
  })
}

