<template>
  <div
    class="ZGLH_type"
    :class="{active:active}"
  >
    <div
      class="titleIndex"
      :style="{'background-color':color}"
      :class="{titleActive:active}"
    >
      <div
        v-show="!active"
        class="circle"
        :style="{color:color}"
      >{{ index+1 }}</div>
    </div>
    <div
      class="ZGLHcontent"
      :style="{'background-color':active?color:''}"
      :class="{ZGLHcontentActive:active}"
    >
      <p :style="{color:active?'#fff':color}">{{ title }}</p>
      <p :style="{color:active?'#fff':''}">{{ text }}</p>
    </div>
    <i
      v-show="active"
      :style="{color:active?color:''}"
      class="el-icon-caret-top arrowIcon"
    />
  </div>
</template>

<script>
export default {
  name: 'ZGLHType',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: 'yellow'
    },
    title: {
      type: String,
      default: '标题'
    },
    text: {
      type: String,
      default: '内容'
    }
  }
}
</script>

<style lang="scss" scoped>
.ZGLH_type {
  width: 250px;
  height: 100px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  cursor: pointer;
  .titleIndex {
    width: 50px;
    float: left;
    height: 100%;
    position: relative;
    border-radius: 8px 0 0 8px;
    .circle {
      position: absolute;
      background: #fff;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-weight: 400;
      font-size: 22px;
      border-radius: 50%;
      top: 25px;
      left: 25px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    }
  }
  .titleActive {
    width: 0;
  }
  .ZGLHcontent {
    float: left;
    width: 200px;
    height: 100%;
    padding-left: 30px;
    border-radius: 8px;
    > p {
      height: 50%;
      line-height: 25px;
      font-size: 14px;
      &:first-of-type {
        line-height: 50px;
        font-size: 20px;
      }
    }
  }
  .ZGLHcontentActive {
    width: 100%;
    padding-left: 0px;
    text-align: center;
  }
}
.active {
  cursor: default;
}
.arrowIcon {
  font-size: 32px;
  margin-top: -10px;
}
</style>

