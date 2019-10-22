// import Cookies from 'js-cookie'
import { setStore, getStore, removeStore } from '@/utils/storage'

// 当Token超时后采取何种策略
// jumpAuthPage  每次请求时判断Token是否超时，若超时则跳转到登录页面
// getToken  每次请求时判断Token是否超时，若超时则获取新Token (推荐)
// localStorage 和 sessionStorage两种缓存信息
const TokenKey = 'Admin-Token'
// 用户缓存信息
const userinfo = 'user'
// 菜单权限
const menuKey = 'menus'

/** *****************Token sessionStorage************************** */
export function getToken() {
  return getStore({ name: TokenKey, type: 'session' })
}

export function setToken(token) {
  if (token) { removeStore({ name: TokenKey }) }
  setStore({ name: TokenKey, content: token, type: 'session' })
}

export function removeToken() {
  return removeStore({ name: TokenKey })
}

/** *****************UserInfo sessionStorage************************** */

// 获取用户缓存信息
export function getUserInfoData() {
  return getStore({ name: userinfo, type: 'session' })
}

// 设置用户缓存信息
export function setUserInfoData(data) {
  if (data) { removeStore({ name: userinfo }) }
  setStore({ name: userinfo, content: data, type: 'session' })
}

// 移除用户缓存信息 和 移除登录状态
export function removeUserInfoData() {
  removeStore({ name: userinfo })
}

/** *****************Menu sessionStorage************************** */
// 当前是菜单
export function getMenuStatus() {
  return getStore({ name: menuKey, type: 'session' })
}

// 设置菜单缓存
export function setMenuStatus(data) {
  if (data) { removeStore({ name: menuKey }) }
  setStore({
    name: menuKey,
    content: data,
    type: 'session'
  })
}
// 移除菜单缓存
export function removeMenuStatus() {
  removeStore({
    name: menuKey
  })
}
