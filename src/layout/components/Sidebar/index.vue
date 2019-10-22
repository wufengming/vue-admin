<template>
  <div :class="{'has-logo':showLogo}">
    <!-- <logo v-if="showLogo"
          :collapse="isCollapse" /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        :mode="navMode"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  data() {
    return {
      navMode: 'vertical'
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      // return !this.sidebar.opened
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.scrollbar-wrapper .el-menu {
  padding: 10px;
  .menu-wrapper {
    border-radius: 10px;
    overflow: hidden;
  }
  .el-menu-item.is-active,
  .el-submenu__title:hover,
  .el-menu-item:hover {
    color: #fff !important;
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
  .el-submenu__title:hover i {
    color: #fff !important;
  }
}
</style>

