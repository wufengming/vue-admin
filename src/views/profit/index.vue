<template>
  <div class="dashboard-container" @click="showMore=false">
    <div class="filter-container">
      <ul>
        <li class="panelLi">
          <span>合作社</span>
          <el-select v-model="listQuery.village" size="small" clearable style="width: 90px">
            <el-option v-for="item in 0" :key="item" :label="item" :value="item" />
          </el-select>
        </li>
        <li class="panelLi">
          <span>分红模式</span>
          <el-select v-model="listQuery.age" size="small" clearable style="width: 90px">
            <el-option v-for="item in 0" :key="item" :label="item" :value="item" />
          </el-select>
        </li>
        <li class="panelLi">
          <el-date-picker type="daterange" range-separator="至" start-placeholde="开始日期" end-placeholde="结束日期" />
        </li>
      </ul>
      <ul>
        <li class="search">
          <el-input v-model="listQuery.searchVal" size="small" placeholder="分红编号">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </li>
        <li>
          <el-button size="small" class="btn" @click="memberAddVisible=true;">新增</el-button>
        </li>
        <li>
          <el-button size="small" class="btn">执行</el-button>
        </li>
        <li>
          <el-button size="small" class="btn" @click.stop="showMore = !showMore">更多
            <i style="position: absolute; right:6px; top: 5px;font-size:17px;" class="el-icon-caret-bottom" />
          </el-button>
          <ul :class="{'member_more': showMore}" @click.stop="">
            <li>鉴定</li>
            <li>反鉴定</li>
            <li>列表打印</li>
            <li @click="uploadVisible=true">导入</li>
            <li>列表导出</li>
            <li>模板导出</li>
            <li>成员分组</li>
          </ul>
        </li>
        <li>
          <el-button size="small" icon="el-icon-refresh" />
        </li>
      </ul>
    </div>

    <div>
      <!-- 上传-无人员信息 -->
      <template v-if="dataList.length==0">
        <div class="member_err">
          <p><i class="el-icon-error" />暂无成员信息，请添加后继续操作。</p>
          <div><em @click="uploadVisible=true">点击导入成员信息</em></div>
        </div>
      </template>
      <!-- 表格内容 -->
      <template v-else>
        <div style="width:100%;overflow:auto">
          <table>
            <thead>
              <template v-for="(item,i) in tableRow">
                <tr :key="i">
                  <template v-for="itemn in item">
                    <th :key="itemn.title" :rowspan="itemn.row" :colspan="itemn.col">{{ itemn.title }}</th>
                  </template>
                </tr>
              </template>
            </thead>
          </table>
        </div>
      </template>
    </div>

    <!-- 导入弹窗 -->
    <el-dialog v-if="uploadVisible" title="选择文件" :visible.sync="uploadVisible">
      <a>下载导入模板</a>
      <el-upload class="upload-demo" drag action="load">
        <i class="el-icon-upload" />
        <div class="el-upload__text">拖拽或点击浏览本地地址添加</div>
      </el-upload>
      <div slot="footer">
        <el-button @click="uploadVisible=false">取消</el-button>
        <el-button>导入</el-button>
      </div>
    </el-dialog>
    <!-- 成员新增弹窗 -->
    <el-dialog v-if="memberAddVisible" title="成员新增" :visible.sync="memberAddVisible">
      <ul>
        <li>
          <span>家庭类型：</span>
          <el-select v-model="listQuery.village" size="small" clearable width="50px" class="filter-item">
            <el-option v-for="item in 0" :key="item" :label="item" :value="item" />
          </el-select>
        </li>
        <li>
          <span>所属村民小组：</span>
          <el-select v-model="listQuery.age" size="small" clearable width="50px" class="filter-item">
            <el-option v-for="item in 0" :key="item" :label="item" :value="item" />
          </el-select>
        </li>
      </ul>
      <table>
        <thead>
          <th>序号</th>
          <template v-for="itemn in tableRow[1]">
            <th :key="itemn.title" :rowspan="itemn.row" :colspan="itemn.col">{{ itemn.title }}</th>
          </template>
        </thead>
      </table>
      <div slot="footer">
        <el-button @click="memberAddVisible=false">取消</el-button>
        <el-button>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FenH',
  components: { },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        village: '',
        age: '',
        searchVal: ''
      },
      dataList: [{ 'dsa': 1 }], // 人员列表
      tableRow: [
        [
          { title: '序号', row: 2, col: 1 },
          { title: '户序号', row: 2, col: 1 },
          { title: '人序号', row: 2, col: 1 },
          { title: '户主姓名', row: 2, col: 1 },
          { title: '成员信息', row: 1, col: 14 },
          { title: '家庭类型', row: 2, col: 1 },
          { title: '所属村民小组', row: 2, col: 1 }
        ],
        [
          { title: '成员姓名', row: 1, col: 1 },
          { title: '与户主关系', row: 1, col: 1 },
          { title: '居民身份证号', row: 1, col: 1 },
          { title: '联系电话', row: 1, col: 1 },
          { title: '出生日期', row: 1, col: 1 },
          { title: '年龄/\n（按服务器日期核算）', row: 1, col: 1 },
          { title: '性别', row: 1, col: 1 },
          { title: '民族', row: 1, col: 1 },
          { title: '成员类型', row: 1, col: 1 },
          { title: '状态', row: 1, col: 1 },
          { title: '开户银行', row: 1, col: 1 },
          { title: '开户名称', row: 1, col: 1 },
          { title: '银行账号', row: 1, col: 1 },
          { title: '备注', row: 1, col: 1 }
        ]

      ], // 表格列表
      tableRowAdd: [
        { title: '成员姓名（必填）', row: 1, col: 1 },
        { title: '与户主关系（必填）', row: 1, col: 1 },
        { title: '居民身份证号（必填）', row: 1, col: 1 },
        { title: '联系电话', row: 1, col: 1 },
        { title: '出生日期', row: 1, col: 1 },
        { title: '年龄\r（按服务器日期核算）', row: 1, col: 1 },
        { title: '性别', row: 1, col: 1 },
        { title: '民族（必填）', row: 1, col: 1 },
        { title: '成员类型', row: 1, col: 1 },
        { title: '开户银行', row: 1, col: 1 },
        { title: '开户名称', row: 1, col: 1 },
        { title: '银行账号', row: 1, col: 1 },
        { title: '备注', row: 1, col: 1 }
      ], // 成员新增表头
      showMore: false, // 显示更多
      uploadVisible: false, // 显示上传弹窗
      memberAddVisible: false // 显示成员新增弹窗
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {

  }
}
</script>

