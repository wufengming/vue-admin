<template>
  <div class="storkZGLH">
    <ul class="typeList">
      <li
        v-for="(item,i) of typeList"
        :key="i"
        @click="selected=i"
      >
        <zglh-type
          :index="i"
          :active="selected==i"
          :color="item.color"
          :title="item.title"
          :text="item.text"
        />
      </li>
    </ul>
    <div
      v-show="selected!=-1"
      class="zglhCon"
    >
      <div class="zglhContent">
        <p
          :style="{background:selected>=0?typeList[selected].color:''}"
          class="contentBar"
        />
        <div class="listCon">
          <div class="list">
            <ul
              class="listHeader"
              :class="{jiti:selected==2}"
            >
              <li>
                <div>序号</div>
                <div>本次量化股数</div>
                <div>股份类型</div>
                <div v-if="selected!=2">量化对象</div>

              </li>
            </ul>

            <ul
              class="listContent"
              :class="{jiti:selected==2}"
            >
              <li
                v-for="(item, index ) of dataList"
                :key="index"
              >
                <div>{{ index+1 }}</div>
                <div>
                  <el-input v-model="item.code" />
                </div>

                <div>
                  <el-select
                    v-model="item.code"
                    style="  width: 100%;"
                  >
                    <el-option
                      v-for="(item2,index2) of option"
                      :key="index2"
                      :value="item2.code"
                      :label="item2.name"
                    />
                  </el-select>
                  <div
                    v-if="selected==2"
                    class="plusIcon"
                  >
                    <p><i class="el-icon-circle-plus-outline" /></p>
                    <p><i class="el-icon-circle-close" /></p>
                  </div>
                </div>

                <div v-if="selected!=2">
                  <div class="addObject">
                    <span @click.stop="">添加</span>
                    <!-- 调用成员身份登记页面的组件 -->
                  </div>
                  <div class="plusIcon">
                    <p><i class="el-icon-circle-plus-outline" /></p>
                    <p><i class="el-icon-circle-close" /></p>
                  </div>
                </div>

              </li>
            </ul>
            <p class="remarks">注: 本次可量化最大股数: <span class="red">1235.789387</span> </p>
          </div>
          <div class="dateSetting">
            <p>日期设置 (选填)</p>
            <div>
              <div>
                <el-date-picker
                  v-model="date1"
                  placeholder="选择发证单位发证日期"
                />
              </div>
              <div>
                <el-date-picker
                  v-model="date2"
                  placeholder="选择理事长签发日期"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="handleBtn">
        <span
          class="blueBtn"
          @click.stop="close"
        >取消</span>
        <span
          class="blueBtn"
          @click.stop="refresh"
        >重置</span>
        <span
          class="blueBtn"
          @click.stop="finishZGLH"
        >确认</span>
      </p>
    </div>
    <el-dialog
      :visible.sync="storkConfirm"
      :title="'按集体分配股权情况确认'"
      append-to-body
      custom-class="storkConfirmClass storkZGLHClass"
    >
      <stork-confirm />
    </el-dialog>
  </div>
