// 合作社接口
import Vue from 'vue'

export function getCompanyList(param) {
  return Vue.prototype.postAxios('/gq/company/getList', param)
}
