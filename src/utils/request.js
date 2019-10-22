/**
 * axios全局配置
 * TODO: 拦截器全局配置，根据实际情况修改
 */
import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import config from '@/utils/config'

let _loading

// create an axios instance
const service = axios.create({
  baseURL: config.baseurl,
  timeout: 10000 // 请求超时时间
})

// http request 请求拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
service.interceptors.request.use(
  config => {
    _loading = Loading.service({ text: '数据加载中...' }) // 开启加载中图标..
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }

    // 添加请求的时间戳
    if (config.method.toUpperCase() === 'GET') {
      // debugger
      config.params.t = new Date().getTime()
    }
    if (config.method.toUpperCase() === 'POST') {
      // config.data.t = new Date().getTime()
      // POST传参序列化
      config.data = JSON.stringify(config.data)
      config.headers['Content-Type'] = 'application/json;'
    }

    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// http response 响应拦截器
// 针对响应代码确认跳转到对应页面
service.interceptors.response.use(

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    _loading.close() // 关闭加载中图标..
    // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
    // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可 response.data
    const res = response.data
    // 5008：非法令牌; 5012：其他客户登录; 5014：令牌已过期;
    if (res.code === 5008 || res.code === 5012 || res.code === 5014) {
      // to re-login
      MessageBox.confirm('您已退出，可以取消此页面，或者重新登录', '确认注销', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }

    if (typeof (res) === 'object' && Object.prototype.toString.call(res).toLowerCase() === '[object object]' && !res.length) {
      return Promise.resolve(res)
    } else {
      var jsonStr = res.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace('：', ':')
      return Promise.resolve(JSON.parse(jsonStr))
    }
  },
  error => {
    _loading.close() // 关闭加载中图标..
    // 对响应错误做点什么
    if (axios.isCancel(error)) {
      Message({ message: 'Ajax Abort: 该请求在axios拦截器中被中断', type: 'error' })
    } else if (error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求出现错误'
          break
        case 401:
          error.message = '没有提供认证信息'
          break
        case 403:
          error.message = '请求的资源不允许访问'
          break
        case 404:
          error.message = `请求的内容不存在: ${error.response.config.url}`
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务暂时不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          Message({ message: `服务器错误！错误代码：${error.response.status}`, type: 'error' })
      }
    }

    var obj = error.response.data
    if (typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length) {
      return Promise.reject(obj)
    } else {
      try {
        const res = obj.replace(/\n/g, '\\n').replace(/\r/g, '\\r')
        return Promise.reject(JSON.parse(res))
      } catch (e) {
        console.log('error-json：' + obj + '!!!' + e)
        return Promise.reject(obj)
      }
    }
  }
)

export default service
