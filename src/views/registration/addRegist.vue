<template>
  <div class="addRegist">
    <ul class="infoType">
      <li
        :class="{active:step=='1'}"
        @click="step='1'"
      >
        证书信息
      </li>
      <li
        :class="{active:step=='2'}"
        @click="step='2'"
      >
        法人信息
      </li>
      <li
        :class="{active:step=='3'}"
        @click="step='3'"
      >
        股权信息
      </li>
      <li
        :class="{active:step=='4'}"
        @click="step='4'"
      >
        资产信息
      </li>
      <li
        :class="{active:step=='5'}"
        @click="step='5'"
      >
        附件
      </li>
    </ul>
    <div class="infoContent">
      <ul
        v-if="step==1"
        class="registrationInfo"
      >
        <li>
          <div>所属组织:</div>
          <div>
            <div>
              <el-input
                v-model="companyInfo.orgid"
                placeholder="必填"
              />

            </div>
            <div>
              <div>信用代码:</div>
              <div>
                <el-input
                  v-model="companyInfo.enterpriseCode"
                  placeholder="必填"
                />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div>成立日期:</div>
          <div>
            <div>
              <el-date-picker
                v-model="companyInfo.setupDate"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              />
            </div>
            <div>
              <div>证书类型:</div>
              <div>
                <el-select
                  v-model="companyInfo.type"
                  style="width:300px"
                >
                  <el-option
                    v-for="(item,i) of registrationType"
                    :key="i"
                    :value="item.code"
                    :label="item.name"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div>登记日期:</div>
          <div>
            <div>
              <el-date-picker
                v-model="companyInfo.registerDate"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              />
            </div>
            <div>
              <div>有效日期:</div>
              <div>
                <el-date-picker
                  v-model="companyInfo.enableDate"
                  style="width:100%"
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
            </div>
          </div>
        </li>
        <li>
          <div>
            <span style="float:left;padding-left:5px">住</span>
            <span style="float:right">所:</span>
          </div>
          <div class="longW" />
        </li>
        <li>
          <div>领证机关:</div>
          <div class="longW">
            <el-input v-model="companyInfo.certificateUnit" />
          </div>
        </li>
        <li>
          <div>业务范围:</div>
          <div class="longW">
            <el-input type="textarea" />
          </div>
        </li>
        <li>
          <div style="width:200px;text-align:left;padding-left:5px">登记证书图片:</div>

        </li>
        <li />
      </ul>
      <ul
        v-if="step==2"
        class="registrationInfo"
      >
        <li>
          <div>法人代表:</div>
          <div>
            <div>
              <el-input
                v-model="companyInfo.personName"
                placeholder="必填"
              />

            </div>
            <div>
              <div>证件类型:</div>
              <div>
                <el-select
                  v-model="companyInfo.cardType"
                  style="width:300px"
                  placeholder="必填"
                >
                  <el-option
                    v-for="(item,i) of idType"
                    :key="i"
                    :value="item.code"
                    :label="item.name"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div>证件号码:</div>
          <div>
            <div>
              <el-input
                v-model="companyInfo.card"
                placeholder="必填"
              />
            </div>
            <div>
              <div>手机号码:</div>
              <div>
                <el-input
                  v-model="companyInfo.mobilePhone"
                  placeholder="必填"
                />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div>文化程度:</div>
          <div>
            <div>
              <el-select
                v-model="companyInfo.education"
                placeholder="必填"
              >
                <el-option
                  v-for="(item,i) of educationType"
                  :key="i"
                  :value="item.code"
                  :label="item.name"
                />
              </el-select>
            </div>
            <div>
              <div>
                <span style="float:left;padding-left:5px;">
                  民
                </span>
                <span>
                  族:
                </span> </div>
              <div>
                <el-select
                  v-model="companyInfo.national"
                  style="width:300px"
                >
                  <el-option
                    v-for="(item,i) of raceType"
                    :key="i"
                    :value="item.code"
                    :label="item.name"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div>
            证件照片:
          </div>
        </li>

      </ul>
      <ul
        v-if="step==3"
        class="registrationInfo"
      >
        <li>
          <div>股权模式:</div>
          <div>
            <div>
              <el-select
                v-model="companyInfo.stockModel"
                placeholder="必填"
              >
                <el-option
                  v-for="(item,i) of stockType"
                  :key="i"
                  :value="item.code"
                  :label="item.name"
                />
              </el-select>

            </div>
            <div>
              <div>总股数:</div>
              <div>
                <el-input
                  v-model="companyInfo.stockCount"
                  placeholder="必填"
                />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div>每股原值:</div>
          <div>
            <div>
              <el-input
                v-model="companyInfo.stockOldvalue"
                placeholder="必填(元)"
              />
            </div>
            <div>
              <div>每股现值:</div>
              <div>
                <el-input
                  v-model="companyInfo.stockNewvalue"
                  placeholder="必填(元)"
                />
              </div>
            </div>
          </div>
        </li>

      </ul>
      <ul
        v-if="step==4"
        class="registrationInfo "
      >
        <li>
          <div style="width:105px">集体资产总额:</div>
          <div style="width:680px">
            <div style="width:260px">
              <el-input
                v-model="companyInfo.colAssetTotal"
                style="width:260px"
                placeholder="万元"
              />

            </div>
            <div style="width:385px">
              <div style="width:120px">集体土地总面积:</div>
              <div style="width:260px">
                <el-input
                  v-model="companyInfo.colLandArea"
                  placeholder="亩"
                />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div style="width:105px">净资产总额:</div>
          <div style="width:690px">
            <div style="width:260px">
              <el-input
                v-model="companyInfo.colAssetTotalJ"
                style="width:260px"
                placeholder="万元"
              />

            </div>
            <div style="width:385px">
              <div style="width:120px">未承包到户土地:</div>
              <div style="width:260px">
                <el-input
                  v-model="companyInfo.colLandContractN"
                  placeholder="亩"
                />
              </div>
            </div>
          </div>
        </li>

        <li>
          <div style="width:105px">资本:</div>
          <div style="width:690px">
            <div style="width:260px">
              <el-input
                v-model="companyInfo.colAsset"
                style="width:260px"
                placeholder="万元"
              />
            </div>
            <div />
          </div>
        </li>

      </ul>
      <div
        v-if="step==5"
        class="attechment"
      >
        附件
      </div>
      <p class="stepCon">
        <span
          v-if="step!=1"
          @click="step--"
        >上一步</span>
        <span
          v-if="step!=5"
          @click="step++"
        >下一步</span>
        <span
          v-if="step==5"
          @click="finishAdd"
        >完成</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddRegist',
  data() {
    return {
      step: 1, // 过程
      stockType: [// 股权模式
        { code: 1, name: '静态管理' },
        { code: 2, name: '动态管理' }
      ],
      registrationType: [// 证书类型
        { code: 1, name: '村集体经济' }
      ],
      idType: [ // 证件类型
        { code: 1, name: '居民身份证号' },
        { code: 2, name: '军人证' },
        { code: 3, name: '护照' }
      ],
      educationType: [ // 文化程度类型
        { code: 1, name: '小学' },
        { code: 2, name: '初中' },
        { code: 3, name: '高中' },
        { code: 4, name: '大学本科' },
        { code: 5, name: '硕士研究生' },
        { code: 6, name: '博士研究生' }
      ],
      raceType: [ // 民族
        { code: 1, name: '汉' },
        { code: 2, name: '回' },
        { code: 3, name: '壮' },
        { code: 4, name: '满' },
        { code: 5, name: '维吾尔族' },
        { code: 6, name: '蒙古族' }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '',
      companyInfo: {
        // 业务范围??????
        // enableDate  //有效日期
        //  address: 1,// 合作社地址 ,
        // bankAccount: 1,// 银行账号 ,
        // bankCode: 1,//银行行号 ,
        // bankName: 1,//银行名称 ,
        // card: 1,//证件号码 ,
        // cardType: 1,//证件类型 ,
        // certificateDate: 1,//登记时间 ,
        // certificateFile: 1,// 证件附件 ,
        // certificateUnit: 1,//登记机关 ,
        // city: 1,//市 ,
        // colAsset: 1,//资本 ,
        // colAssetTotal: 1,//集体资产总额 ,
        // colAssetTotalJ: 1,//净资产总额 ,
        // colLandArea: 1,// 集体土地总面积 ,
        // colLandContractN: 1,// 未承包到户土地 ,
        // county: 1,// 区县 ,
        // creator: 1,//,
        // curOrgid: 1,// ,
        // delFlag: 1,//删除标志 默认0 ,
        // description: 1,//描述 ,
        // editor: 1,//,
        // education: 1,//文化程度 ,
        // enabledmark: 1,//有效标志 ,
        // encode: 1,// 合作社编码 ,
        // endDate: 1,//有效结束时间 ,
        // enterpriseAttachment: 1,// 统一社会信用附件地址 ,
        // enterpriseCode: 1,// 统一社会信用代码 ,
        // familyCount: 1,
        // isPrint: 1,//是否打印 默认0 ,
        // legalPersonCert: 1,
        // legalPersonName: 1,
        // mobilePhone: 1,//手机号码 ,
        // name: 1,// 合作社名称 ,
        // national: 1,//民族 ,
        // ngInsertDt: 1,
        // ngRecordVer: 1,
        // ngUpdateDt: 1,
        // orgid: 1,//组织id ,
        // personCount: 1,
        // personName: 1,// 法人姓名 ,
        // phid: 1,
        // province: 省,
        // registerDate: 1,// 登记日期 ,
        // setupDate: 1,//成立日期 ,
        // startDate: 1,// 有效开始时间 ,
        // stockCount: 1,总股数
        // stockModel: 1,//股权模式 ,
        // stockNewvalue: 1,//每股现值 ,
        // stockOldvalue: 1,//每股原值 ,
        // street: 1,// 街道 ,
        // type: 1,// 合作社类型 ,
        // verifyDate: 1,//审核日期 ,
        // verifyState: 1,//审核状态
      }
    }
  },
  methods: {
    finishAdd(data) { // 显示折股量化确认框
      this.$emit('finishAdd', data)
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.addRegist {
  font-size: 0.16rem;
  height: 500px;
  .infoType {
    height: 30px;
    line-height: 30px;
    background: #f1f1f1;
    > li {
      float: left;
      height: 100%;
      width: 80px;
      cursor: pointer;
      text-align: center;
      &.active {
        background: #fff;
        cursor: default;
        color: #2e91ff;
      }
    }
  }
  .infoContent {
    padding: 20px 20px 5px;
  }
  .registrationInfo {
    height: 410px;
    > li {
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      > div {
        float: left;
        width: 75px;
        text-align: right;
        margin-right: 5px;
        &:nth-of-type(2) {
          float: left;
          width: 700px;
          > div {
            float: left;
            width: 300px;
            > div {
              width: 300px;
            }
            &:last-of-type {
              float: right;
              width: 380px;
              > div {
                width: 75px;
                display: inline-block;
                &:last-of-type {
                  width: 300px;
                }
              }
            }
          }
        }
      }
      .longW {
        width: 700px;
        > div {
          width: 700px !important;
        }
      }
    }
  }
  .attechment {
    height: 410px;
  }
  .stepCon {
    text-align: right;
    color: $blue;
    span {
      cursor: pointer;
      margin-left: 20px;
    }
  }
}
</style>
<style>
.addRegist .el-date-editor .el-range-separator {
  width: 20px;
}
</style>