</template>
<script>
import zglhType from './components/ZGLH_type'
import storkConfirm from './components/storkConfirm'
export default {
  name: 'StorkZGLH',

  components: {
    zglhType,
    storkConfirm
  },

  data() {
    return {
      dataList: [{ code: 1 }, { code: 1 }, { code: 1 }, { code: 1 }],
      option: [{ code: 1, name: 'hhhhhh' }], // 股份类型
      date1: '',
      date2: '',
      selected: -1, // 选中的类型
      typeList: [// 类型列表
        { color: '#83d587', title: '量化到户', text: '按总股本数量,均分到户' },
        { color: '#dfc797', title: '量化到人', text: '按总股本数量,均分到每个成员' },
        { color: '#42a8fd', title: '量化到集体', text: '按总股本数量,均分集体' },
        { color: '#f2bf45', title: '量化到其他股东', text: '按总股本数量,均分到其他股东' }
      ],
      storkConfirm: false// 股权确认弹窗
    }
  },
  methods: {
    finishZGLH() {
      // for (const da of this.dataList) {
      //   da = ''
      // }
      // if (false) {
      //   this.$msgBox.show('不可操作! 请检查"本次量化股数、股份类型、量化对象"填写是否正常？')
      //   return
      // }
      // false为关闭,为true时打开集体股权确认

      this.storkConfirm = true
    },
    close() {
      // false为关闭,为true时打开集体股权确认
      this.$emit('close', false)
    },
    refresh() {
      this.dataList = []
      this.date1 = ''
      this.date2 = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.storkZGLH {
  margin: 0 10px;
  border-top: 1px solid #ccc;
  padding: 20px;
  overflow: hidden;
  .typeList {
    height: 100px;
    margin-bottom: 10px;
    > li {
      float: left;

      margin-left: 20px;
      &:first-of-type {
        margin-left: 0;
      }
    }
  }
  .zglhCon {
    height: 500px;
    .contentBar {
      width: 100%;
      height: 10px;
      border-radius: 5px 5px 0 0;
      margin-bottom: 10px;
    }
  }
}
.listCon {
  height: 450px;
}
.list {
  float: left;
  width: 73%;
  padding-right: 30px;
}
.dateSetting {
  width: 27%;
  float: right;
  border-radius: 8px;
  text-align: center;
  box-shadow: $shadow;
  > p {
    background: $green;
    color: #fff;
    height: 45px;
    line-height: 45px;
    border-radius: 8px 8px 0 0;
  }
  > div {
    border-radius: 0 0 8px 8px;
    padding: 20px 10px;
    border: 1px solid $borderGray;
    > div {
      margin-bottom: 15px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}

.listHeader,
.listContent {
  text-align: left;
  box-shadow: $shadow;
  background: #fff;
  > li {
    height: 40px;
    line-height: 40px;

    > div {
      height: 40px;
      line-height: 40px;
      float: left;
      position: relative;
      border: 1px solid $borderGray;
      border-width: 0 1px 1px 0;
      &:first-of-type {
        width: 10%;
        border-left-width: 1px;
        text-align: center;
      }
      &:nth-of-type(2) {
        width: 20%;
      }
      &:nth-of-type(3) {
        width: 37%;
      }
      &:nth-of-type(4) {
        width: 33%;
      }
      .plusIcon {
        position: absolute;
        right: -25px;
        top: 0;
        padding-left: 5px;
        display: none;
      }
    }
  }
  > li:hover {
    > div {
      .plusIcon {
        display: block;
      }
    }
  }
}
.jiti {
  > li {
    > div {
      &:first-of-type {
        width: 20%;
        border-left-width: 1px;
        text-align: center;
      }
      &:nth-of-type(2) {
        width: 40%;
      }
      &:nth-of-type(3) {
        width: 40%;
      }
    }
  }
}
.listHeader {
  text-align: center;
  > li {
    > div {
      border-top-width: 1px;
    }
  }
}
.remarks {
  margin-top: 20px;
  .red {
    color: $red;
  }
}
.handleBtn {
  text-align: right;
}
.addObject {
  text-align: center;

  color: $blue;
  text-decoration: underline;
  span {
    cursor: pointer;
  }
}
.plusIcon {
  > p {
    height: 50%;
    line-height: 20px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    color: $green;
    &:nth-of-type(2) {
      color: $red;
    }
  }
}
</style>
<style lang="scss">
@import "@/styles/variables.scss";
.storkZGLH .listContent .el-input--medium .el-input__inner {
  height: 100%;

  line-height: 30px;
  border: 0;
}
.storkConfirmClass .el-dialog__body {
  padding: 0 10px;
  > div {
    border-top: 1px solid $borderGray;
    padding: 10px;
  }
}
</style>

