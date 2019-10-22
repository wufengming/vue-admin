<template>
  <section
    class="searchComponent"
    :style="{width:!showBtn?'240px':''}"
  >
    <el-input
      v-model="inputValue"
      class="input"
      :size="size"
      :style="inputStyle"
      :placeholder="placeholder"
      @keyup.enter.native="btnClick(inputValue)"
    />
    <el-button
      class="button"
      :size="size"
      :type="type"
      :style="btnStyle"
      @click="btnClick(inputValue)"
    >{{ label }}</el-button>
    <!-- <el-popover placement="top"
                width="160"
                v-model="visible">
      <p>这是一段内容这是一段内容确定删除吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini"
                   type="text"
                   @click="visible = false">取消</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="visible = false">确定</el-button>
      </div>
      <el-button slot="reference">删除</el-button>
    </el-popover> -->

    <el-popover
      v-if="showBtn"
      v-model="visible"
      placement="bottom-end"
      trigger="click"
    >

      <slot />
      <el-button
        slot="reference"
        class="button"
        :size="size"
        :type="type"
        :style="btnStyle2"
      >{{ text }}</el-button>
    </el-popover>
  </section>
</template>

<script>
/**
 * size：输入框与按钮的尺寸，值有mini、small，medium
 * placeholder:输入框内的提示文字，字符串
 * label：按钮的内的文字，字符串
 * type：按钮的类型，elementUI 按钮tpye值
 * inputStyle：输入框样式，对象，默认输入框长度为180px
 */
export default {
  name: 'SearchInput',
  props: {
    size: {
      type: String,
      default: 'mini'
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '搜索'
    },
    text: {
      type: String,
      default: '高级'
    },
    type: {
      type: String,
      default: 'primary'
    },
    inputStyle: {
      type: Object,
      default: function() {
        return {
          width: '190px'
        }
      }
    },
    btnStyle: {
      type: Object,
      default: function() {
        return {
          'text-align': 'center',
          padding: '1px 6px 1px 8px',
          background: 'none',
          'font-size': '15px',
          border: '0',
          'border-left': '1px solid #ddd',
          color: '#333'
        }
      }
    },
    btnStyle2: {
      type: Object,
      default: function() {
        return {
          'text-align': 'center',
          padding: '1px 6px 1px 8px',
          'margin-left': '0',
          'font-size': '15px',
          background: 'none',
          border: '0',
          color: '#83d587',
          'border-left': '1px solid #ddd'
        }
      }
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: this.value,
      visible: false
    }
  },
  watch: {
    value(newValue) {
      this.inputValue = newValue
    },
    inputValue(newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    btnClick(a) {
      this.$emit('btnClick')
    }
  }
}
</script>

<style scoped>
.searchComponent {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 290px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
}
.input >>> input {
  border: 0px;
}
.input {
  margin-right: -4px;
}
.button {
  border-radius: 0 4px 4px 0;
}
</style>
