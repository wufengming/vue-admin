import request from '@/utils/request'
// 获取股权证列表
export function getTableData(data) {
  return request({
    url: '/gq/stock/getList',
    method: 'post',
    data
  })
}

// 获取本次可量化的最大股数 /gq/stock/getQuantizableMaximum
export function getQuantizableMaximum(data) {
  return request({
    url: '/gq/stock/getQuantizableMaximum',
    method: 'post',
    data
  })
}
// 根据组织id，获取 股权类型  /gq/stock/getShareTypeAllList
export function getShareType(data) {
  return request({
    url: '/gq/stock/getShareTypeAllList',
    method: 'post',
    data
  })
}
