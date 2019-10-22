import { logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import axios from '@/utils/request'

// 状态
const state = {
  token: getToken(),
  userid: '', // 用户id
  usercode: '', // 用户code
  username: '', // 用户名称
  orgid: '', // 组织id
  orgcode: '', // 组织编码
  orgname: '', // 组织名称
  year: '', // 年度
  name: '',
  avatar: '',
  roles: [],
  menubutton: {} // 菜单按钮权限

}

// 计算获取取新数据
const getters = {
  getToken: (state) => {
    return state.token
  }
}

// 操作state(同步)
const mutations = {
  // token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}
// 执行一些方法(异步)
const actions = {
  // 用户登录，返回token信息
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      var dataParam = {
        account: username,
        password: password
      }
      axios({
        url: '/user/login',
        method: 'post',
        data: dataParam
      }).then(res => {
        // 保存登录的token信息
        const { data } = res
        // 设置保存token信息
        commit('SET_TOKEN', data.token)
        // 缓存报错token
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      var dataParam = {
        userid: state.userid,
        orgid: state.orgid
      }
      axios({
        url: '/user/userinfo',
        method: 'post',
        data: dataParam
      }).then(res => {
        const { data } = res

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
