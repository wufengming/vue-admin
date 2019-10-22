<template>
  <div
    id="chart3"
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
            text: '股权类型统计'
          },
          color: ['#f67e30', '#17b9e0'],
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
            bottom: '20%'
          },
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 20
            },
            type: 'category',
            // offset: '10',
            data: ['集体股', '成员股', '激励股', '扶贫股', '五保股']
          },

          yAxis: {
            type: 'value'
          },
          // 必须为空 https://github.com/apache/incubator-echarts/issues/7768
          series: [{
            data: [820, 932, 901, 934, 1290],
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [

                    { offset: 0, color: '#5666fc' },
                    { offset: 1, color: '#63b6fb' }
                  ]
                )
              },
              emphasis: { // 鼠标移上去
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#5666fc' },
                    { offset: 1, color: '#63b6fb' }
                  ]
                )
              }
            }
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
    var chart3 = document.getElementById('chart3')
    this.$nextTick(() => {
      vm.chartsInit()
    })
    // 自适应窗口  // 跳出打印窗口会有问题
    window.onresize = chart3.resize
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
        this.chart.target = echarts.init(document.getElementById('chart3'), 'westeros')
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
</style>
