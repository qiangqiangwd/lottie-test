<template>
    <div class="starBox">
      <div class="star" @click="useStar(item)" v-for="(item,index) in 5" :key="item">
        <star :options="options[index]" @lottieCreated="init" :loName="'superStar' + index"></star>
      </div>
    </div>
</template>

<script>
import star from "@/components/lottie/lottie.vue";
// 获取星星所需要的 json 数据
import * as animationData from "@/assets/lottie/72-favourite-app-icon.json";
export default {
  name: "starComponent",
  props: {
    //  星星数，默认 1
    starNumer: {
      default: 1
    }
  },
  data() {
    return {
      // 当前数据
      lottie: [],
      starNum: 1, // 星级数（默认0）

      // 组件部分数据
      options: []
    };
  },
  components: {
    star
  },
  created() {
    // 设置初始星星数
    for (let i = 1; i <= 5; i++) {
      this.options.push({
        animationData: animationData,
        autoplay: i <= this.starNumer
      });
    }
  },
  methods: {
    // 进行初始化
    init(e, ele) {
      this.lottie.push({
        e: e,
        isAdd: false,
        ele: ele
      });
    },
    useStar(index) {
      let starNum = this.starNumer; // 获取之前选中的星星数

      if(starNum === index) return; // 若为当前数值不发生改变
      let loopNum = starNum > index ? starNum : index; // 循环星星数

      // 添加或取消之前的
      for (let i = 1; i <= loopNum; i++) {
        let opt = this.lottie[i-1];
        i > index ? 
            opt.e.goToAndStop(1, true) : 
            opt.e.play(); 
        // 变为取消状态
        // 变为选中状态
        // // 播放方向，正数和0为正常播放，负数为倒放，第二个参数动画名可选。
        // opt.e.setDirection(i > index ? -1 : 0);
        // opt.e.play();    
      }
      this.$emit("update:starNumer", index); //触发 input 事件，更改 starNumer 的值
    }
  }
};
</script>

<style lang="less">
.starBox {
  display: flex;
  .star {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
}
</style>

