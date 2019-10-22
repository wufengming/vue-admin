<template>
  <section class="stockBody">
    <div class="topHandleCon">
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        :gutter="10"
      >
        <el-col class="topHandleConLeft" :span="10">
          <el-row>
            <el-col :span="8">
              <el-checkbox v-model="desStock" class="checkbox">显示已注销股权证书</el-checkbox>
            </el-col>
            <el-col :span="16">
              <el-card :body-style="{padding:0}">
                <el-row :gutter="10">
                  <el-col :span="6">
                    <div class="time-title">有效日期</div>
                  </el-col>
                  <el-col :span="18">
                    <el-date-picker
                      v-model="value2"
                      style="display: inline-block;border: none"
                      size="small"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                    />
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="14">
          <el-row
            type="flex"
            justify="end"
            align="middle"
          >
            <el-col :span="10" class="txtR">
              <search-input
                placeholder="证书名称/社会信用代码/法人"
                @btnClick="searchFn"
                @handle="searchHandle"
              >
                <div class="highSearch">
                  <ul>
                    <li>
                      <div>成立日期:</div>
                      <div>
                        <el-date-picker
                          v-model="search.date1"
                          size="small"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions"
                        />
                      </div>
                    </li>
                    <li>
                      <div>有效日期:</div>
                      <div>
                        <el-date-picker
                          v-model="search.date2"
                          size="small"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions"
                        />
                      </div>
                    </li>
                    <li>
                      <div>登记日期:</div>
                      <div>
                        <el-date-picker
                          v-model="search.date3"
                          size="small"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions"
                        />
                      </div>
                    </li>
                    <li>
                      <div>证书类型:</div>
                      <div>
                        <el-select v-model="search.Type" />
                      </div>
                    </li>
                    <li>
                      <div>股权模式:</div>
                      <div>
                        <el-select v-model="search.mode" />
                      </div>
                    </li>
                    <li>
                      <div>证书类型:</div>
                      <div>
                        <el-select v-model="search.state" />
                      </div>
                    </li>
                  </ul>
                  <p class="handleBtn"><span class="greenBtn">重置</span> <span class="greenBtn">确定</span> </p>
                </div>
              </search-input>
            </el-col>
            <el-col
              class="txtR"
              :span="2"
            >
              <div>
                <div
                  class="greenBtn"
                  @click="add()"
                >新增</div>
              </div>
            </el-col>
            <el-col
              class="txtR"
              :span="2"
            >
              <div>
                <div class="greenBtn"> 修改</div>
              </div>
            </el-col>
            <el-col
              class="txtR"
              :span="2"
            >
              <div>
                <div class="greenBtn">删除</div>
              </div>
            </el-col>
            <el-col
              class="txtR"
              :span="2"
            >
              <div>
                <el-popover
                  trigger="hover"
                  popper-class="moreBtnCon"
                  width="90"
                  placement="bottom"
                >
                  <ul class="moreBtn">
                    <li><span class="greenBtn">6666</span></li>
                  </ul>
                  <div
                    slot="reference"
                    class="greenBtn"
                  >更多<i class="el-icon-caret-bottom" /></div>
                </el-popover>

              </div>
            </el-col>
            <el-col
              style="    margin-left: 10px;"
              class="txtR"
              :span="2"
            >
              <div class="fresh">
                <div @click="refresh"><i class="el-icon-refresh" /></div>
                <div @click="list()"><img
                  src="@/assets/images/list.png"
                  alt=""
                ></div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="stock-nav">
      <ul>
        <li :class="[ activeClass === 'member' ? 'active' : '' ] " @click="active('member')"><div>成员股权登记</div></li>
        <li :class="[ activeClass === 'team' ? 'active' : '' ] " @click="active('team')"><div>集体股权登记</div></li>
        <li :class="[ activeClass === 'other' ? 'active' : '' ] " @click="active('other')"><div>其他股权登记</div></li>
      </ul>
    </div>
    <div class="stock-main">
      <div v-show="activeClass === 'member'">
        <member-stock :switch-list="switchList" @stockAdd="add()" />
      </div>
      <div v-show=" activeClass === 'team'">
        <member-stock :switch-list="switchList" />
      </div>
      <div v-show=" activeClass === 'other'">44</div>
    </div>
    <el-dialog v-if="addAtrributes.addDialog" :visible.sync="addAtrributes.addDialog" custom-class="addRegistClass storkZGLHClass" width="1170px" :title="'选择折股量化方式'">
      <add />
    </el-dialog>
  </section>
