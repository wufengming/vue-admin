<template>
  <section class="stock-body">
    <div v-if="switchList === true">
      <div class="stockCon">
        <div v-for="(item,idx) in tableData" :key="idx" class="stock-item">
          <stock-card :data="item" />
          <el-checkbox size="medium" class="stock-checkbox" />
        </div>
        <div class="stock-add" @click="stockAdd()">
          <i class="el-icon-plus add-icon" />
        </div>
      </div>
    </div>
    <div v-else>
      <el-table :data="tableData" border class="data-table" height="700px">
        <el-table-column type="selection" />
        <el-table-column type="index" />
        <el-table-column prop="cardCode" label="股权证编号" width="180" align="center" :show-overflow-tooltip="showOverflowTooltip" />
        <el-table-column prop="allocationType" label="量化方式" width="160" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.allocationType ==='home'">量化到户</span>
            <span v-if="scope.row.allocationType ==='person'">量化到人</span>
            <span v-if="scope.row.allocationType ==='team'">量化到集体</span>
            <span v-if="scope.row.allocationType ==='other'">其他</span>
          </template>
        </el-table-column>
        <el-table-column prop="homePerson" label="用户姓名" width="160" align="center" />
        <el-table-column label="股东信息" width="160" align="center">
          <el-table-column prop="cardCode" label="股东人数" width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities && scope.row.allocationType ==='home' ">
                {{ scope.row.personDtlEntities.length }}
              </div>
              <div v-if="scope.row.stockDtlEntities && scope.row.allocationType ==='person'">
                {{ scope.row.stockDtlEntities.length }}
              </div>
            </template>
          </el-table-column>
          <el-table-column class-name="col-class-name" prop="name" label="股东姓名" width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities &&scope.row.allocationType ==='home'">
                <div v-for="(item,idx) in scope.row.personDtlEntities " :key="idx">
                  <div class="cell-home">{{ item.name }}</div>
                </div>
              </div>
              <div v-if="scope.row.stockDtlEntities &&scope.row.allocationType ==='person'">
                <div v-for="(item,idx) in scope.row.stockDtlEntities " :key="idx">
                  <div class="cell-home">{{ item.personName }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column class-name="col-class-name" prop="gender" label="股东性别" width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities &&scope.row.allocationType ==='home'">
                <div v-for="(item,idx) in scope.row.personDtlEntities " :key="idx">
                  <span v-if="item.gender === '0'">女</span>
                  <span v-if="item.gender === '1'">男</span>
                </div>
              </div>
              <div v-if="scope.row.stockDtlEntities &&scope.row.allocationType ==='person'">
                <div v-for="(item,idx) in scope.row.stockDtlEntities " :key="idx">
                  <span v-if="item.gender === 0">女</span>
                  <span v-if="item.gender === 1">男</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="relationCode" class-name="col-class-name" label="与户主关系" width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities &&scope.row.allocationType ==='home'">
                <div v-for="(item,idx) in scope.row.personDtlEntities " :key="idx">
                  {{ item.relationCode }}
                </div>
              </div>
              <div v-if="scope.row.stockDtlEntities && scope.row.allocationType ==='person'">
                <div v-for="(item,idx) in scope.row.stockDtlEntities " :key="idx">
                  {{ item.relationCode }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="card" class-name="col-class-name" label="居民身份证" width="200" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities &&scope.row.allocationType ==='home'">
                <div v-for="(item,idx) in scope.row.personDtlEntities " :key="idx">{{ item.card }}</div>
              </div>
              <div v-if="scope.row.stockDtlEntities &&scope.row.allocationType ==='person'">
                <div v-for="(item,idx) in scope.row.stockDtlEntities " :key="idx">{{ item.card }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="bankName" class-name="col-class-name" label="开户银行" width="250" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities &&scope.row.allocationType ==='home'">
                <div v-for="(item,idx) in scope.row.personDtlEntities " :key="idx">
                  {{ item.bankCode }}
                </div>
              </div>
              <div v-if="scope.row.stockDtlEntities && scope.row.allocationType ==='person'">
                <div v-for="(item,idx) in scope.row.stockDtlEntities " :key="idx">
                  {{ item.bankCode }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="bankName" class-name="col-class-name" label="开户名称" :show-overflow-tooltip="showOverflowTooltip" width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities && scope.row.allocationType ==='home'">
                <div v-for="(item,idx) in scope.row.personDtlEntities " :key="idx">
                  {{ item.bankName }}
                </div>
              </div>
              <div v-if="scope.row.stockDtlEntities && scope.row.allocationType ==='person'">
                <div v-for="(item,idx) in scope.row.stockDtlEntities " :key="idx">
                  {{ item.bankName }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="bankAccount" label="银行账户" class-name="col-class-name" width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities && scope.row.allocationType ==='home'">
                <div v-for="(item,idx) in scope.row.personDtlEntities " :key="idx">
                  {{ item.bankAccount }}
                </div>
              </div>
              <div v-if="scope.row.stockDtlEntities && scope.row.allocationType ==='person'">
                <div v-for="(item,idx) in scope.row.stockDtlEntities " :key="idx">
                  {{ item.bankAccount }}
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="股数" width="160" align="center">
          <el-table-column label="合计" class-name="col-class-name" width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities && scope.row.allocationType ==='home'">
                <div>
                  {{ scope.row.stockDtlEntities[0].totalStock.filter(val => val.shareTypeCode === '00')[0].total }}
                </div>
              </div>
              <div v-if="scope.row.stockDtlEntities && scope.row.allocationType ==='person'">
                <div v-for="(item,idx) in scope.row.stockDtlEntities" :key="idx">
                  {{ item.totalStock.filter(val => val.shareTypeCode === '00')[0].total }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-for="(item,idx) in shareColumn" :key="idx" class-name="col-class-name" prop="cardCode" :label="item.name" width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities && scope.row.allocationType ==='home'">
                <div v-if="(scope.row.stockDtlEntities[0].totalStock.filter(val => val.shareTypeCode === item.encode)).length">
                  {{ (scope.row.stockDtlEntities[0].totalStock.filter(val => val.shareTypeCode === item.encode))[0].total }}
                </div>
                <div v-else>0</div>
              </div>
              <div v-if="scope.row.stockDtlEntities && scope.row.allocationType ==='person'">
                <div v-for="(itemC,idxC) in scope.row.stockDtlEntities" :key="idxC">
                  <div v-if="(itemC.totalStock.filter(val => val.shareTypeCode === item.encode)).length">
                    {{ (itemC.totalStock.filter(val => val.shareTypeCode === item.encode))[0].total }}
                  </div>
                  <div v-else>0</div>
                </div>

              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="每股股值（元）" width="160" align="center">
          <el-table-column class-name="col-class-name" label="原值" width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities && scope.row.allocationType ==='home'">
                <div>{{ scope.row.stockDtlEntities[0].stockOldvalue }}</div>
              </div>
              <div v-if="scope.row.stockDtlEntities && scope.row.allocationType ==='person'">
                <div v-for="(item,idx) in scope.row.stockDtlEntities " :key="idx">{{ item.stockOldvalue }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="现值" class-name="col-class-name" width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities && scope.row.allocationType ==='home'">
                <div>{{ scope.row.stockDtlEntities[0].stockNewvalue }}</div>
              </div>
              <div v-if="scope.row.stockDtlEntities && scope.row.allocationType ==='person'">
                <div v-for="(item,idx) in scope.row.stockDtlEntities " :key="idx">{{ item.stockNewvalue }}</div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="总股值（元）" width="160" align="center">
          <el-table-column class-name="col-class-name" label="原值" width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities && scope.row.allocationType ==='home'">
                <div>{{ scope.row.stockDtlEntities[0].stockTotalOldvalue }}</div>
              </div>
              <div v-if="scope.row.stockDtlEntities && scope.row.allocationType ==='person'">
                <div v-for="(item,idx) in scope.row.stockDtlEntities " :key="idx">{{ item.stockTotalOldvalue }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column class-name="col-class-name" label="现值" width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.personDtlEntities && scope.row.allocationType ==='home'">
                <div>{{ scope.row.stockDtlEntities[0].stockTotalNewvalue }}</div>
              </div>
              <div v-if="scope.row.stockDtlEntities && scope.row.allocationType ==='person'">
                <div v-for="(item,idx) in scope.row.stockDtlEntities " :key="idx">{{ item.stockTotalNewvalue }}</div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="familyType" label="家庭类型" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.familyType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属村民小组" width="160" align="center" />
        <el-table-column prop="certificateUnit" label="发证单位" width="160" align="center" />
        <el-table-column prop="certificateDate" label="发证日期" width="160" align="center" />
        <el-table-column prop="confirmDate" label="理事长签发日期" width="160" align="center" />
        <el-table-column prop="enabledmark " label="证书状态" width="160" align="center" :show-overflow-tooltip="showOverflowTooltip">
          <template slot-scope="scope">
            <span v-if="scope.row.enabledmark === 0">无效</span>
            <span v-if="scope.row.enabledmark === 1">有效</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
import StockCard from './component/stockCard'
import { getTableData, getShareType } from '@/api/stockManage'
export default {
  name: 'MemberStock',
  components: { StockCard },
  props: {
    switchList: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 表格内容超出提示框显示
      showOverflowTooltip: true,
      // 股权列数据
      shareColumn: [],
      tableData: [],
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
      arr: [],
      orData: []
    }
  },
  created() {},
  mounted() {
    this.getShareTypeAllList()
    this.getData()
  },
  methods: {
    // 根据组织id，获取 股权类型
    getShareTypeAllList() {
      const requesData = {
        companyid: 0,
        orgid: 1,
        userid: 0
      }
      getShareType(requesData).then(res => {
        if (res.status === true) {
          this.shareColumn = res.data
          console.log(res)
        } else {
          console.log(res.message)
        }
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
      })
    },
    // 获取列表信息
    getData() {
      const data = {
        certificateStatus: 0, // 证书状态，0已注销，1全部，2正常,3已鉴定 ,
        enabledMark: 0, //
        endDate: String, // 发证截止日期(搜索条件) ,
        ids: [0], //
        maxShareHolderNum: String, // 股东人数筛选上限 ,
        minShareHolderNum: String, // 股东人数筛选下限 ,
        order: 'asc', // 排序方式 asc/desc ,
        pageIndex: 1, // 页号
        pageSize: 10, // 页面大小
        sort: '', // 排序字段 ,
        startDate: String, // 发证起始日期(搜索条件) ,
        verifyState: 1
      }
      getTableData(data).then(res => {
        this.tableData = res.data
        // this.formartData(res.data.records)
        console.log(res)
      })
    },
    // 处理请求拿到的数据
    // formartData(data) {
    //   const arr = []
    //   const s = 0
    //   const getTable = []
    //   if (data.length) {
    //     data.forEach((item, i, data) => {
    //       if (arr.length) {
    //         s = arr[arr.length - 1].row + data[i + 1].stockDtlEntities.length
    //       }
    //       arr.push({
    //         row: s,
    //         index: item.stockDtlEntities.length
    //       })
    //       if (item.stockDtlEntities && item.stockDtlEntities.length) {
    //         item.stockDtlEntities.forEach(subItem => {
    //           getTable.push({
    //             allocationType: item.allocationType,
    //             cardCode: item.cardCode,
    //             certificateDate: item.certificateDate,
    //             certificateUnit: item.certificateUnit,
    //             companyPhid: item.companyPhid,
    //             confirmDate: item.confirmDate,
    //             creator: item.creator,
    //             curOrgid: item.curOrgid,
    //             delFlag: item.delFlag,
    //             description: item.description,
    //             editor: item.editor,
    //             enabledmark: item.enabledmark,
    //             familyType: item.familyType,
    //             homePerson: item.homePerson,
    //             isPrint: item.isPrint,
    //             ngInsertDt: item.ngInsertDt,
    //             ngRecordVer: item.ngRecordVer,
    //             ngUpdateDt: item.ngUpdateDt,
    //             orgid: item.orgid,
    //             personCount: item.personCount,
    //             personDtlEntities: item.personDtlEntities,
    //             personId: item.personId,
    //             phid: item.phid,
    //             rn: item.rn,
    //             totalStock: item.totalStock,
    //             verifyDate: item.verifyDate,
    //             verifyState: item.verifyState,
    //             bankAccount: subItem.bankAccount,
    //             PhId: subItem.bankCode,
    //             bankCode: subItem.bankCode,
    //             bankName: subItem.bankName,
    //             stockDtlEntities: item.stockDtlEntities,
    //             card: subItem.card,
    //             CompanyPhid: subItem.companyPhid,
    //             Creator: subItem.creator,
    //             CurOrgid: subItem.curOrgid,
    //             DelFlag: subItem.delFlag
    //           })
    //         })
    //       }
    //     })
    //   }
    //   this.arr = arr
    //   this.tableData = getTable
    //   console.log(getTable)
    // },
    searchFn() {

    },
    searchHandle() {},
    // 新增
    add() {},
    // 刷新
    refresh() {

    },
    // 列表切换
    list() {},
    // 股权证书新增
    stockAdd() {
      this.$emit('stockAdd', '')
    }
  }
}
</script>

<style scoped lang="scss">
  .stock-body {
    height: 100%;
    width: 100%;
    padding:0 0px 20px 0px;
    overflow: hidden;

    div {
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
      .stockCon{
        margin-top: 10px;
        height: calc(100vh - 50px - 20px - 40px - 34px - 10px - 20px - 24px - 34px);
        overflow: auto;
        position: relative;
        .stock-item{
          display: inline-block;
          height:580px;
          width: 430px;
          margin: 10px;
          position: relative;
          .stock-checkbox{
            position: absolute;
            z-index: 8;
            right: 8px;
            top: 8px;
          }
        }
        .stock-add{
          display: inline-block;
          height:580px;
          width: 430px;
          margin: 10px;
          position: relative;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          .add-icon{
            width: 100px;
            height: 100px;
            position: absolute;
            top: 0;
            display: block;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            font-size: 1rem;
            color:#1B84F9 ;
          }
          &:hover{
            cursor: pointer;
          }
        }
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
</style>
<style scoped="scoped">
  .stock-checkbox >>> .el-checkbox__inner {
    width: 20px;
    height: 20px;
  }
  .stock-checkbox >>> .el-checkbox__inner::after {
    height: 12px;
    left: 6px;
    top: 0px;
    width: 6px;
  }
  .data-table{
    width: calc(100vw - 80px)
  }
  .data-table >>>.col-class-name {
    padding: 0!important;
  }
  .data-table >>>.col-class-name .cell {
    padding: 0;
  }
  .data-table >>>.col-class-name .cell div{
   border-bottom: 1px solid #dfe6ec;
    /*height: 30px;*/
    line-height: 30px;
  }
  .data-table >>>.col-class-name .cell div:last-of-type{
    border-bottom: none;
  }
</style>
