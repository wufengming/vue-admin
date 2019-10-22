/**
 * axios全局配置
 * TODO: 拦截器全局配置，根据实际情况修改
 * 在config.js文件中统一存放一些公共常量，方便之后维护
 */
import axios from './request'
// import Qs from 'qs'

// 封装axios--------------------------------------------------------------------------------------
function apiAxios(method, url, params, hastimeout) {
  var config = {
    // 'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'jsonwebtoken',
    'token': 'token'
  }

  // 封装headers 头信息
  const httpDefault = {
    headers: config,
    method: method,
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: method === 'POST' || method === 'PUT' ? params : null
    // data: method === 'POST' || method === 'PUT' ? Qs.stringify(params) : method === 'FORM' ? params : null
  }

  // 请求超时时间,默认10s
  if (!hastimeout) {
    httpDefault.timeout = 10000
  } else {
    httpDefault.timeout = hastimeout
  }

  // 注意**Promise**使用(Promise首字母大写)
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      .then(res => {
        resolve(res)
      })
      .catch(response => {
        reject(response)
      })
  })
}

// 封装axios--------------------------------------------------------------------------------------

// 输出函数getAxios、postAxios、putAxios、delectAxios，formAxios 供其他文件调用-----------------------------
// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
export default {
  install: function(Vue) {
    Vue.prototype.getAxios = (url, params, timeout) =>
      apiAxios('GET', url, params, timeout)
    Vue.prototype.postAxios = (url, params, timeout) =>
      apiAxios('POST', url, params, timeout)
    Vue.prototype.putAxios = (url, params, timeout) =>
      apiAxios('PUT', url, params, timeout)
    Vue.prototype.delectAxios = (url, params, timeout) =>
      apiAxios('DELECT', url, params, timeout)
  }
}
