import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState  from 'vuex-persistedstate'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const state = {
  // 登录状态的
  isLogin: false
}

// 计算获取取新数据
const getters = {
  getIsLogin: state => state.isLogin,

  sidebar: state => state.app.sidebar,
  // 当前语言模式
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  // 导航栏
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  // 用户状态
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,

  permission_routes: state => state.permission.routes,

  errorLogs: state => state.errorLog.logs
}

// 操作state(同步)
const mutations = {
  // 登录状态
  SET_ISLogin(state, data) {
    state.isLogin = data
  }
}

// 执行一些方法(异步)
const actions = {
  actionIsLogin({ commit }, data) {
    commit('SET_ISLogin', data)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules
  // plugins: [createPersistedState({
  //   storage: window.sessionStorage
  // })]
})

export default store
