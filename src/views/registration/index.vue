<template>
  <div class="registration">
    <div>
      <div class="topHandleCon">
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          :gutter="10"
        >
          <el-col :span="10">
            <el-row
              type="flex"
              align="middle"
              :gutter="10"
            >
              <el-col :span="8">
                <el-checkbox v-model="showCancleCertificate">显示已注销登记证书</el-checkbox>
              </el-col>
              <el-col :span="16">
                <el-card :body-style="{padding:0}">
                  <el-row
                    type="flex"
                    align="middle"
                    :gutter="0"
                  >
                    <el-col
                      class="dateTitle"
                      :span="6"
                    >
                      <span>有效日期</span>
                    </el-col>
                    <el-col
                      class="datepickCon"
                      :span="18"
                    >
                      <el-date-picker
                        v-model="value2"
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
              <el-col
                class="txtR"
                :span="10"
              >
                <search
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
                </search>
              </el-col>
              <el-col
                class="txtR"
                :span="2"
              >
                <div>
                  <div
                    class="greenBtn"
                    @click="addRegistration"
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
                  <div @click="list"><img
                    src="@/assets/images/list.png"
                    alt=""
                  ></div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div
        v-if="!listType"
        class="registCon"
      >
        <div class="registPic">
          <div
            v-for="i of 8"
            :key="i"
            class="modelList"
          >

            <model />
            <p class="checkbox">
              <el-checkbox v-model="checked" />
            </p>
          </div>
          <div
            class="modelList add"
            @click="addRegistration"
          >
            <img
              src="@/assets/images/add_blue.png"
              alt=""
            >
          </div>
        </div>
      </div>
      <div
        v-else
        class="registCon"
      >
        <div class="registList">
          <template>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              header-row-class-name="headerClass"
              style="width: 100%"
            >
              <el-table-column
                type="selection"
                class-name="checkboxCol"
                width="30"
              />
              <el-table-column
                label="序号"
                type="index"
                :index="function(index){
                  return index+1
                }"
                width="55"
              />
              <el-table-column
                prop="FDeptName"
                label="名称"
                min-width="150"
                header-align="center"
              />
              <el-table-column
                prop="FDeptName"
                label="统一社会信用代码"
                min-width="150"
                header-align="center"
              />
              <el-table-column
                prop="FDeptName"
                label="证书类型"
                header-align="center"
              />
              <el-table-column
                label="股数"
                header-align="center"
              >
                <el-table-column
                  label="总股数"
                  header-align="center"
                >
                  <el-table-column
                    prop="FDeptName"
                    label="小计"
                    header-align="center"
                  />
                  <el-table-column
                    prop="FDeptName"
                    label="集体股"
                    header-align="center"
                  />
                  <el-table-column
                    prop="FDeptName"
                    label="成员股"
                    header-align="center"
                  />
                  <el-table-column
                    prop="FDeptName"
                    label="其他股"
                    header-align="center"
                  />
                </el-table-column>
                <el-table-column
                  label="每股原值"
                  prop="FDeptName"
                  header-align="center"
                />
                <el-table-column
                  label="每股现值"
                  prop="FDeptName"
                  header-align="center"
                />
              </el-table-column>
              <el-table-column
                label="股权模式"
                prop="FDeptName"
                header-align="center"
              />
              <el-table-column
                label="法人代表"
                prop="FDeptName"
                header-align="center"
              />
              <el-table-column
                label="证件号码"
                prop="FDeptName"
                header-align="center"
              />
              <el-table-column
                label="户数"
                prop="FDeptName"
                header-align="center"
              />
              <el-table-column
                label="股东数量"
                prop="FDeptName"
                header-align="center"
              />
              <el-table-column
                label="成立日期"
                prop="FDeptName"
                header-align="center"
              />
              <el-table-column
                label="有效日期"
                prop="FDeptName"
                header-align="center"
              />
              <el-table-column
                label="股权模式"
                prop="FDeptName"
                header-align="center"
              />
              <el-table-column
                label="登记日期"
                prop="FDeptName"
                header-align="center"
              />
              <el-table-column
                label="证书状态"
                prop="FDeptName"
                header-align="center"
              />

            </el-table>
          </template>
        </div>

      </div>
    </div>
    <el-dialog
      :visible.sync="addRegistShow"
      append-to-body
      custom-class="addRegistClass"
      :title="'新增登记证书'"
    >
      <addRegist
        v-if="addRegistShow"
        @showStorkZGLH="showStorkZGLH"
        @finishAdd="finishAddRegist"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="storkZGLH"
      append-to-body
      custom-class="addRegistClass storkZGLHClass"
      :title="'选择折股量化方式'"
    >
      <zglh
        v-if="storkZGLH"
        @close="closeStorkZGLH"
        @finish="finiStorkZGLH"
      />
    </el-dialog>
  </div>
