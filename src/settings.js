module.exports = {
  title: 'N3C Admin',

  /**
   * @type {boolean} true | false
   * @description 是否显示右侧面板的设置
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否修复标题
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description 是否在侧边栏中显示徽标
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description  需要显示错误日志组件.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
