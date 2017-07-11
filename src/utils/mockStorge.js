const Watch = require('watchjs')
import config from './config'

export default function mockStorge (name, defaultValue) {
  let key = config.prefix + name/*生成一个key*/
  global[key] = localStorage.getItem(key)/*如国有这个key对应的值就取出来*/
    ? JSON.parse(localStorage.getItem(key))
    : defaultValue
  !localStorage.getItem(key) && localStorage.setItem(key, JSON.stringify(global[key]))/*没有的话就设置一个*/
  Watch.watch(global[key], () => {/*这个全局变量一变就会被存储在local中*/
    localStorage.setItem(key, JSON.stringify(global[key]))
  })
  return key
}
