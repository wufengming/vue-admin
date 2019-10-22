<template>
  <div class="container home">
    <el-row
      :gutter="10"
      style="margin-bottom:10px;"
      class="progressCon"
    >
      <el-col :span="16">
        <el-row
          :gutter="20"
          style="margin-bottom:10px;"
        >
          <el-col :span="8">
            <el-card>
              <el-row>
                <el-col
                  :span="10"
                  class="progressName"
                >合作社数量</el-col>
                <el-col :span="14">
                  <el-progress
                    type="circle"
                    :percentage="50"
                    status="exception"
                  />
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <el-row :gutter="20">
                <el-col
                  :span="10"
                  class="progressName"
                >村集体股权总数</el-col>
                <el-col :span="14">
                  <el-progress
                    type="circle"
                    :percentage="100"
                    status="success"
                  />
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <el-row :gutter="20">
                <el-col
                  :span="12"
                  class="progressName"
                >股东成员数量</el-col>
                <el-col :span="12">

                  <el-progress
                    type="circle"
                    :percentage="70"
                  />

                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card>
              <div>
                <Chart1 />
              </div>
            </el-card>

          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div>
            <Chart2
              title-text="成员年龄分布"
              :opinion="opinion"
              :opinion-data="ageProfile"
            />
          </div>

        </el-card>
      </el-col>

    </el-row>
    <!-- <el-row :gutter="20"
            class="midPart">

    </el-row> -->
    <el-row :gutter="20">
      <el-col
        class="auditInfoCon"
        :span="10"
      >
        <el-row>
          <el-col :span="12">待我审批</el-col>
          <el-col
            :span="12"
            style="text-align:right"
          >更多</el-col>
        </el-row>
        <el-row
          v-for="(item,i) of auditInfo"
          :key="i"
        >
          <el-col :span="5">
            {{ item.name }}
          </el-col>
          <el-col :span="3">{{ item.count }}条</el-col>
          <el-col :span="16">{{ item.info }}</el-col>
        </el-row>

      </el-col>
      <el-col :span="14">
        <el-card>
          <Chart3 />
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chart1 from './charts/category'
import Chart2 from './charts/pie'
import Chart3 from './charts/category_1'
// import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Chart1,
    Chart2,
    Chart3
  },
  data() {
    return {
      gradientColor: [
        { one: '#f1971a', two: '#fe5a56' },
        { one: '#4dadfe', two: '#02f0fe' },
        { one: '#8978f0', two: '#afadf0' },
        { one: '#c571f5', two: '#f171d3' }
      ],
      ageProfile: [{ name: 'one', value: '123' }, { name: 'two', value: '1666' }, { name: 'three', value: '1234' }, { name: 'four', value: '555' }],
      opinion: ['one', 'two', 'three', 'four'],
      auditInfo: [
        { name: '股权证变更', count: '5', info: '李泉股权转让10股审批' },
        { name: '登记证变更', count: '2', info: '李泉股权转让10股审批' },
        { name: '股权证变更', count: '9', info: '李泉股权转让10股审批' },
        { name: '股权证变更', count: '100', info: '李泉股权转让10股审批' }
      ]
    }
  },

  watch: {

  },
  // 初始化
  created() {

  },
  activated() {

  },
  // 初始化加载数据
  mounted() {
    this.getData()
    // 统计数据
    this.getHomecount()
  },

  destroyed() {

  },
  deactivated() {

  },
  methods: {
    getData() {
      this.ageProfile.map((opi, i) => {
        opi.itemStyle = {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [// {
              //     offset: 0, color: 'red' // 0% 处的颜色
              // },
              { offset: 0.2, color: this.gradientColor[i].one// 0% 处的颜色
              },
              //  {offset: 0.5, color: 'green' // 0% 处的颜色
              //  },
              {
                offset: 1, color: this.gradientColor[i].two // 100% 处的颜色
              }],
            globalCoord: true // 缺省为 false
          }
        }
      })
    },
    getHomecount() {
      // 获取主页的统计数据，包括：合作社数据，集体股权总数,股东成员数据

      var dataParam = []
      dataParam.push(1)
      dataParam.push(2)
      dataParam.push(3)

      var data = {
        ids: dataParam.toString()
      }

      this.postAxios('/gq/stock/verifyCertificate', data).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

</script>
<style lang="scss">
.home .el-card {
  border-radius: 20px;
}
.home .auditInfoCon {
  > .el-row {
    margin-bottom: 10px;
    height: 30px;
    line-height: 30px;
    background: #00b7ee;
    padding: 0 20px;
    border-radius: 10px;
    color: #fff;
    &:first-of-type {
      background: 0;
      color: inherit;
    }
  }
}
</style>

<style  scoped lang="scss">
.home {
  padding: 10px;
}
.progressCon {
  text-align: center;
  .progressName {
    height: 130px;
    line-height: 130px;
    font-size: 18px;
    border-right: 1px solid #ccc;
    padding-right: 20px;
    & ~ div {
      padding-left: 20px;
    }
  }
}
.midPart {
  margin: 20px 0;
}
@media screen and (max-width: 1440px) {
  .progressCon .progressName {
    font-size: 0.16rem;
  }
}
</style>
