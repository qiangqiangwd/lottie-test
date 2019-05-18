<template>
  <div>日历</div>
</template>

<script>
import Calendar from '@/assets/js/Calendar'
export default {
  components: {},
  props: {},
  data() {
    return {
      now_time: new Date()
    };
  },
  watch: {},
  computed: {},
  created() {
    let riLi = new Calendar({
        showMonth:2, // 显示3月份的日期
        desc:true,
        exceedNowNotUse:true,
        startWeek:3, // 星期天开始
    });
    // let nowTime = new Date();
    console.log(riLi.getCalendarData());
  },
  mounted() {},
  methods: {
  },
};
</script>
<style scoped lang=less>
</style>