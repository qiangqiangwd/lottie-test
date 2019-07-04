<template>
  <div>
    <navComponent title="终极无敌上帝视角值蛇皮日历插件"></navComponent>
    <div class="content">
      <div class="title1">
        日历数据的获取
        <a
          class="aHref"
          href="https://github.com/qiangqiangwd/lottie-test/blob/master/src/assets/js/Calendar.js"
          target="_blank"
        >查看js源码</a>
      </div>
      <div class="pre">
        <pre>
initTime: 日历初始化的时间，即数据从当前日期开始 (格式 2019-5-18，未传天则默认 第一天)
nowTime: 当前的时间（不传则默认当天，exceedNowNotUse 以这个为基准）
showMonth:显示的月份数
showDays:显示的天数（当和 showMonth 同时存在时，以 showDays 为主，显示以前的天数）
desc：时间倒序显示（默认false），注意：使用倒序时必须注意星期也必须跟着倒序，否则，哼哼┐(￣ヘ￣)┌！
exceedNowNotUse: 超过当前时间不可使用(默认false)【若有 initTime ，以其为准】
startWeek: 开始的星期数(默认0)[0 - 6], 默认:顺序为：日0 一1 二2 三3 四4 五5 六6
isShowSupply: 是否在本月 数据中补齐上月下月的日期（默认 true）
      </pre>
        <div class="careful">
          <p>注：</p>
          <p>1、该js有待完善，可在自己项目中自行修改（并不会很难... <span class="huaXian">也许吧</span>）</p>
          <p>2、方法可自行添加，这只返回对应的数据（也就是只开了个头...）</p>
          <p>3、代码下载和查看看上方 '查看js源码' ↑</p>
          <p>4、真的还有待完善啊~</p>
          <p>4、(((((((((((っ•ω•)っ Σ(σ｀•ω•´)σ 嗯，起飞！</p>
          <img src="data:image/png;
        </div>
      </div>
      <div>
        <div class="title1">最简单的使用示例</div>
        <calendar></calendar>
        <div class="title1">开始搞点骚操作</div>
        <p class='tips'>显示天数（showDays）为20天，不进行补齐（isShowSupply：false），</p>
        <calendar :options="riLiOptions1"></calendar>
      </div>
    </div>
  </div>
</template>

<script>
import navComponent from "@/components/navComponent";
import calendar from "@/components/calendar";
export default {
  components: {
    navComponent,
    calendar
  },
  props: {},
  data() {
    return {
      riLiOptions1:{
        // showMonth: 5, // 显示1月份的日期
        showDays: 20, // 显示天数
        // desc: true,
        // exceedNowNotUse: true,
        // initTime: "2019-3-10",
        // nowTime: '2019-4',
        isShowSupply: false,
        startWeek: 1 // 日历从哪个星期开始，(默认星期天,数值：日->六：0-6)
      },
    };
  }
};
</script>
<style scoped lang=less>

.content {
  margin: 10px;
  padding: 10px;
  background: #fff;
}
.careful {
  p {
    color: #ff4200;
    font-size: 14px;
    line-height: 1.5;
  }
  .huaXian{
    color: #ff4200;
    font-size: 12px;
    text-decoration: line-through;
    /* background: #ff4200; */
  }
}

.aHref {
  color: #ff4200;
  font-size: 14px;
  margin-left: 10px;
}
.pre {
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
  .activeDate {
    border: 1px solid red;
    border-radius: 4px;
    transition: border-color linear 0.25s;
  }
}

pre {
  width: 100%;
  overflow: auto;
  line-height: 1.5;
  font-size: 16px;
}
</style>