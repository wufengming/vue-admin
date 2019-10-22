<template>
  <div class="registModel">
    <div class="BG">
      <img
        src="@/assets/images/registration.png"
        alt=""
      >
    </div>
    <div class="modelCon">
      <div class="modeContent">
        <p class="code">
          <span>统一社会信用社代码:</span>
          <span>122222222222</span>
        </p>
        <el-row
          class="mt10"
          :gutter="12"
          type="flex"
        >
          <el-col :span="12">
            <el-row
              :gutter="0"
              type="flex"
            >
              <el-col :span="6">
                名称:
              </el-col>
              <el-col :span="18">
                马到村sadfaf马到村
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row
              :gutter="0"
              type="flex"
            >
              <el-col :span="10">
                法人代表:
              </el-col>
              <el-col :span="14">
                马到村
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row
          class="mt10"
          :gutter="12"
          type="flex"
        >
          <el-col :span="12">
            <el-row
              :gutter="0"
              type="flex"
            >
              <el-col :span="6">
                类型:
              </el-col>
              <el-col :span="18">
                马到村sadfaf马到
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row
              :gutter="0"
              type="flex"
            >
              <el-col :span="10">
                资产情况:
              </el-col>
              <el-col :span="14">
                <span class="details">查看详细</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row
          class="mt10"
          :gutter="12"
          type="flex"
        >
          <el-col :span="12">
            <el-row
              :gutter="0"
              type="flex"
            >
              <el-col :span="6">
                住所:
              </el-col>
              <el-col :span="18">
                马到村sadfaf马到合作社杭州市进理发店

              </el-col>
            </el-row>
            <el-row
              class="mt10"
              :gutter="0"
              type="flex"
            >
              <el-col :span="10">
                业务范围:
              </el-col>
              <el-col :span="14">
                <span class="details">查看详细</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row
              :gutter="0"
              type="flex"
            >
              <el-col :span="10">
                成立日期:
              </el-col>
              <el-col :span="14">
                2019.01.01

              </el-col>
            </el-row>
            <el-row
              class="mt10"
              :gutter="0"
              type="flex"
            >
              <el-col :span="10">
                有效日期:
              </el-col>
              <el-col :span="14">
                2019.01.01至2019.01.01
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

    </div>
    <div class="registCount">
      <p>
        <img
          src="@/assets/images/gu.png"
          alt=""
        >
        <span>12</span>
      </p>
    </div>
    <div
      v-if="state==1||state==2"
      class="registState"
      :class="{checked:state==1,cancel:state==2}"
    >
      <div>
        <p>{{ state==1?'已鉴定':'已注销' }}</p>
        <p>{{ '2019-08-21' }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RegistModel',
  data() {
    return {
      state: 1
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.registModel {
  position: relative;
  width: 500px;
  height: 330px;
  font-size: 0.17rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);

  .BG {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  > div.modelCon {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    &.modelCon {
      padding: 90px 0 20px 20px;

      z-index: 9;
      .modeContent {
        height: 100%;
        padding-right: 20px;
        overflow: auto;
      }
      .code {
        text-align: right;
      }
    }
  }
  .details {
    color: $blue;
    text-decoration: underline;
    cursor: pointer;
  }
  .mt10 {
    margin-top: 10px;
  }
  .registCount {
    height: 90px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    border-radius: 0 0 0 5px;
    > p {
      margin-top: 40px;
      height: 50px;
      line-height: 50px;
      position: relative;
      color: #fff;
      padding-top: 6px;
      span {
        margin-left: -4px;
      }
      img {
        vertical-align: middle;
        margin-top: -5px;
      }
    }
    &:before {
      content: "";
      position: absolute;
      top: 20px;
      left: -100px;
      width: 200px;
      height: 100px;
      transform: rotate(38deg);
      background: rgba(0, 0, 0, 0.4);
    }
  }
  .registState {
    position: absolute;
    top: 48px;
    right: 17px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-35deg);
    width: 150px;
    border-radius: 3px;
    height: 60px;

    font-weight: 600;
    font-size: 0.19rem;
    > div {
      height: 100%;
      > p {
        height: 50%;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  .checked {
    color: $blue;
    border: 3px solid $blue;
  }
  .cancel {
    color: red;
    border: 3px solid red;
  }
}
</style>