</template>

<script>
import addRegist from './addRegist'
import zglh from './ZGLH'
import model from './registModel'
import search from '@/components/searchInput'
export default {
  name: 'Registration',
  components: {
    search,
    model,
    addRegist,
    zglh
  },
  data() {
    return {
      showCancleCertificate: false, // 是否显示注销证书
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: '',
      checked: false,
      search: {}, // 搜索信息
      dataList: [
        {
          enabledmark: 1, // 0不可用，1可用 ,
          endDate: 1, // 有效结束时间结束 ,
          keys: 1, // 证书名称/社会信用代码/法人 ,
          order: 1, // 排序方式 asc/desc ,
          pageIndex: 1, // 页号 ,
          pageSize: 1, // 页面大小 ,
          registerDateFrom: 1, // 登记日期起始 ,
          registerDateTo: 1, // 登记日期结束 ,
          setupDateFrom: 1, // 成立日期起始 ,
          setupDateTo: 1, // 成立日期结束 ,
          sort: 1, // 排序字段 ,
          startDate: 1, // 有效开始时间起始 ,
          stockModel: 1, // 股权模式：动态类型，静态类型 ,
          type: 1, // 合作社类型:集体经济 ,
          verifyState: 1 // 审核状态(鉴定)
        }
      ], // 证书列表信息
      listType: false, // 列表类型 'fasle'证书图片  'true'列表
      tableData: [{ FDeptName: 6666 }, { FDeptName: 6666 }], // 列表数据
      addRegistShow: false, // 显示新增登记证书
      storkZGLH: false// 显示折股量化
    }
  },
  mounted() {
    this.refresh()
  },
  activated() {

  },
  methods: {
    refresh() {
      this.getData()
    },
    getData() {

    },
    list() {
      this.listType = !this.listType
    },
    searchFn() {

    },
    searchHandle() {

    },
    finishAddRegist(data) { // 完成证书添加
      this.addRegistShow = false
      this.$confirm('登记证书添加成功。是否立即进行“折股量化”处理?', '提示', {
        confirmButtonText: '立即处理',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.storkZGLH = true
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消折股量化'
        })
      })
    },

    addRegistration() { // 添加证书
      this.addRegistShow = true
    },
    finiStorkZGLH() { // 完成折股量化

    },
    showStorkZGLH(data) { // 显示折股量化
      this.storkZGLH = data
    },
    closeStorkZGLH(data) { // 关闭折股量化
      this.storkZGLH = false
      this.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.registration {
  padding: 20px;
  height: 100%;
  overflow: hidden;
  > div {
    height: 100%;
    position: relative;
    padding-top: 34px;
  }
}
.txtR {
  text-align: right;
}
.dateTitle {
  width: 80px;
  padding-left: 10px;
  border-right: 1px solid #ccc;
}
.topHandleCon {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.registCon {
  margin-top: 10px;

  height: 100%;
  border-top: 1px solid $borderGray;
  .registPic {
    width: 100%;
    height: 100%;
    overflow: auto;
    .modelList {
      float: left;
      margin: 20px 20px 0 0;
      position: relative;
      .checkbox {
        position: absolute;
        top: 4px;
        right: 4px;

        z-index: 9;
      }
    }
    .add {
      width: 500px;
      height: 330px;
      line-height: 265px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
      text-align: center;
      img {
        vertical-align: middle;
      }
    }
  }
  .registList {
  }
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
.highSearch {
  width: 300px;
  ul {
    > li {
      margin-bottom: 10px;
      > div {
        display: inline-block;
        width: 70px;
        &:last-of-type {
          width: 190px;
        }
      }
    }
  }
  .handleBtn {
    text-align: center;
    > span {
      display: inline-block;
      width: 60px;
      &:last-of-type {
        margin-left: 40px;
      }
    }
  }
}
.moreBtn {
  padding: 10px;
  > li {
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0px;
    }
    > span {
      display: inline-block;
      width: 100%;
      margin: 0;
    }
  }
}
.addRegistClass {
}
</style>
<style lang="scss">
@import "@/styles/variables.scss";
.registration .datepickCon {
  .el-range-separator {
    width: 40px;
    margin-top: 4px;
  }
  .el-range-editor.el-input__inner {
    width: 300px;
    border: 0;
  }
}

.registration .modelList .el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.registration .modelList .el-checkbox__inner::after {
  height: 12px;
  left: 6px;
  top: 0px;
  width: 6px;
}
.registration .checkboxCol {
  border-right: 0;
}

.highSearch .el-date-editor .el-range-separator {
  width: 20px;
}
.highSearch .el-select,
.highSearch .el-range-editor.el-input__inner {
  width: 230px;
}
.moreBtnCon {
  padding: 0;
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

