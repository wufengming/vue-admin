<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="device==='mobile'&&sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- <sidebar class="sidebar-container" /> -->
    <div class="leftUser">
      <ul>
        <li>
          <div>
            <img
              src="@/assets/images/n3logo.png"
              alt=""
            >
          </div>

        </li>
        <li>
          <div
            class="userIcon"
            @click="handleClickOutside"
          >
            <img
              src="@/assets/images/user.png"
              alt=""
            >
          </div>

        </li>
        <li>
          <div class="settingIcon">
            <img
              src="@/assets/images/n3setting.png"
              alt=""
            >
          </div>

        </li>
        <li>
          <div class="logoutIcon">
            <img
              src="@/assets/images/logout.png"
              alt=""
            >
          </div>

        </li>
      </ul>
    </div>
    <div
      :class="{hasTagsView:needTagsView}"
      class="main-container"
    >
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />

      </div>

      <!-- 广告 或者 消息 -->
      <!-- <AD /> -->
      <app-main />
      <!-- 右侧设置按钮 -->
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>

<script>
// import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
// import AD from '@/components/AD'

export default {
  name: 'Layout',
  components: {
    // AD,
    AppMain,
    Navbar
    // RightPanel,
    // Settings,
    // Sidebar,
    // TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow: hidden;
  background: url(../assets/images/homebj.jpg);
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.main-container {
  background: #fff;
  position: absolute;
  top: 0px;
  bottom: 0px;
  border-radius: 10px;
  overflow: hidden;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 20px;
  right: 20px;
  left: 80px;
  z-index: 9;
  border-radius: 10px 10px 0 0;

  transition: left 0.28s;
}

.hideSidebar .fixed-header {
  left: 20px;
}

.mobile .fixed-header {
  width: 100%;
}

.leftUser {
  position: absolute;
  top: 20px;
  left: 20px;
  bottom: 20px;
  border-radius: 10px 0 0 10px;
  overflow: hidden;
  width: 100px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.5);
  background: url(../assets/images/userbj.png) 50% 40%;
  ul {
    list-style: none;
    margin-top: 5px;
    padding: 0;
    li {
      width: 60px;
      text-align: center;
      margin-bottom: 30px;
      cursor: pointer;
      div > img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.userIcon,
.logoutIcon,
.settingIcon {
  width: 40px;
  margin: auto;
}
</style>
