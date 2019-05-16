<template>
  <div class="home">
    <div>星星组件</div>
    <stars :starNumer.sync="starNumer"></stars>  
  </div>
</template>

<script>
// @ is an alias to /src
import stars from '@/components/star.vue';
export default {
  name: "home",
  data() {
    return {
      // 星星组件 部分
      starNumer:2,
    };
  },
  components: {
    stars,
  },
  watch:{
    starNumer(val){
      console.log(val);
    },
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="less">
.starBox{
  display: flex;
  .star{
    width: 50px;
    height: 50px;
  }
}
</style>

