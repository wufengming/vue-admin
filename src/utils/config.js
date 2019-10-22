
import Auth from '@/utils/auth'
const Base64 = require('js-base64').Base64

const AxiosHeader = {
  // 网站api的地址
  // baseurl: 'http://10.0.13.52:8028',
  // baseurl:window.global.baseUrl,
  baseurl: process.env.VUE_APP_BASE_API,

  userkey: 'admin',

  /**
     * 登录获取 ajax headers的appinfo信息
     * @param {*} object
     * object.orgid 组织id
     * object.userid 用户id
     * object.accoun 用户账号
     * object.appKey  appKey
     * object.appSecret  appSecret
     */
  getAppInfoLogin: function(object, dbbase) {
    var token = Auth.getToken()

    var appinfo_Object = {
      DbName: dbbase || token.dbname,
      OrgId: object.orgid,
      OrgName: '',
      OCode: '',
      UserId: object.userid,
      UserKey: '',
      UserName: '',
      TokenKey: '',
      AppKey: token.appKey,
      AppSecret: token.appSecret,
      DbServerName: '',
      SessionKey: '',
      UName: ''
    }
    var appInfo = Base64.encode(JSON.stringify(appinfo_Object))

    return appInfo
  },
  /**
     * 获取Axios基本配置信息,不存在时间控制
     */
  getAjaxConfig: function() {
    var config = {
      // baseURL: this.baseurl + '/api/GCW'
      baseURL: process.env.VUE_APP_BASE_API
    }
    return config
  }
}

export default AxiosHeader
