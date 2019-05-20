<template>
  <div>
      <navComponent title="终极无敌上帝视角值蛇皮日历插件"></navComponent>
      <div class="content">
        <calendar></calendar>
      </div>
  </div>
</template>

<script>
import navComponent from '@/components/navComponent';
import calendar from '@/components/calendar';
export default {
  components:{
      navComponent,
      calendar,
  },
  props:{},
  data(){
    return {
    }
  },
}
</script>
<style scoped lang=less>
.content{
  margin: 10px;
  padding: 10px;
  background: #fff;
  /* border-radius: 5px; */
}
</style>