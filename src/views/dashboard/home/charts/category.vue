<template>
  <div
    id="chart1"
    class="chart-area"
  />
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    chartData: Array
  },
  data() {
    return {
      chart: {
        target: null,
        option: {
          title: {
            text: '分红金额按年统计'
          },
          color: ['#cb72f0', '#fff0ed'],
          tooltip: {
            trigger: 'axis',
            // formatter: '{a0}<br />{b0} : {c0}'
            formatter: function(params, ticket, callback) {
              let res = params[0].name
              for (let i = 0, l = params.length; i < l; i++) {
                res += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + '元'
              }
              return res
            }
          },
          legend: {
            data: ['期初余额', '期末余额'],
            x: 'right',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          grid: {
            left: '15%',
            bottom: '25%'
          },
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 20
            },
            type: 'category',
            boundaryGap: false,
            data: ['2015', '2016', '2017', '2018', '2019']
          },

          yAxis: {
            type: 'value'
          },
          // 必须为空 https://github.com/apache/incubator-echarts/issues/7768
          series: [{
            data: [820, 932, 901, 934, 1290],
            type: 'line',
            areaStyle: { color: ['rgba(254,240,237)'] }
          }]
        }
      }
    }
  },
  watch: {
    chartData() {
      if (this.chartData.length) {
        this.draw()
      }
    }
  },
  mounted() {
    var vm = this
    var chart1 = document.getElementById('chart1')
    this.$nextTick(() => {
      vm.chartsInit()
    })
    // 自适应窗口  // 跳出打印窗口会有问题
    window.onresize = chart1.resize
    // window.addEventListener("resize", () => {
    //
    //     vm.chart.target.resize();
    // });
  },
  beforeDestroy() {
    const vm = this
    window.removeEventListener('resize', vm.chartResize)
  },
  methods: {
    // 初始化图表
    chartsInit() {
      var vm = this
      // 创建图表对象
      if (!this.chart.target) {
        this.chart.target = echarts.init(document.getElementById('chart1'), 'westeros')
      }
      // 绘制默认图表
      this.chart.target.setOption(this.chart.option)
      window.addEventListener('resize', vm.chartResize)
    },
    // 图表重渲染
    chartResize() {
      this.chart.target.resize()
    },
    // 重绘
    draw() {
      // 配置项需要变更
      const option = {
        // tooltip: {
        //         trigger: 'axis',
        //         formatter: '{a}<br />{b} : {c}'
        //     },
        series: [
          {
            name: this.chartData[0].name,
            type: 'line',
            lineStyle: { width: 4, color: '#84bc25' },
            // itemStyle : { normal: {label : {show: true}}},
            data: this.chartData[0].data
          },
          {
            name: this.chartData[1].name,
            type: 'line',
            lineStyle: { width: 4, color: '#17b9e0' },
            // itemStyle : { normal: {label : {show: true}}},
            data: this.chartData[1].data
          }
        ]
      }
      this.chart.target.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-area {
  width: 100%;
  height: 200px;
}
@media screen and (min-height: 900px) {
  .chart-area {
    width: 100%;
    height: 250px;
  }
}
</style>
