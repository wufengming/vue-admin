<template>
  <section>
    <div class="card-main">
      <div class="bg" />
      <div class="top-info">
        <div class="number">证书编号:<div class="data">{{ data.cardCode }}</div></div>
        <div class="adree"><div class="data">{{ data.county }}</div>县(市、区)<div class="data">{{ data.street }}</div>乡(镇、街道)</div>
        <div class="adree"><div class="data">{{ "某某" }}</div>村(社区)<div class="data">{{ "某某" }}</div>组织经济股份合作社</div>
      </div>
      <div class="title-info">
        股权证书
      </div>
      <div class="user-info">
        <ul>
          <li>户主姓名：{{ data.homePerson }}</li>
          <li>本户股东：<span>{{ data.personCount }}</span></li>
          <li>本户股数：<span>{{ data.stockTotal }}</span></li>
          <li>每股原值：<span>{{ data.stockOldvalue }}</span></li>
          <li>发证单位：<span>{{ data.certificateUnit }}</span></li>
          <li>董事长签字（盖章）：</li>
        </ul>
      </div>
      <div class="bottom-info">
        <div class="date">发证日期：<div class="tick-year">{{ data.certificateDate?data.certificateDate.split('-')[0]:'' }}</div>年<div class="tick-month">{{ data.certificateDate?data.certificateDate.split('-')[1]:'' }}</div>月<div class="tick-month">{{ data.certificateDate?data.certificateDate.split('-')[2].split(' ')[0]:'' }}</div>日</div>
        <div class="fh"><div class="adree">{{ data.county }}</div>县(市、区)农业农村局 印制</div>
      </div>
      <div v-if="data.verifyState ===1" class="tip-jd">
        <div>已鉴定</div>
        <div>{{ data.verifyDate ? data.verifyDate.split(' ')[0]:'' }}</div>
      </div>
      <div v-if="data.verifyState ===0" class="tip-fq">
        <div>未鉴定</div>
        <div>{{ data.verifyDate ? data.verifyDate.split('')[0]:'' }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StockCard',
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      number: '20190909'
    }
  }
}
</script>

<style scoped lang="scss">
  .card-main{
    position: relative;
    height:580px;
    width: 430px;
    .bg{
      background-image: url("../../../assets/images/stock-crad-bg.png");
      background-repeat: no-repeat;
      background-size: 100%;
      height:580px;
      width: 430px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
    }
    .top-info{
      position: absolute;
      width: 100%;
      height: 100px;
      top: 52px;
      left: 0;
      z-index: 1;
      .number{
        margin-left: 42px;
        .data{
          font-size: 10px;
          display: inline-block;
          border-bottom: 1px solid #cccccc;
        }
      }
      .adree{
        margin-left: 60px;
        margin-top: 5px;
        .data{
          display: inline-block;
          margin: 0 5px;
          border-bottom: 1px solid #cccccc;
        }
      }
    }
    .title-info{
      position: absolute;
      top: 155px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 0.30rem;
    }
    .user-info{
      position: absolute;
      top: 220px;
      left: 116px;
      right: 0;
      ul{
        li{
          margin-top: 10px;
          &:last-of-type{
            margin-top: 25px;
          }
          span{
            color: rgb(232,18,27);
          }
        }
      }
    }
    .bottom-info{
      position: absolute;
      top: 480px;
      left: 60px;
      right: 0;
      .date{
        .tick-year{
          display: inline-block;
          text-align: center;
          width: 50px;
          border-bottom:1px solid #cccccc;
        }
        .tick-month{
          display: inline-block;
          text-align: center;
          width: 30px;
          border-bottom:1px solid #cccccc;
        }
      }
      .fh{
        margin-top: 10px;
        .adree{
          display: inline-block;
          text-align: center;
          min-width: 100px;
          border-bottom:1px solid #cccccc;
        }
      }
    }
    .tip-jd{
      position: absolute;
      top: 48px;
      right: 17px;
      border: 3px solid rgb(60,122,254);
      transform: rotate(-35deg);
      width: 150px;
      height: 60px;
      z-index: 3;
      div{
        text-align: center;
        line-height: 27px;
        font-size: 0.2rem;
        color: rgb(60,122,254);
      }
    }
    .tip-fq{
      position: absolute;
      top: 48px;
      right: 17px;
      border: 3px solid rgb(232,18,27);
      transform: rotate(-35deg);
      width: 150px;
      height: 60px;
      z-index: 4;
      div{
        text-align: center;
        line-height: 27px;
        font-size: 0.2rem;
        color: rgb(232,18,27);
      }
    }
  }
</style>
