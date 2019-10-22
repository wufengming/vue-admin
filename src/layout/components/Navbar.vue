<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <div
      id="breadcrumb-container"
      class="breadcrumb-container"
    >
      <div
        class="fl"
        @click.stop="orgTreeShow"
      >
        <el-popover
          width="300"
          placement="bottom-start"
          :popper-class="'maxH topElpop'"
          trigger="click"
          @show="arrow=true"
          @hide="arrow=false"
        >
          <el-tree
            ref="orgtree"
            node-key="OCode"
            :highlight-current="true"
            :props="defaultProps"
            :default-expanded-keys="[org.OCode]"
            :data="orgList"
            :render-content="rendercontent"
            :expand-on-click-node="false"
            @node-click="orgChange"
          />
          <p
            slot="reference"
            class="imgCon"
          >
            <el-tooltip
              popper-class="poperClass_home"
              placement="bottom-start"
              :content="'当前组织: '+orgname"
            >
              <img
                src="@/assets/images/orgnize.png"
                alt=""
                @click="orgTreeShow"
              >
            </el-tooltip>
          </p>
        </el-popover>
      </div>
      <!-- <el-tooltip popper-class="poperClass_home"
                  placement="bottom-start"
                  :content="'当前组织: '+orgname">
        <div>

          <img @click="orgTreeShow"
               src="@/assets/images/orgnize.png"
               alt="">

        </div>
      </el-tooltip> -->
    </div>
    <!-- 当前页面路径 -->
    <!-- <breadcrumb id="breadcrumb-container"
                class="breadcrumb-container" /> -->
    <tags-view
      v-if="needTagsView"
      :handle.sync="tagsHandle"
      :width="tagsViewWidth"
    />
    <div class="right-menu">
      <!-- <template v-if="device!=='mobile'"> -->
      <!-- <search id="header-search"
                class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" /> -->
      <!-- 全屏 -->
      <!-- <screenfull id="screenfull"
                    class="right-menu-item hover-effect" /> -->
      <!-- 布局大小 -->
      <!-- <el-tooltip :content="$t('navbar.size')"
                    effect="dark"
                    placement="bottom">
          <size-select id="size-select"
                       class="right-menu-item hover-effect" />
        </el-tooltip> -->
      <!-- 语言 -->
      <!-- <lang-select class="right-menu-item hover-effect" /> -->

      <!-- </template> -->
      <el-row style="width:360px;text-align:center;margin-right: 20px;">
        <el-col
          style="margin-top:5px ;width:120px"
          :span="8"
        >
          <el-card
            :body-style="{padding: '0 10px',height: '38px','border-radius':'10px','line-height': '38px','cursor':'pointer'}"
            @click.stop.native="tagsHandle=!tagsHandle"
          >
            <span>标签选项</span>
            <i class="el-icon-arrow-down" />
          </el-card>
        </el-col>
        <el-col
          style="margin-top:5px;padding-left:8px"
          :span="4"
        >
          <el-card :body-style="{padding: '0 10px',height: '38px','line-height': '38px',}">
            <div class="indexIcon">
              <img
                src="@/assets/images/index.png"
                alt=""
              >
            </div>

          </el-card>
        </el-col>
        <el-col :span="12">
          <el-dropdown
            class="avatar-container right-menu-item hover-effect"
            trigger="click"
          >
            <div class="avatar-wrapper">
              <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'"
               class="user-avatar">
          <i class="el-icon-caret-bottom" /> -->
              <el-card
                :body-style="{
                  padding: '0 ',
                  height: '38px',
                  'line-height': '38px',}"
              >
                <div class="navIcon">
                  <img
                    src="@/assets/images/nav.png"
                    alt=""
                  >
                  <span>功能导航</span>
                </div>

              </el-card>

            </div>
            <el-dropdown-menu slot="dropdown">
              <div
                style="position: fixed;
                          overflow:hidden;
                          width:190px;
                          top: 68px;
                              border-radius: 5px;
                          bottom: 30%;
                          right: 20px;"
              >
                <sidebar class="sidebar-container" />
              </div>

              <!-- 下拉个人中心 -->
              <!-- <el-dropdown-menu slot="dropdown">
              <router-link to="/profile/index">
                <el-dropdown-item>
                  {{ $t('navbar.profile') }}
                </el-dropdown-item>
              </router-link>
              <router-link to="/">
                <el-dropdown-item>
                  {{ $t('navbar.dashboard') }}
                </el-dropdown-item>
              </router-link>
              <a target="_blank"
                 href="https://github.com/PanJiaChen/vue-element-admin/">
                <el-dropdown-item>
                  {{ $t('navbar.github') }}
                </el-dropdown-item>
              </a>
              <a target="_blank"
                 href="https://panjiachen.github.io/vue-element-admin-site/#/">
                <el-dropdown-item>Docs</el-dropdown-item>
              </a>
              <el-dropdown-item divided>
                <span style="display:block;"
                      @click="logout">{{ $t('navbar.logOut') }}</span>
              </el-dropdown-item>
            </el-dropdown-menu> -->
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>

