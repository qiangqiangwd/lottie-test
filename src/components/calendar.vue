<template>
  <div>
    <div class="tit">
      日历数据的获取
      <a class="aHref" href="https://github.com/qiangqiangwd/lottie-test/blob/master/src/assets/js/Calendar.js" target="_blank">查看js源码</a>
    </div>
    <div class="pre">
      <pre>
initTime: 当前显示的时间 (格式 2019-5-18，未传天则默认 第一天)，
showMonth:显示的月份数
desc：倒序显示（默认false）
exceedNowNotUse: 超过当前时间不可使用(默认false)
startWeek: 开始的星期数(默认0)[0 - 6], 默认:顺序为：日0 一1 二2 三3 四4 五5 六6
isShowSupply: 是否在本月 数据中补齐上月下月的日期（默认 true）
      </pre>
      <div class='careful'>
        <p>注：</p>
        <p>1、该js有待完善，可在自己项目中自行修改（并不会很难...） </p>
        <p>2、方法可自行添加，这只返回对应的数据（也就是只开了个头...）</p>
        <p>3、代码下载和查看看上方 '查看js源码' ↑</p>
        <p>4、真的还有待完善啊~</p>
        <p>4、(((((((((((っ•ω•)っ Σ(σ｀•ω•´)σ 嗯，起飞！</p>
      </div>
    </div>
    
    <div class="tit">最简单的使用示例</div>
    <div class="CalendarBox" v-if="calcData">
      <div class="detailDate">
        <button @click="changeData('prev')">上一月</button>
        <div class="t">{{calcData.time}}</div>
        <button @click="changeData('next')">下一月</button>
      </div>
      <ul class="weeks">
        <li v-for="(item,index) in weeks" :key="index">{{item}}</li>
      </ul>
      <ul class="days">
        <li
          v-for="(item,index) in calcData.days"
          :key="index"
          :class="[item.isToday?'isToday':'',item.canUse?'':'notCanUse',item.canUse&&clickDate==`${calcData.year}-${calcData.month}-${item.d}`?'activeDate':'']"
          @click='chooseDay(item,calcData.time+item.d)'
        >{{item.d}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Calendar from "@/assets/js/Calendar";
export default {
  components: {},
  props: {},
  data() {
    return {
      calcData: false, // 日历的数据
      weeks: ["一", "二", "三", "四", "五", "六", "日"],
      clickDate:'',
    };
  },
  watch: {},
  computed: {},
  created() {
    // console.log(this.calcData);
    this.setCalendarData();
  },
  mounted() {},
  methods: {
    // 设置日历参数
    setCalendarData(initTime) {
      let opts = {
        showMonth: 1, // 显示1月份的日期
        desc: true,
        // exceedNowNotUse: true,
        startWeek: 1 // 日历从哪个星期开始，(默认星期天,数值：日->六：0-6)
      };

      if (initTime) opts.initTime = initTime;

      let riLi = new Calendar(opts);
      this.calcData = riLi.getCalendarData();
    },
    // 点击上下月
    changeData(type) {
      let str = "",
        data = JSON.parse(JSON.stringify(this.calcData));
      if (type === "prev") {
        str = `${data.month - 1 <= 0 ? data.year - 1 : data.year}-${
          data.month - 1 <= 0 ? 12 : data.month - 1
        }`;
      } else {
        str = `${data.month + 1 > 12 ? data.year + 1 : data.year}-${
          data.month + 1 > 12 ? 1 : data.month + 1
        }`;
      }

      this.setCalendarData(str);
    },

    // 选则天数
    chooseDay(item,date){
      let calcData = this.calcData;
      // console.log(item);
      if(item.canUse){
        this.clickDate = `${calcData.year}-${calcData.month}-${item.d}`;
      }
      // console.log(this.clickDate,date);
    },
  }
};
</script>
<style scoped lang=less>
.careful{
  p{
    color: #ff4200;
    font-size: 14px;
    line-height: 1.5;
  }
}
.tit {
  font-size: 18px;
  margin-bottom: 10px;
}
.aHref{
  color: #ff4200;
  font-size: 14px;
  margin-left: 10px;
}
.pre{
  margin-bottom: 10px;
}
.CalendarBox {
  .detailDate {
    text-align: center;

    display: flex;
    align-content: center;
    justify-content: space-between;
    font-size: 14px;
    .t {
      font-weight: 600;
      font-size: 16px;
    }
  }
  ul {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    justify-content: space-between;
    @liHeight: 11.5vw;
    li {
      list-style: none;
      width: 13%;
      text-align: center;
      height: @liHeight;
      line-height: @liHeight;
      /* box-sizing: border-box; */
      border: 1px solid #fff;
      /* transition: border-color linear .25s; */
    }
  }
  .weeks {
    font-weight: 600;
  }
  .isToday {
    position: relative;
    background: red;
    color: #fff;
  }
  .notCanUse {
    color: #999999;
  }
  .activeDate{
    border: 1px solid red;
    border-radius: 4px;
    transition: border-color linear .25s;
  }
}

pre {
  width: 100%;
  overflow: auto;
  line-height: 1.5;
  font-size: 16px;
}
</style>