<style lang='scss' scoped>
@import '../../styles/variables.scss';
table{
    border-spacing: 0;
    border-collapse: collapse;
}
th,td{
    border: 1px solid #cbcbcb;
    height: 38px;
    padding: 0 10px;
    min-width: 100px;
}
th{
    color: #000;
    font-weight: 600;
}
.filter-container>ul{
    list-style: none;
    display: inline-block;
    &:nth-of-type(2){
        float: right;
        margin-right: 15px;
    }
    .panelLi{
        box-shadow: 0px 2px 4px #d4d4d4;
        border-radius: 5px;
        padding: 0px 10px;
        height: 32px;
        span{
            display: inline-block;
            border-right: 1px solid #ccc;
            padding-right: 10px;
        }
        /deep/.el-select{
            input{
                border: 0;
            }
        }
        /deep/ .el-date-editor{
            border: 0;
            height: 32px;
        }
    }
    .search{
     /deep/ .el-input{
        box-shadow: 0px 2px 4px #d4d4d4;
        border-radius: 5px;
        input,button{
          border: 0;
        }
        .el-input-group__append, .el-input-group__prepend{
          background: #fff;
          padding: 0 10px;
          border: 0;
          span{
            display: inline-block;
            border-left: 1px solid #ccc;
            padding-left: 7px;
          }
        }
        .senior{
          display: inline-block;
          margin-left: 10px;
          color: $green;
          span{
            border: 0;
            padding: 0;
          }
        }
      }
    }
    li{
        display: inline-block;
        position: relative;
        margin-right: 10px;
        ul{
            position: absolute;
            top: 40px;
            left: -10px;
            padding: 0 5px;
            border: 1px solid $light-blue;
            background-color: #fff;
            opacity: 0;
            transition: all .3s linear;
            li{
                display: block;
                width: 100px;
                background-color:  $green;
                color: #fff;
                border-radius: 3px;
                margin: 5px 0;
                padding: 10px;
                text-align: center;
                cursor: pointer;
            }
            &:before{
                content: '';
                border-width: 10px 10px;
                border-color: transparent transparent $light-blue transparent;
                border-style: solid;
                position: absolute;
                top: -20px;
                left: 30px;
            }
            &:after{
                content: '';
                border-width: 10px 10px;
                border-color: transparent transparent #fff transparent;
                border-style: solid;
                position: absolute;
                top: -19px;
                left: 30px;
            }
        }
        .member_more{
          opacity: 1;
        }
    }
    .btn{
        background-color: $green;
        color: #fff;
        border-radius: 3px;
        border: 0;
        width: 78px;
    }
}
.member_err{
  text-align: center;
  font-size: .2rem;
  color: #333;
  margin-top: 15%;
  i{
    font-size: .5rem;
    color: red;
    vertical-align: middle;
    margin-right: 15px;
  }
  em{
    color: $blue;
    font-style: inherit;
    text-decoration: underline;
    cursor: pointer;
    &:hover{
      color: $light-blue
    }
  }
}
.dashboard-container{
  padding:15px;
  /deep/.el-dialog {
    border-radius: 5px;
    overflow: hidden;
    .el-dialog__header{
      color: #fff;
      background-color: $light-blue;
      padding: 10px;
      .el-dialog__headerbtn{
        top: 15px;
      }
      i{
        color: #fff;
      }
      .el-dialog__title{
        color: #fff;
      }
    }
    .el-dialog__body{
      padding-top: 10px;
    }
    a{
      color: $light-blue;
      text-decoration: underline;
      float: right;
    }
    /deep/.el-upload{
      width: 100%;
      /deep/.el-upload-dragger{
        width: 100%;
        border: 0;
      }
    }
    .el-button{
      color: #fff;
      background-color: $light-blue;
      border: 1px solid $light-blue;
      height: 33px;
      width: 78px;
      border-radius: 3px;
      &:hover{
        background-color: #fff;
        color: $light-blue;
      }
    }
    ul li{
      display: inline-block;
      width: 45%;
      margin-bottom: 20px;
    }
  }
}
.el-popper{
      ul li{
        margin: 5px 0;
        text-align: center;
        .el-button{
          color: #fff;
          background-color:$green;
          border: 1px solid $green;
          margin-top: 10px;
          &:nth-of-type(1){
            margin-right: 50px;
          }
          &:hover{
            color: $green;
            background: #fff;
          }
        }
      }
    }
</style>
