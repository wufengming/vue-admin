<template>
  <div class="storkConfirm">
    <div class="searchCon">
      <search
        v-model="search.value"
        placeholder="证书名称/社会信用代码/法人"
        :show-btn="false"
        @btnClick="searchFn"
      />
    </div>
    <div class="listCon">
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
            label="法人代表"
            min-width="150"
            header-align="center"
          />
          <el-table-column
            prop="FDeptName"
            label="居民身份证号"
            min-width="150"
            header-align="center"
          />
          <el-table-column
            prop="FDeptName"
            label="联系电话"
            header-align="center"
          />
          <el-table-column
            prop="FDeptName"
            label="出生日期"
            header-align="center"
          />
          <el-table-column
            prop="FDeptName"
            label="年龄(按服务器日期核算)"
            header-align="center"
          />
          <el-table-column
            prop="FDeptName"
            label="性别"
            header-align="center"
          />
          <el-table-column
            prop="FDeptName"
            label="民族"
            header-align="center"
          />

          <el-table-column
            label="股数"
            header-align="center"
          >
            <el-table-column
              label="成员股"
              header-align="center"
            />
            <el-table-column
              label="老龄股"
              header-align="center"
            />
            <el-table-column
              label="计生股"
              header-align="center"
            />

          </el-table-column>
          <el-table-column
            label="集体持股"
            header-align="center"
          >
            <el-table-column
              label="数量"
              header-align="center"
            />
            <el-table-column
              label="原股值"
              header-align="center"
            />
            <el-table-column
              label="现股值"
              header-align="center"
            />

          </el-table-column>
        </el-table>
      </template>
    </div>
    <p class="handleBtn">
      <span class="blueBtn">取消</span>
      <span
        style="width:100px"
        class="blueBtn"
      >批量赋股数</span>
      <span class="blueBtn">确认</span>
    </p>
  </div>
</template>
<script>
import search from '@/components/searchInput'
export default {
  name: 'StorkConfirm',
  components: {
    search
  },
  data() {
    return {
      search: {},
      tableData: [{ FDeptName: 78787 }, { FDeptName: 77 }]
    }
  },
  methods: {
    searchFn() {

    }

  }
}
</script>
<style lang="scss" scoped>
.storkConfirm {
  .searchCon {
    width: 250px;
    float: right;
  }
  .listCon {
    padding-top: 40px;
  }
  .handleBtn {
    margin: 20px 0 10px;
    text-align: center;
    > span {
      margin-left: 30px;
    }
  }
}
</style>
