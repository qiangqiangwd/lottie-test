<template>
  <div>
    <div class="CalendarBox" v-if="calcData">
      <div class="detailDate">
        <button @click="changeData('prev')">上一月</button>
        <span class="t">{{calcData.time}}</span>
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
          @click="chooseDay(item,calcData.time+item.d)"
        >{{item.d}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Calendar from "@/assets/js/Calendar";
export default {
  components: {},
  props: [""],
  data() {
    return {
      calcData: false, // 日历的数据
      weeks: ["一", "二", "三", "四", "五", "六", "日"],
      clickDate: ""
    };
  },
  watch: {},
  computed: {},
  created() {
    // console.log(this.calcData);
    this.setCalendarData();
    window.onload = ()=>{
      console.log(BMap);
    };
  },
  mounted() {},
  methods: {
    // 设置日历参数
    setCalendarData(initTime) {
      let opts = {
        // showMonth: 5, // 显示1月份的日期
        // showDays: 99, // 显示天数
        // desc: true,
        // exceedNowNotUse: true,
        initTime: "2019-5",
        // nowTime: '2019-3-10',
        // isShowSupply: false,
        startWeek: 1 // 日历从哪个星期开始，(默认星期天,数值：日->六：0-6)
      };

      if (initTime) opts.initTime = initTime;

      let riLi = new Calendar(opts);
      let arr = riLi.getCalendarData();
      this.calcData = arr;
      // console.log(arr);
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
    chooseDay(item, date) {
      let calcData = this.calcData;
      console.log(item, calcData);
      if (item.canUse) {
        this.clickDate = `${calcData.year}-${calcData.month}-${item.d}`;
      }
      // console.log(this.clickDate,date);
    }
  }
};
</script>
<style scoped lang=less>
.CalendarBox {
  .detailDate {
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    .t {
      font-weight: 600;
      font-size: 16px;
    }
  }
  ul {
    display: flex;
    align-items: center;
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
    color: #cccccc;
  }
  .activeDate {
    border: 1px solid red;
    border-radius: 4px;
    transition: border-color linear 0.25s;
  }
}
</style>