</template>

<script>
import MemberStock from './memberStock'
import SearchInput from '../../components/searchInput/index'
// import StorkZGLH from '../registration/ZGLH'
import Add from './add'
export default {
  name: 'Index',
  components: { Add, SearchInput, MemberStock },
  data() {
    return {
      activeClass: 'member',
      desStock: false,
      pickerOptions: '',
      value2: '',
      search: {
        date1: '',
        date2: '',
        date3: '',
        Type: '',
        mode: '',
        state: ''
      },
      addAtrributes: {
        addDialog: false
      },
      switchList: false
    }
  },
  methods: {
    active(val) {
      if (val === 'member') {
        this.activeClass = 'member'
      } else if (val === 'team') {
        this.activeClass = 'team'
      } else if (val === 'other') {
        this.activeClass = 'other'
      }
    },
    searchFn() {

    },
    searchHandle() {},
    // 新增
    add() {
      this.addAtrributes.addDialog = true
    },
    // 刷新
    refresh() {

    },
    // 列表切换

    list() {
      if (this.switchList) {
        this.switchList = false
      } else {
        this.switchList = true
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variables.scss";
  .stockBody {
    height: 100%;
    width: 100%;
    padding: 20px;
    overflow: hidden;
    .topHandleCon {
      .topHandleConLeft {
        .checkbox {
          height: 33px;
          line-height: 33px;
        }

        .time-title {
          width: 100%;
          margin-top: 7px;
          text-align: center;
          border-right: 1px solid #cccccc;
        }
      }
    }
    .stock-nav{
      width: 100%;
      margin-top: 24px;
      border-bottom: 3px solid rgb(27,132,250);
      ul{
        /*width: 35px;*/
        display: inline-block;
        li{
          float: left;
          height: 27px;
          width: 136px;
          border-bottom: none;
          text-align: center;
          div{
            margin: auto;
            line-height: 27px;
            font-size: 0.18rem;
            color: rgb(74,74,74);
          }
        }
        .active{
          background-color: #83d587;
          border-radius: 12px;
          div{
            color: #ffffff;
          }
        }
        &:hover{
          cursor: default;
        }
      }
    }
    .stock-main{
      /*width:calc(100% - 35px);*/
      /*height: 900px;*/
      background-color: #ffffff;
      display: inline-block
    }
  }
  .txtR {
    text-align: right;
  }
  .fresh {
    width: 80px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    > div {
      font-size: 23px;
      color: #777;
      line-height: 30px;
      margin-right: 13px;
      display: inline-block;
      cursor: pointer;
      img {
        vertical-align: middle;
        height: 22px;
        margin-top: -5px;
      }
    }
  }
  .addDialog-title{
    color: rgb(66,168,253);
    font-size: 0.18rem;
    width: 100%;
    border-bottom: 2px solid rgb(66,168,253);
  }
  .addRegistClass {
    width: 845px;
    border-radius: 8px;
    overflow: hidden;
    .el-dialog__header {
      background: $blue;
      padding: 10px;
      .el-dialog__headerbtn .el-dialog__close,
      .el-dialog__title {
        color: #fff;
      }
      .el-dialog__headerbtn .el-dialog__close {
        font-size: 0.22rem;
      }
    }
    .el-dialog__body {
      padding: 0;
    }
  }
  .storkZGLHClass {
    width: 1120px;
    .el-dialog__header {
      background: #fff;
      padding: 10px;
      .el-dialog__headerbtn .el-dialog__close,
      .el-dialog__title {
        color: $light-blue;
      }
    }
  }
</style>