import Sidebar from './Sidebar/index'
import tagsView from './TagsView/index'
import { mapGetters, mapState } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import LangSelect from '@/components/LangSelect'
// import Search from '@/components/HeaderSearch'

export default {
  components: {
    // Breadcrumb,
    Hamburger,
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    // LangSelect,
    // Search,
    tagsView,
    Sidebar
  },
  data() {
    return {
      orgname: '杭州政云66666666666666',
      tagsViewWidth: '50%',
      tagsHandle: false,
      org: {
        OCode: 101,
        OName: 'hz'
      },
      orgList: [
        {
          OCode: 101,
          OName: 'hz',
          children: [
            {
              OCode: 101,
              OName: 'hz'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'OName'
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    ...mapState({
      needTagsView: state => state.settings.tagsView
    })

  },

  beforeMount() {
    const vm = this
    window.addEventListener('resize', vm.setTagsWid)
  },
  beforeDestroy() {
    const vm = this
    window.removeEventListener('resize', vm.setTagsWid)
  },
  mounted() {
    this.setTagsWid()
  },
  methods: {
    orgTreeShow() { // 组织树显示
      this.$refs.orgtree.setCurrentNode({ OCode: this.orgcode })
    },
    orgChange(val) { // 组织改变
      if (val.WeChatId === 'false') {
        this.$msgBox.error('当前组织没有操作权限,请联系管理员!')
        return
      }
      this.$store.commit('user/setOrganize', val)

      const p = document.querySelector('.handleBtnCon .orgName')
      p.click()
      this.refresh()
    },
    // 组织树样式
    rendercontent(h, { node, data, store }) {
      let cssname = ''
      if (node.data.WeChatId === 'false') {
        cssname = 'disableOrg'
      }
      return (
        <span class={cssname}>
          <span>{node.label}</span>

        </span>)
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    setTagsWid() {
      const hamburger = document.querySelector('#hamburger-container')
      const breadcrumb = document.querySelector('#breadcrumb-container')
      const header = document.querySelector('.fixed-header')
      const ham_W = window.getComputedStyle(hamburger).width
      const breadcrumb_W = window.getComputedStyle(breadcrumb).width
      const header_W = window.getComputedStyle(header).width
      this.tagsViewWidth = parseFloat(header_W) - parseFloat(ham_W) - parseFloat(breadcrumb_W) - 370 - 30 + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.navbar {
  height: 50px;
  border-radius: 10px 10px 0 0;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #ccc;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    height: 100%;
    line-height: 50px;
    p.imgCon {
      height: 50px;
      width: 50px;
      margin-top: 5px;
      cursor: pointer;
      img {
      }
    }
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    color: $blue !important;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0;
      width: 100%;
      margin-left: 10px;
      height: 100%;
      font-size: 18px;
      color: $blue !important;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.indexIcon {
  width: 40px;
  margin-left: -5px;
  > img {
    vertical-align: middle;
    width: 100%;
    height: 100%;
  }
}
.navIcon {
  img {
    vertical-align: middle;
    height: 100%;
    position: relative;
    top: -2px;
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  background-color: $menuBg;
  // height: 100%;
  position: absolute;
  font-size: 0px;
  top: 0px;
  bottom: -20px;
  right: -20px;
  z-index: 1001;
  overflow: scroll;

  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    height: 100%;
  }

  &.has-logo {
    .el-scrollbar {
      height: calc(100% - 50px);
    }
  }

  .is-horizontal {
    display: none;
  }

  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }

  .svg-icon {
    margin-right: 16px;
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }

  // menu hover
  .submenu-title-noDropdown,
  .el-submenu__title {
    &:hover {
      background-color: $menuHover !important;
    }
  }

  .is-active > .el-submenu__title {
    color: $subMenuActiveText !important;
  }

  & .nest-menu .el-submenu > .el-submenu__title,
  & .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.hideSidebar {
  .sidebar-container {
    width: 54px !important;
  }

  .main-container {
    margin-left: 54px;
  }

  .submenu-title-noDropdown {
    padding: 0 !important;
    position: relative;

    .el-tooltip {
      padding: 0 !important;

      .svg-icon {
        margin-left: 20px;
      }
    }
  }

  .el-submenu {
    overflow: hidden;

    & > .el-submenu__title {
      padding: 0 !important;

      .svg-icon {
        margin-left: 20px;
      }

      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    .el-submenu {
      & > .el-submenu__title {
        & > span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
}

.el-menu--collapse .el-menu .el-submenu {
  min-width: $sideBarWidth !important;
}
.right-menu-item .el-card,
.right-menu .el-card {
  color: $blue;
  font-weight: 600;
  font-size: 18px;
  border-radius: 8px;
}
</style>

<style lang="scss">
@import "~@/styles/variables.scss";
.poperClass_home {
  background: $blue !important;
  font-size: 16px;
}
.poperClass_home .popper__arrow:after {
  border-bottom-color: $blue !important;
}
.topElpop {
  box-shadow: 0 2px 12px 0 rgba(98, 172, 252, 0.63) !important;
}
</style>
